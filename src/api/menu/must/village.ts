import {
    DeleteRequestModel,
    GetRequestModel,
    PostRequestModel,
    PutRequestCacheModel,
    QueryType
} from "../../../http/request-model";
import {PageModel} from "../../../http/result-model";
import {VillageVo} from "../../../entity/menu/must/village";


const MODULE_API_PREFIX='/scenicvillage'
export default {
    page:(query?:QueryType)=>new PostRequestModel<PageModel<VillageVo>>(`${MODULE_API_PREFIX}/page`,query).request(),
    /**
     * 根据id查询
     * @param id
     */
    getByVillageId:(id?:string)=>new GetRequestModel<VillageVo>(`${MODULE_API_PREFIX}/${id}`,{}).request(),
    /**
     * 修改景区村信息
     */
    update:(data:QueryType)=>new PutRequestCacheModel<VillageVo>(`${MODULE_API_PREFIX}/`,data).request(),
    /**
     * 根据ID删除景区村信息
     */
    delete:(id?:string)=>new DeleteRequestModel<boolean>(`${MODULE_API_PREFIX}/${id}`,{}).request(),
    /**
     * 新增景区村信息
     */
    add:(query?:QueryType)=>new PostRequestModel(MODULE_API_PREFIX+'/',query).request()

}