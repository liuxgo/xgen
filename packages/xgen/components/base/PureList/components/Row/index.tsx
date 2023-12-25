import Actions from '../Actions'
import Fields from '../Fields'

import type { IPropsRow } from '../../types'

const Index = (props: IPropsRow) => {
	const { setting, showLabel, hasChildren, extra, dataItem, parentIds, fold, onAction, onChange } = props

	return (
		<div className='w_100 flex align_start'>
			<Fields {...{ setting, showLabel, hasChildren, extra, dataItem, parentIds, onChange }}></Fields>
			<Actions
				{...{ hasChildren, parentIds, fold, onAction }}
				showFoldAction={dataItem?.children?.length > 0}
			></Actions>
		</div>
	)
}

export default window.$app.memo(Index)
