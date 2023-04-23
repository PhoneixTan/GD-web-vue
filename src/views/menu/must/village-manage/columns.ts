import {ref} from "vue";
import {ColumnsProps} from "../../../../components/table/table-help";
import {columnRenderImage} from "../../../../utils/column-render-util";
import {SpotVo} from "../../../../entity/menu/must/spot";

const columns=ref<ColumnsProps<SpotVo>[]>([
    {
        title:'景区村名称',
        dataIndex:'villageName',
        width:160
    },
    {
        title:'景区村等级',
        dataIndex:'villageGrade',
        width:160
    },
    {
        title:'景区村图片',
        dataIndex:'villagePic',
        width:160,
        customRender: ({ text }) => columnRenderImage({ url: text, fallback: '' })
    },
    {
        title:'景区村地址',
        dataIndex:'villageAddress',
        width:160
    },
    {
        title:'当前客流数量',
        dataIndex:'villageVisitor',
        width:160
    },
    {
        title:'入园高峰数量',
        dataIndex:'villagePeak',
        width:160
    },
    {
        title:'今日累计人数',
        dataIndex:'villageTotal',
        width:160
    },
    {
        title:'景区村介绍',
        dataIndex:' spotIntroduce',
        width:160,
    },

])

export default columns