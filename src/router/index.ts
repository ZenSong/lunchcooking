import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location : any) {
  return (routerPush.call(this, location) as any).catch((error: any) => error)
} 
export default new Router({
    mode :"history",
    routes : [
        {
            path : "/",
            name : "home", 
            component :   () => import("@/page/home/home.vue") 
        },
        {
            path : "/search/:searchVal?",
            name: "search",  
            component :   () => import("@/page/search/search.vue") 
        },
        {
            path : "/Hodgepodge/:typeName/:title/:id",
            name : "Hodgepodge", 
            component :   () => import("@/page/Hodgepodge/Hodgepodge.vue") 
        }, 
        {
            path : "/HodgepodgeList/:typeName/:id",
            name : "HodgepodgeList", 
            component :   () => import("@/page/HodgepodgeList/HodgepodgeList.vue") 
        }, 
        {
            path : "/privacyPolicy",
            name : "privacyPolicy",
            component :   () => import("@/page/privacyPolicy/privacyPolicy.vue")  
        },  
        {
            path : "/aboutUs",
            name : "aboutUs",  
            component :   () => import("@/page/aboutUs/aboutUs.vue")  
        }
    ],
     
})