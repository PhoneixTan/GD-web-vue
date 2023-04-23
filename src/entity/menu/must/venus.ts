import {BusinessPo} from "../../common/base";

export interface VenusVo extends BusinessPo{
    //  主键id
    id:string
    //备注
    memo:string
    //  地址
    venuesAddress:string
    //文化馆描述
    venuesEvaluate:string
    // 文化馆介绍
    venuesIntroduce:string
    //最大高峰
    venuesMaxpeak:string
    // 标题
    venuesName:string
    // 电话号码
    venuesPhone:string
    //文化馆图片
    venuesPic:string
    //累计
    venuesTotal:string
}