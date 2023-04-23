import {ref} from "vue";
import {ColumnsProps} from "../../../../components/table/table-help";
import {WorstVo} from "../../../../entity/menu/worst";

const columns=ref<ColumnsProps<WorstVo>[]>([
    {
        title:'姓名',
        dataIndex:'worstName',
        width:160
    },
    {
        title:'联系方式',
        dataIndex:'worstPhone',
        width:160
    },
    {
        title:'投诉内容',
        dataIndex:'worstContent',
        width:160
    },
])
export default columns