import {ref} from "vue";
import {ColumnsProps} from "../../../../components/table/table-help";
import {columnRenderImage} from "../../../../utils/column-render-util";
import {SpotVo} from "../../../../entity/menu/must/spot";

const columns=ref<ColumnsProps<SpotVo>[]>([
    {
        title:'景区名称',
        dataIndex:'spotname',
        width:160
    },
    {
        title:'景区等级',
        dataIndex:'grade',
        width:160
    },
    {
        title:'景区图片',
        dataIndex:'photo',
        width:160,
        customRender: ({ text }) => columnRenderImage({ url: text, fallback: '' })
    },
    {
        title:'景区地址',
        dataIndex:'spotAddress',
        width:160
    },
    {
        title:'当前客流数量',
        dataIndex:'numberOne',
        width:160
    },
    {
        title:'入园高峰数量',
        dataIndex:'numberThree',
        width:160
    },
    {
        title:'今日累计客流数量',
        dataIndex:'numberTwo',
        width:160
    },
])

export default columns