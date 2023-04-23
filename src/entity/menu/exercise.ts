import {BusinessPo} from "../common/base";

export interface ExerciseVo extends BusinessPo{
    // 活动封面
    activityCover:string
    //截止时间
    activityEndtime:string
    //报名结束时间
    activityEnrollEndTime:string
    // 报名开始时间
    activityEnrollStartTime:string
    // 活动介绍
    activityIntroduction:string
    //  关键字
    activityKeywords:string
    //活动最大人数
    activityMaxAmount:string
    //负责人电话
    activityMobile:string
    //活动地点
    activityPlace:string
    //  活动负责人
    activityPrincipal:string
    //活动标题
    activityTitle:string
    //  活动类型名称
    activityTypeName:string
    memo:string
}