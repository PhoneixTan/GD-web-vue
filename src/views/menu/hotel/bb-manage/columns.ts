import {ref} from "vue";
import {ColumnsProps} from "../../../../components/table/table-help";
import {columnRenderImage} from "../../../../utils/column-render-util";
import {BbVo} from "../../../../entity/menu/bb";

const columns=ref<ColumnsProps<BbVo>[]>([
    {
        title:'民宿名称',
        dataIndex:'bbTitle',
        width:160
    },
    {
        title:'民宿等级',
        dataIndex:'bbGrade',
        width:160
    },
    {
        title:'民宿图片',
        dataIndex:'bbPic',
        width:160,
        customRender: ({ text }) => columnRenderImage({ url: text, fallback: '' })
    },
    {
        title:'民宿价格',
        dataIndex:'bbPrice',
        width:160
    },
    {
        title:'民宿地址',
        dataIndex:'bbAddress',
        width:160
    },
])
export default columns