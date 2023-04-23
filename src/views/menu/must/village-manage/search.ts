import { ref } from 'vue'
import {SearchProps} from "../../../../components/table/table-help";

const search = ref<SearchProps[]>([
    {
        type: 'text',
        field: 'villageName',
        label: '景区村名称',
        value: undefined,
        span: 5,
        placeholder: '景区村名称'
    },
    {
        type: 'text',
        field: 'villageAddress',
        label: '景区村地点',
        value: undefined,
        span: 5,
        placeholder: '景区村地点'
    },
    {
        type: 'text',
        field: 'villageIntroduce',
        label: '景区村介绍',
        value: undefined,
        span: 5,
        placeholder: '景区村介绍'
    },


])
export default search