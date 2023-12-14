import { Popover } from 'antd'
import clsx from 'clsx'
import { useMemo } from 'react'

import { useAction } from '@/actions'
import { useActionDisabled, useActionStyle } from '@/hooks'
import { getTemplateValue } from '@/utils'
import { Icon } from '@/widgets'

import styles from './index.less'

import type { IPropsActions } from '../../types'
import Action from './Action'

const Index = (props: IPropsActions) => {
	const { namespace, primary, actions, data_item } = props

	const _actions = useMemo(() => getTemplateValue(actions, data_item), [actions, data_item])

	const Content = (
		<div className={clsx([styles.table_option_items, 'flex flex_column'])}>
			{_actions.map((it, index) => (
				<Action
					namespace={namespace}
					primary={primary}
					action={it}
					data_item={data_item}
					key={index}
				></Action>
			))}
		</div>
	)

	return (
		<div className={clsx([styles._local, 'flex justify_end'])}>
			<Popover
				id='td_popover'
				placement='bottomRight'
				overlayClassName={styles.options_popover}
				trigger='click'
				zIndex={1000}
				destroyTooltipOnHide={{ keepParent: false }}
				content={Content}
				align={{ offset: [6, -10] }}
				autoAdjustOverflow={false}
			>
				<a className='option_icon_wrap flex justify_center align_center clickable'>
					<Icon name='icon-more-vertical' size={18}></Icon>
				</a>
			</Popover>
		</div>
	)
}

export default window.$app.memo(Index)
