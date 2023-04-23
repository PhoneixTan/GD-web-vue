import {ref} from "vue";

const search=ref([
    {
        type:'text',
        field:'createUserName',
        label:'用户名',
        value:undefined,
        span:4,
        placeholder:'用户名'
    }
])
export default search