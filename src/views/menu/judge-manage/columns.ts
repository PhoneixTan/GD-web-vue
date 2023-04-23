import {ref} from "vue";
import {ColumnsProps} from "../../../components/table/table-help";
import {JudgeVo} from "../../../entity/menu/judge";

const columns=ref<ColumnsProps<JudgeVo>[]>([
    {
        title:'用户名',
        dataIndex:'createUserName',
        width:80
    },
    {
        title:'评分',
        dataIndex:'spotFraction',
        width:80
    },
    {
        title:'评论内容',
        dataIndex:'spotCommentContent',
        width:160
    },

])
export default columns