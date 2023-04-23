import {
    DeleteRequestModel,
    GetRequestModel,
    PostRequestModel,
    PutRequestCacheModel,
    QueryType
} from "../../../http/request-model";
import {PageModel} from "../../../http/result-model";
import {SpotVo} from "../../../entity/menu/must/spot";

const MODULE_API_PREFIX='/scenicspot'
export default {
    /**
     * 分页查询景区信息
     */
    page:(query?:QueryType)=>new PostRequestModel<PageModel<SpotVo>>(`${MODULE_API_PREFIX}/page`,query).request(),
    /**
     * 根据id查询详情
     */
    getBySpotId:(id?:string)=>new GetRequestModel<SpotVo>(`${MODULE_API_PREFIX}/${id}`,{}).request(),
    /**
     * 修改信息
     */
    update:(data:QueryType)=>new PutRequestCacheModel<SpotVo>(`${MODULE_API_PREFIX}/`,data).request(),
    /**
     * 根据ID删除信息
     */
    delete:(id?:string)=>new DeleteRequestModel<boolean>(`${MODULE_API_PREFIX}/${id}`,{}).request(),
    /**
     * 新增信息
     */
    add:(query?:QueryType)=>new PostRequestModel(MODULE_API_PREFIX+'/',query).request()
}