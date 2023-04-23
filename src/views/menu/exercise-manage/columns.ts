import {ref} from "vue";
import {ColumnsProps} from "../../../components/table/table-help";
import {ExerciseVo} from "../../../entity/menu/exercise";
import {columnRenderImage} from "../../../utils/column-render-util";

const columns=ref<ColumnsProps<ExerciseVo>[]>([
    {
        title:'活动类型',
        dataIndex:'activityTypeName',
        width:160
    },
    {
        title:'活动标题',
        dataIndex:'activityTitle',
        width:160
    },
    {
        title:'活动封面',
        dataIndex:'activityCover',
        width:160,
        customRender: ({ text }) => columnRenderImage({ url: text.split(',')[0], fallback: '' })
    },
    {
        title:'活动地点',
        dataIndex:'activityPlace',
        width:160
    },
])

export default columns