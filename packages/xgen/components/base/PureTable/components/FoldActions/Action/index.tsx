import { Tooltip } from 'antd'
import clsx from 'clsx'

import { useAction } from '@/actions'
import { Icon } from '@/widgets'
import { IPropsAction } from '../../../types'
import { useActionDisabled, useActionStyle } from '@/hooks'

import { container } from 'tsyringe'
import Model from './model'
import { useLayoutEffect, useState } from 'react'

import styles from '../index.less'

const Index = (props: IPropsAction) => {
	const { namespace, primary, action, data_item } = props
	const onAction = useAction()
	const getStyle = useActionStyle()
	const getDisabled = useActionDisabled()
	const [x] = useState(() => container.resolve(Model))

	const [disabledCls, setDisabledCls] = useState('')

	useLayoutEffect(() => {
		if (action.disabled && action.disabled?.props) {
			x.remote.raw_props = action.disabled?.props
			x.remote.getValue().then((value) => {
				if (value) {
					setDisabledCls('disabled')
				}
			})
		} else {
			setDisabledCls(getDisabled(action.disabled))
		}
	}, [props, x.value])

	return (
		<div
			className={clsx([
				'table_option_item flex align_center cursor_point',
				getStyle(action.style),
				disabledCls
			])}
			onClick={() =>
				onAction({
					namespace: namespace ?? '',
					primary,
					data_item,
					it: action
				})
			}
		>
			<Icon name={action.icon} size={13}></Icon>
			<span className='text'>{action.title}</span>
		</div>
	)
}

export default window.$app.memo(Index)
