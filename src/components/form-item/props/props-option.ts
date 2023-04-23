/*
 * 替换title、value、children字段为...中对应的字段
 * {label: 'title', value: 'value', key: 'key', children: 'children'}
 * */
export interface OptionKeys {
	//label对应的字段
	label: string
	//value对象的字段
	value: string
	//children对应的字段
	children?: string
	//name对应的字段
	name?: string
	//key对应的字段
	key?: string
}
