import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import login from "../views/login";
import List from "../views/main/List";
import Main from "../views/main/Main";
import AddCategory from "../views/main/category/AddCategory";
import ShowCategory from "../views/main/category/ShowCategory";
import EditCategory from "../views/main/category/EditCategory";
import Changepass from "../views/main/category/Changepass";
import Addhotelitem from "../views/main/hotelitem/Addhotelitem";
import Showhotelitem from "../views/main/hotelitem/Showhotelitem";
import Edithotelitem from "../views/main/hotelitem/Edithotelitem";
import Vcharts from "../echarts/Vcharts";

let router=new VueRouter({
    routes:[
        {
            path:'/',
            component:Main,
            name: "index",
            redirect: '/vcharts',
            meta:{
                auth:true,
                title:"首页"
            },
            children:[
                {
                  path: 'Changepass',
                  component: Changepass,
                  name: 'Changepass',
                  meta: {
                      auth: true,
                      title: "密码修改"
                  }
                },
                {
                    path:'categoryAdd',//二级路由书写不加/但是访问的时候需要添加
                    component:AddCategory,
                    name:'categoryAdd',
                    meta:{
                        auth:true,
                        title:"分类添加"
                    },
                },
                {
                    path: 'categoryShow',
                    component: ShowCategory,
                    name: 'categoryShow',
                    meta:{
                        auth: true,
                        title: "分类展示"
                    }
                },
                {
                    path: 'categoryEdit',
                    component: EditCategory,
                    name: 'categoryEdit',
                    meta:{
                        auth: true,
                        title: "分类编辑"
                    }
                },
                {
                    path: 'hotelitemAdd',
                    component: Addhotelitem,
                    name: 'hotelitemAdd',
                    meta:{
                        auth: true,
                        title: "酒店添加"
                    }
                },
                {
                    path: 'hotelitemShow',
                    component: Showhotelitem,
                    name: 'hotelitemShow',
                    meta:{
                        auth: true,
                        title: "酒店查看"
                    }
                },
                {
                    path: 'hotelitemEdit',
                    component: Edithotelitem,
                    name: 'hotelitemEdit',
                    meta:{
                        auth: true,
                        title: "酒店修改"
                    }
                },
                {
                    path:'/vcharts',
                    component: Vcharts,
                    name:"vcharts",
                    meta: {
                        auth: true,
                        title:"数据可视化"
                    },
                }
            ]
        },
        {
            path:'/login',
            component: login,
            name:"login",
            meta: {
                auth: false,
                title:"登录"
            },
        },
        {
            path:'/list',
            component: List,
            name:"list",
            meta: {
                auth: true,
                title:"列表"
            },
        },

    ]
})

/*
* 导航守卫
* 1. 监听路由变化，前置守卫
* 2. to 路由元信息
 */
router.beforeEach((to,from,next)=>{
    let title=to.meta.title;
    title = title || "登录";
    document.title=title;
    if(to.meta.auth){
        let token=sessionStorage.getItem('token');
        token = token && token.trim();
        if(token){
            next();
        }else {
            next({name:'login',query:{redirect:to.name}});
        }
    }else {
        next();
    }
})

export default router;