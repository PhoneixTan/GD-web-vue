import {GetRequestModel, QueryType} from "../../http/request-model";
import {SystemMenu} from "../../entity/system/system-menu";

const MODULE_API_PREFIX ='/systemMenu'
/**
 * 获取当前登录用户的权限菜单
 */
export default {
    menuList:(query?:QueryType)=> new GetRequestModel<Array<SystemMenu>>(`${MODULE_API_PREFIX}/listMyMenu`,query).request()

}