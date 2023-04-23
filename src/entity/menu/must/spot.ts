import {BusinessPo} from "../../common/base";

export interface SpotVo extends BusinessPo{
    //景区等级
    grade:string
    //主键id
    id:string
    //  备注
    memo:string
    //描述
    miaosu:string
    //当前客流数量
    numberOne:string
    //入园高峰数量
    numberThree:string
    //今日累计客流数量
    numberTwo:string
    //电话号码
    phoneNumber:string
    //图片
    photo:string
    //景区地址
    spotAddress:string
    //评价
    spotTalk:string
    //景区名
    spotname:string
    //景区介绍
    spotIntroduce:string
}