import { SearchProps } from './table-help'
import { QueryObjectType, QueryType } from '../../http/request-model'

export const getQuery = (search: SearchProps[]) => {
	const params: QueryType = {}
	search.forEach((item: SearchProps) => {
		if (item.value !== '' && item.value !== undefined) {
			//instanceof Array：判断是否是数组
			if (item.value instanceof Array && item.beforeArrayGet) {
				const result = item.beforeArrayGet(item.value as string[]) as QueryObjectType
				//取对象key值
				Object.keys(result).forEach(key => {
					params[key] = result[key]
				})
			} else {
				params[item.field] = item.value
			}
		}
	})
	return params
}
