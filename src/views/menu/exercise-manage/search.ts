import { ref } from 'vue'
import {SearchProps} from "../../../components/table/table-help";


const search = ref<SearchProps[]>([
    {
        type: 'text',
        field: 'activityTitle',
        label: '活动标题',
        value: undefined,
        span: 4,
        placeholder: '活动标题'
    },
    {
        type: 'text',
        field: 'spotAddress',
        label: '活动地点',
        value: undefined,
        span: 4,
        placeholder: '活动地点'
    },
    {
        type: 'text',
        field: 'activityIntroduction',
        label: '活动内容',
        value: undefined,
        span: 4,
        placeholder: '活动内容'
    },
    {
        type: 'text',
        field: 'activityPrincipal',
        label: '活动负责人',
        value: undefined,
        span: 4,
        placeholder: '活动负责人'
    },
    {
        type: 'text',
        field: 'activityMobile',
        label: '活动负责人电话',
        value: undefined,
        span: 4,
        placeholder: '活动负责人电话'
    },
])
export default search