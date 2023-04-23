import {ref} from "vue";
import {ColumnsProps} from "../../../../components/table/table-help";
import {columnRenderImage} from "../../../../utils/column-render-util";
import {HotelVo} from "../../../../entity/menu/hotel";

const columns=ref<ColumnsProps<HotelVo>[]>([
    {
        title:'酒店名称',
        dataIndex:'hotelTitle',
        width:160
    },
    {
        title:'酒店等级',
        dataIndex:'hotelGrade',
        width:160
    },
    {
        title:'酒店图片',
        dataIndex:'hotelPic',
        width:160,
        customRender: ({ text }) => columnRenderImage({ url: text, fallback: '' })
    },
    {
        title:'酒店价格',
        dataIndex:'hotelPrice',
        width:160
    },
    {
        title:'酒店地址',
        dataIndex:'hotelAddress',
        width:160
    },
])

export default columns