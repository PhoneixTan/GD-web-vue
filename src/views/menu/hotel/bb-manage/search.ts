import { ref } from 'vue'
import {SearchProps} from "../../../../components/table/table-help";


const search = ref<SearchProps[]>([
    {
        type: 'text',
        field: 'bbTitle',
        label: '民宿名称',
        value: undefined,
        span: 4,
        placeholder: '民宿名称'
    },
    {
        type: 'text',
        field: 'bbAddress',
        label: '民宿地址',
        value: undefined,
        span: 4,
        placeholder: '民宿地址'
    },
    {
        type: 'text',
        field: 'bbIntroduce',
        label: '民宿介绍',
        value: undefined,
        span: 4,
        placeholder: '民宿介绍'
    },
])
export default search