import {DeleteRequestModel, GetRequestModel, PostRequestModel, QueryType} from "../../http/request-model";
import {PageModel} from "../../http/result-model";
import {JudgeVo} from "../../entity/menu/judge";

const MODULE_API_PREFIX='/spotComment'
export default {
    /**
     * 分页查询
     */
    page:(query?:QueryType)=>new PostRequestModel<PageModel<JudgeVo>>(`${MODULE_API_PREFIX}/page`,query).request(),
    /**
     * 根据id查找评论详情
     * @param id
     */
    getByJudgeId:(id?:string)=>new GetRequestModel<JudgeVo>(`${MODULE_API_PREFIX}/${id}`,{}).request(),
    /**
     * 根据ID删除评论信息
     * @param id
     */
    delete:(id?:string)=>new DeleteRequestModel<boolean>(`${MODULE_API_PREFIX}/${id}`,{}).request()
}