import {ref} from "vue";
import {ColumnsProps} from "../../../components/table/table-help";
import {ExerciseVo} from "../../../entity/menu/exercise";
import {columnRenderImage} from "../../../utils/column-render-util";

const columns=ref<ColumnsProps<ExerciseVo>[]>([
    {
        title:'轮播图标题',
        dataIndex:'bannerTitle',
        width:100
    },
    {
        title:'轮播图片',
        dataIndex:'bannerPic',
        width:160,
        customRender: ({ text }) => columnRenderImage({ url: text.split(',')[0], fallback: '' })
    },
    {
        title:'轮播图点赞数',
        dataIndex:'bannerLattice',
        width:160
    },
])

export default columns