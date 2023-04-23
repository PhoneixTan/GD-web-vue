import {
    DeleteRequestModel,
    GetRequestModel,
    PostRequestModel,
    PutRequestCacheModel,
    QueryType
} from "../../../http/request-model";
import {PageModel} from "../../../http/result-model";
import {VenusVo} from "../../../entity/menu/must/venus";

const MODULE_API_PREFIX='/culturalvenues'
export default {
    page:(query?:QueryType)=>new PostRequestModel<PageModel<VenusVo>>(`${MODULE_API_PREFIX}/page`,query).request(),
    /**
     * 根据id查询文化场馆详情
     */
    getByVenusId:(id?:string)=>new GetRequestModel<VenusVo>(`${MODULE_API_PREFIX}/${id}`,{}).request(),
    /**
     * 修改文化场馆信息
     */
    update:(data:QueryType)=>new PutRequestCacheModel<VenusVo>(`${MODULE_API_PREFIX}/`,data).request(),
    /**
     * 根据ID删除文化场馆信息
     */
    delete:(id?:string)=>new DeleteRequestModel<boolean>(`${MODULE_API_PREFIX}/${id}`,{}).request(),
    /**
     * 新增文化场馆信息
     */
    add:(query?:QueryType)=>new PostRequestModel(MODULE_API_PREFIX+'/',query).request()
}