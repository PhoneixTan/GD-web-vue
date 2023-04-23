import {BusinessPo} from "../common/base";

export interface HotelVo extends BusinessPo{
    //酒店地址
    hotelAddress:string
    //等级
    hotelGrade:string
    //酒店介绍
    hotelIntroduce:string
    //酒店电话
    hotelPhone:string
    //图片
    hotelPic:string
    //价格
    hotelPrice:string
    //酒店名
    hotelTitle:string
    //主键id
    id:string
    //备注
    memo:string
}