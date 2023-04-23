import { ref } from 'vue'
import {SearchProps} from "../../../../components/table/table-help";


const search = ref<SearchProps[]>([
    {
        type: 'text',
        field: 'venuesName',
        label: '文化场馆名称',
        value: undefined,
        span: 6,
        placeholder: '文化场馆名称'
    },
    {
        type: 'text',
        field: 'venuesAddress',
        label: '文化场馆地点',
        value: undefined,
        span: 6,
        placeholder: '文化场馆地点'
    },
    {
        type: 'text',
        field: 'venuesIntroduce',
        label: '文化场馆介绍',
        value: undefined,
        span: 6,
        placeholder: '文化场馆介绍'
    },


])
export default search