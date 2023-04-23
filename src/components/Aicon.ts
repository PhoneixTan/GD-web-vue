import * as $Icon from '@ant-design/icons-vue'
import { createVNode } from 'vue'
export const AIcon = (prpos: { icon: string }) => {
	const { icon } = prpos
	return createVNode($Icon[icon as keyof typeof AIcon])
}
