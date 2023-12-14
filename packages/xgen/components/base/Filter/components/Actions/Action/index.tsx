import { Button } from 'antd'
import clsx from 'clsx'

import { useAction } from '@/actions'
import { Icon } from '@/widgets'
import { IPropsAction } from '../../../types'
import { useActionDisabled } from '@/hooks'

import { container } from 'tsyringe'
import Model from './model'
import { Fragment, useLayoutEffect, useState } from 'react'

const Index = (props: IPropsAction) => {
	const { namespace, action, query } = props
	const onAction = useAction()
	const getDisabled = useActionDisabled()
	const [x] = useState(() => container.resolve(Model))

	const [disabledCls, setDisabledCls] = useState('')

	useLayoutEffect(() => {
		if (action.disabled) {
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
		<Fragment>
			{action.hideWhenDisabled && disabledCls === 'disabled' ? null : (
				<Button
					className={clsx(
						['btn_action border_box flex justify_center align_center clickable ml_16'],
						disabledCls
					)}
					type='primary'
					icon={<Icon name={action.icon} size={15}></Icon>}
					onClick={() => {
						onAction({
							namespace: namespace ?? '',
							primary: '',
							data_item: null,
							it: action,
							extra: { query }
						})
					}}
				>
					{action.title}
				</Button>
			)}
		</Fragment>
	)
}

export default window.$app.memo(Index)
