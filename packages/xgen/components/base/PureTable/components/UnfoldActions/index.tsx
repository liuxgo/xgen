import { Tooltip } from 'antd'
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

	return (
		<div className={clsx([styles._local, 'flex justify_end'])}>
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
}

export default window.$app.memo(Index)
