import {BusinessPo} from "../../common/base";

export interface VillageVo extends BusinessPo{
    //    主键id
    id:string
    //    备注
    memo:string
    //    景区村地址
    villageAddress:string
    //    描述
    villageEvaluate:string
    //    等级
    villageGrade:string
    //    介绍
    villageIntroduce:string
    //    村名字
    villageName:string
    //高峰
    villagePeak:string
    //    景区村图片
    villagePic:string
    //    累计人数
    villageTotal:string
    //景区村客流量
    villageVisitor:string
}