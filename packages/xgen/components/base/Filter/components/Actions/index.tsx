import { Fragment } from 'react'
import Action from './Action'

import type { IPropsActions } from '../../types'

const Index = (props: IPropsActions) => {
	const { namespace, actions, query } = props
	return (
		<Fragment>
			{actions?.map((it, index) => (
				<Action namespace={namespace} action={it} query={query} key={index}></Action>
			))}
		</Fragment>
	)
}

export default window.$app.memo(Index)
