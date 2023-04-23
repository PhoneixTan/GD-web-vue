import {
    DeleteRequestModel,
    GetRequestModel,
    PostRequestModel,
    PutRequestCacheModel,
    QueryType
} from "../../http/request-model";
import {PageModel} from "../../http/result-model";
import {SuggestVo} from "../../entity/menu/suggest";


const MODULE_API_PREFIX='/suggestion'
export default {
    page:(query?:QueryType)=>new PostRequestModel<PageModel<SuggestVo>>(`${MODULE_API_PREFIX}/page`,query).request(),
    delete:(id?:string)=>new DeleteRequestModel<boolean>(`${MODULE_API_PREFIX}/${id}`,{}).request(),
    getBySuggestId:(id?:string)=>new GetRequestModel<SuggestVo>(`${MODULE_API_PREFIX}/${id}`,{}).request(),
    /**
     * 修改信息
     */
    update:(data:QueryType)=>new PutRequestCacheModel<SuggestVo>(`${MODULE_API_PREFIX}/`,data).request(),
    /**
     * 新增信息
     */
    add:(query?:QueryType)=>new PostRequestModel(MODULE_API_PREFIX+'/',query).request()

}