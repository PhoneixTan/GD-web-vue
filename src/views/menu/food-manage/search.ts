import { ref } from 'vue'
import {SearchProps} from "../../../components/table/table-help";


const search = ref<SearchProps[]>([
    {
        type: 'text',
        field: 'foodName',
        label: '美食名称',
        value: undefined,
        span: 4,
        placeholder: '美食名称'
    },

])
export default search