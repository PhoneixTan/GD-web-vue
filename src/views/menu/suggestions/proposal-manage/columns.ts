import {ref} from "vue";
import {ColumnsProps} from "../../../../components/table/table-help";
import {SuggestVo} from "../../../../entity/menu/suggest";

const columns=ref<ColumnsProps<SuggestVo>[]>([
    {
        title:'姓名',
        dataIndex:'suggestName',
        width:160
    },
    {
        title:'联系方式',
        dataIndex:'suggestPhone',
        width:160
    },
    {
        title:'建议反馈内容',
        dataIndex:'suggestContent',
        width:160
    },
])
export default columns