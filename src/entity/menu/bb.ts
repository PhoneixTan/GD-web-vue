import {BusinessPo} from "../common/base";

export interface BbVo extends BusinessPo{
    //民宿地址
    bbAddress:string
    //等级
    bbGrade:string
    //民宿介绍
    bbIntroduce:string
    //名宿咨询电话
    bbPhone:string
    //图片
    bbPic:string
    //价格
    bbPrice:string
    //民宿名
    bbTitle:string
    //主键id
    id:string
    //备注
    memo:string
}