import {BusinessPo} from "../common/base";

export interface SuggestVo extends BusinessPo{
    //    创建时间
    gmtCreate:string
    //    主键id
    id:string
    //    备注
    memo:string
    //    回复建议
    suggestBack:string
    //    建议反馈内容
    suggestContent:string
    //    建议反馈姓名
    suggestName:string
    //    建议反馈电话
    suggestPhone:string
}