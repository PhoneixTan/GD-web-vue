import {BusinessPo} from "../common/base";

export interface FoodVo extends BusinessPo{
    //美食菜谱
    foodIntroduce:string
    //美食名称
    foodName:string
    //美食图片
    foodPic:string
    //主键id
    id:string
    //备注
    memo:string
}