import {BusinessPo} from "../common/base";

export interface JudgeVo extends BusinessPo{
    //创建人姓名
    createUserName:string
    //创建时间
    gmtCreate:string
    //修改时间
    gmtModified:string
    //主键id
    id:string
    // 备注
    memo:string
    //景区评论内容
    spotCommentContent:string
    //景区评分
    spotFraction:string
    // 用户名
    userName:string
}