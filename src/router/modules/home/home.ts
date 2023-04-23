export default [
    {
        //首页测试
        path:'',
        component:()=>import('../../../views/login/Home.vue')
    },
    {
      //必游榜单-景区管理
      path:'/spot',
      component:()=>import('../../../views/menu/must/spot-manage/Spot.vue')
    },
    {
        //-景区村管理
        path:'/village',
        component:()=>import('../../../views/menu/must/village-manage/Village.vue')
    },
    {
        path:'/venus',
        component:()=>import('../../../views/menu/must/venus-manage/Venus.vue')
    },
    {
        //轮播图管理
        path: '/banner',
        component:()=>import('../../../views/menu/banner-manage/Banner.vue')
    },
    {
        //酒店管理
        path: '/hotel/shop',
        component:()=>import('../../../views/menu/hotel/hotel-manage/Hotel.vue')
    },
    {
        //民宿管理
        path: '/hotel/b&b',
        component:()=>import('../../../views/menu/hotel/bb-manage/BB.vue')
    },
    {
        //美食管理
        path: '/food',
        component:()=>import('../../../views/menu/food-manage/Food.vue')
    },
    {
        //活动管理
        path: '/exercise',
        component:()=>import('../../../views/menu/exercise-manage/Exercise.vue')
    },
    {
        //评论管理
        path: '/judge',
        component:()=>import('../../../views/menu/judge-manage/Judge.vue')
    },
    {
        //投诉管理
        path: '/worst',
        component:()=>import('../../../views/menu/suggestions/worst-manage/Worst.vue')
    },
    {
        //建议管理
        path: '/proposal',
        component:()=>import('../../../views/menu/suggestions/proposal-manage/Proposal.vue')
    },


]