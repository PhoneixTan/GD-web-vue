import { ref } from 'vue'
import {SearchProps} from "../../../../components/table/table-help";


const search = ref<SearchProps[]>([
    {
        type: 'text',
        field: 'hotelTitle',
        label: '酒店名称',
        value: undefined,
        span: 4,
        placeholder: '酒店名称'
    },
    {
        type: 'text',
        field: 'hotelAddress',
        label: '酒店地址',
        value: undefined,
        span: 4,
        placeholder: '酒店地址'
    },
    {
        type: 'text',
        field: 'hotelIntroduce',
        label: '酒店介绍',
        value: undefined,
        span: 4,
        placeholder: '酒店介绍'
    },
])
export default search