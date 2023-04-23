import {
    DeleteRequestModel,
    GetRequestModel,
    PostRequestModel,
    PutRequestCacheModel,
    QueryType
} from "../../http/request-model";
import {PageModel} from "../../http/result-model";
import {HotelVo} from "../../entity/menu/hotel";

const MODULE_API_PREFIX='/hotel'

export default {
    /**
     * 分页查询活动详情
     */
    page:(query?:QueryType) => new PostRequestModel<PageModel<HotelVo>>(`${MODULE_API_PREFIX}/page`,query).request(),
    /**
     * 根据id查询活动详情
     */
    getByHotelId:(id?:string)=>new GetRequestModel<HotelVo>(`${MODULE_API_PREFIX}/${id}`,{}).request(),
    /**
     * 修改信息
     */
    update:(data:QueryType)=>new PutRequestCacheModel<HotelVo>(`${MODULE_API_PREFIX}/`,data).request(),
    /**
     * 根据ID删除活动信息
     */
    delete:(id?:string)=>new DeleteRequestModel<boolean>(`${MODULE_API_PREFIX}/${id}`,{}).request(),
    /**
     * 新增信息
     */
    add:(query?:QueryType)=>new PostRequestModel(MODULE_API_PREFIX+'/',query).request()
}
