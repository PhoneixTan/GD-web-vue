import { ref } from 'vue'
import {SearchProps} from "../../../components/table/table-help";


const search = ref<SearchProps[]>([
    {
        type: 'text',
        field: 'bannerTitle',
        label: '轮播图标题',
        value: undefined,
        span: 4,
        placeholder: '轮播图标题'
    },

])
export default search