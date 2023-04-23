import {BusinessPo} from "../common/base";

export interface WorstVo extends BusinessPo{
    //    创建时间
    gmtCreate:string
    //    主键id
    id:string
    //    备注
    memo:string
    //    回复投诉
    worstBack:string
    //    投诉内容
    worstContent:string
    //    投诉者姓名
    worstName:string
    //    投诉者联系方式
    worstPhone:string
}