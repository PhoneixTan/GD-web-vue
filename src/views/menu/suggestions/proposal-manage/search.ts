import {ref} from "vue";
import {SearchProps} from "../../../../components/table/table-help";

const search=ref<SearchProps[]>([
    {
        type: 'text',
        field: 'suggestName',
        label: '姓名',
        value: undefined,
        span: 4,
        placeholder: '姓名'
    },
])
export default search