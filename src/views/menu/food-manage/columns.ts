import {ref} from "vue";
import {ColumnsProps} from "../../../components/table/table-help";
import {columnRenderImage} from "../../../utils/column-render-util";
import {FoodVo} from "../../../entity/menu/food";

const columns=ref<ColumnsProps<FoodVo>[]>([

    {
        title:'美食名称',
        dataIndex:'foodName',
        width:160
    },
    {
        title:'美食图片',
        dataIndex:'foodPic',
        width:160,
        customRender: ({ text }) => columnRenderImage({ url: text.split(',')[0], fallback: '' })
    },
])

export default columns