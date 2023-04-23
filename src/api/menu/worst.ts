import {DeleteRequestModel, GetRequestModel, PostRequestModel, QueryType} from "../../http/request-model";
import {PageModel} from "../../http/result-model";
import {WorstVo} from "../../entity/menu/worst";

const MODULE_API_PREFIX='/worst'
export default {
    // 查看列表
    page:(query?:QueryType)=>new PostRequestModel<PageModel<WorstVo>>(`${MODULE_API_PREFIX}/page`,query).request(),
    delete:(id?:string)=>new DeleteRequestModel<boolean>(`${MODULE_API_PREFIX}/${id}`,{}).request(),
    getByWorstId:(id?:string)=>new GetRequestModel<WorstVo>(`${MODULE_API_PREFIX}/${id}`,{}).request(),

}