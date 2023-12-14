import type Model from '@/components/base/Table/model'
import type { TableColumnType } from 'antd'
import type { Action, Common } from '@/types'

export interface IPropsPureTable {
	parent: Model['parent']
	namespace: Model['namespace']['value']
	primary: Model['setting']['primary']
	list: Model['list']
	columns: Model['table_columns']
	pagination: Model['pagination']
	props: Model['setting']['table']['props']
	operation: Model['setting']['table']['operation']
	batch: Model['batch']
	hidePagination?: boolean
	setBatchSelected: (v: Array<number>) => void
}

export interface IPropsBlock {
	namespace: IPropsComponentCommon['namespace']
	primary: IPropsComponentCommon['primary']
	type: string
	components: Common.ViewComponents
	data_item: any
}

export type TableColumn = TableColumnType<any>

export interface IPropsComponentCommon {
	namespace: Model['namespace']['value']
	primary: Model['setting']['primary']
	field_detail: Common.Column
	data_item: any
	onSave: (v: any) => void
}

export interface IPropsActions {
	namespace: Model['namespace']['value']
	primary: Model['setting']['primary']
	actions: Model['setting']['table']['operation']['actions']
	data_item: any
}

export interface Locale {
	[key: string]: {
		pagination: {
			total: {
				before: string
				after: string
			}
		}
	}
}

export interface IPropsAction {
	namespace?: Model['namespace']['value']
	primary: Model['setting']['primary']
	action: Action.Props
	data_item: any
}
