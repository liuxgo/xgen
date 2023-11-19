import { message } from 'antd'
import { findIndex } from 'lodash-es'
import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'

import { GlobalModel } from '@/context/app'
import { getPath, reg_email, reg_mobile } from '@/utils'
import { history } from '@umijs/max'
import { local, session } from '@yaoapp/storex'

import Service from './services'

import type { Global, Utils } from '@/types'
import type { UserType, Captcha, ReqLogin, ResLogin, FormValues } from './types'

@injectable()
export default class Model {
	user_type = '' as UserType
	captcha = {} as Captcha
	loading = {} as Global.BooleanObject
	is?: string
	isCaptcha = false //是否显示验证码

	constructor(public global: GlobalModel, private service: Service) {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	async getCaptcha() {
		const { res, err } = await this.service.getCaptcha<Captcha>(
			this.user_type === 'user' ? this.global.app_info?.login?.user?.captcha : ''
		)

		if (err) return

		this.captcha = res
	}

	async login(data: ReqLogin) {
		this.loading.login = true

		const { res, err } = await this.service.login<ReqLogin, ResLogin>(
			data,
			this.user_type === 'user' ? this.global.app_info?.login?.user?.login : ''
		)

		this.afterLogin(res, err)
	}

	async afterLogin(res: ResLogin, err: Utils.ResError) {
		if (err || !res?.token) {
			this.loading.login = false
			if (this.isCaptcha) {
				this.getCaptcha()
			}
			return
		}

		const entry = this.global.app_info?.login?.entry?.[this.user_type]

		if (!entry) return message.warning(this.global.locale_messages.login.no_entry)

		const current_nav = findIndex(res.menus.items, (item) => item.path === entry) || 0

		this.global.user = res.user
		this.global.menus = res.menus
		this.global.menu = res.menus.items
		this.global.current_nav = current_nav
		this.global.in_setting = false

		if (this.global.app_info.token?.storage === 'localStorage') {
			local.token = res.token

			if (res.studio) local.studio = res.studio
		} else {
			session.token = res.token

			if (res.studio) session.studio = res.studio
		}

		local.user = res.user
		local.menus = this.global.menus
		local.menu = this.global.menu
		local.current_nav = current_nav
		local.login_url = getPath(history.location.pathname)

		await window.$app.sleep(600)

		this.loading.login = false

		history.push(entry)
	}

	onFinish(data: FormValues) {
		const { mobile, password, code } = data
		const is_email = mobile.indexOf('@') !== -1

		if (is_email) {
			if (!reg_email.test(mobile)) {
				return message.warning(this.global.locale_messages.login.form.validate.email)
			}
		} else {
			if (!reg_mobile.test(mobile)) {
				return message.warning(this.global.locale_messages.login.form.validate.mobile)
			}
		}

		this.login({
			[is_email ? 'email' : 'mobile']: mobile,
			password: password,
			captcha: {
				id: this.captcha.id,
				code
			},
			sid: local.temp_sid,
			...(this.is ? { is: this.is } : {})
		})
	}
}
