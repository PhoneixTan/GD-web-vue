<template>
	<div class="detail-header">
		<clock-circle-outlined />
		<span class="text">创建时间：{{ createTime }}</span>
		<info-circle-outlined />
		<span class="text">创建人：{{ creator }}</span>

		<clock-circle-outlined />
		<span class="text">更新时间：{{ modifyTime }}</span>
		<info-circle-outlined />
		<span class="text">更新人：{{ modifier }}</span>
	</div>
</template>
<script lang="ts" setup>
import { ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'
import { BusinessPo } from '../../entity/common/base'
import { computed } from 'vue'
import { formatByString } from '../../utils/datetime-util'

const props = defineProps<{ detail: BusinessPo }>()
//创建时间
const createTime = computed(() => {
	if (props.detail.gmtCreate) return formatByString(props.detail.gmtCreate, 'YYYY年MM月dd日 HH:mm').text
	else return ''
})
//修改时间
const modifyTime = computed(() => {
	if (props.detail.gmtModified) return formatByString(props.detail.gmtModified, 'YYYY年MM月dd日 HH:mm').text
	else return ''
})
//创建人
const creator = computed(() => props.detail.createUserName ?? '')
//修改人
const modifier = computed(() => props.detail.updateUserName ?? '')
</script>
<style lang="scss" scoped>
.detail-header {
	display: grid;
	grid-template-columns: 18px 280px 18px auto;
	align-content: center;
	align-items: center;
	grid-gap: 8px; //间隔
	user-select: none;
	border-bottom: 1px solid #cccccc;
	padding-bottom: 20px;
	margin-bottom: 20px;
	.text {
		font-size: 14px;
		color: #666;
		line-height: 20px;
	}
}
</style>
