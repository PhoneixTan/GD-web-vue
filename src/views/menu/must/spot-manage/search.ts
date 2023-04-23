import { ref } from 'vue'
import {SearchProps} from "../../../../components/table/table-help";


const search = ref<SearchProps[]>([
    {
        type: 'text',
        field: 'spotname',
        label: '景区名称',
        value: undefined,
        span: 4,
        placeholder: '景区名称'
    },
    {
        type: 'text',
        field: 'activityPlace',
        label: '景区地点',
        value: undefined,
        span: 4,
        placeholder: '景区地点'
    },
    {
        type: 'text',
        field: 'spotIntroduce',
        label: '景区介绍',
        value: undefined,
        span: 4,
        placeholder: '景区介绍'
    },


])
export default search