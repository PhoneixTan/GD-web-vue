import {ref} from "vue";
import {ColumnsProps} from "../../../../components/table/table-help";
import {columnRenderImage} from "../../../../utils/column-render-util";
import {SpotVo} from "../../../../entity/menu/must/spot";

const columns=ref<ColumnsProps<SpotVo>[]>([
    {
        title:'文化场馆名称',
        dataIndex:'venuesName',
        width:160
    },
    {
        title:'文化场馆描述',
        dataIndex:'venuesEvaluate',
        width:160
    },
    {
        title:'文化场馆图片',
        dataIndex:'venuesPic',
        width:160,
        customRender: ({ text }) => columnRenderImage({ url: text, fallback: '' })
    },
    {
        title:'文化场馆地址',
        dataIndex:'venuesAddress',
        width:160
    },
    {
        title:'文化场馆最大高峰',
        dataIndex:'venuesMaxpeak',
        width:160
    },
    {
        title:'文化场馆累计客流数量',
        dataIndex:'venuesTotal',
        width:160
    },

])

export default columns