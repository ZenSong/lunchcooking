import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 支持不同手机
import './components/common/js/reset.ts'
// 引入通用样式
import 'vant/lib/index.css';
import './components/common/css/reset.css'
import './components/common/css/icon.css'

import axios from 'axios'
import store from './store'
Vue.prototype.$axios = axios
import { ImagePreview,Icon,Popup,Collapse,CollapseItem,Loading,Swipe,SwipeItem,Search,PullRefresh  } from 'vant'; 
Vue.use(ImagePreview).use(Icon).use(Popup).use(Collapse).use(CollapseItem).use(Loading).use(Swipe).use(SwipeItem).use(Search).use(PullRefresh); 
// axios.defaults.baseURL = 'http://192.168.0.107:8084'//本地  
// axios.defaults.baseURL = 'https://refer.skyclound.com/'//线上  
// axios.defaults.baseURL = 'http://192.168.0.37:9050/'// 37  



import VueLazyload from 'vue-lazyload'  // 引入这个懒加载插件 
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
    loading:""
 })

Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{ 
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0 ;

    if (to.path === '/'  ) {   
        store.commit("SET_HEADER",1)
        store.commit("SET_TAB_VALUE",0)
    }
    else {
        store.commit("SET_HEADER",2);
    } 
    if(to.path === '/Hodgepodge' || to.path === '/RecipesDetail' ||   to.path === '/TipsDetail') {
        store.commit("SET_TAB_VALUE",100)
    }
    else {
        let title = document.querySelector("title") as HTMLElement;
        title.innerHTML = "TastyCooking | Food, Recipes, Healthy Eating, Cooking, Nutrition, Healthy Cooking Tips, Healthy Recipes." 
    }
    if(to.path == '/aboutUs' || to.path == '/privacyPolicy') { 
        Vue.nextTick(() => { 
          (document.querySelector('.my-footer') as any).style.display = 'none'
        })
      }
      else {
          Vue.nextTick(() => {
            (document.querySelector('.my-footer') as any).style.display = 'block'
          })
      }
    next()
})
new Vue({
  router,
  store,   
  render: h => h(App),
}).$mount('#app')
