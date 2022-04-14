import type { Component } from '@/types'

interface IProps extends Component.PropsViewComponent {}

const Index = (props: IProps) => {
	const { __value } = props

	return <span>{__value}</span>
}

export default window.$app.memo(Index)