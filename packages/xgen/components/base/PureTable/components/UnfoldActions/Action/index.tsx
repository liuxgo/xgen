import { Tooltip } from 'antd'
import clsx from 'clsx'

import { useAction } from '@/actions'
import { Icon } from '@/widgets'
import { IPropsAction } from '../../../types'
import { useActionDisabled, useActionStyle } from '@/hooks'

import { container } from 'tsyringe'
import Model from './model'
import { Fragment, useLayoutEffect, useState } from 'react'

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
		<Fragment>
			{action.hideWhenDisabled && disabledCls === 'disabled' ? null : (
				<Tooltip
					title={action.title}
					overlayClassName={styles.unfold_actions}
					destroyTooltipOnHide={{ keepParent: false }}
					align={{ offset: [0, 6] }}
					autoAdjustOverflow={false}
				>
					<div className='unfold_table_option_item'>
						<a
							className={clsx([
								'icon_wrap border_box flex justify_center align_center clickable',
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
						</a>
					</div>
				</Tooltip>
			)}
		</Fragment>
	)
}

export default window.$app.memo(Index)
