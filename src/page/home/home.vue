<template>
    <div class="home"> 
        <navber></navber>    
        <!-- 谷歌广告 -->
        <homeMyAdv :homeAdv="homeAdv" />
        <homeList :homeList = "homeClassificationData"/>
    </div>  
</template>
 
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';  
   
   import {getFoodtypeList} from "network/List.ts"
   import {getFoodselfListByPage} from "network/HodgepodgeList.ts"
   import {record,dynamicInsertion} from "network/tool.ts"
   import {homeAdv} from "ADCode/ADCode.ts"  
   import {setTabValue} from "store/mutationsType";

   import navber from "components/navigation/navigation.vue";
   import homeList  from "./homeChilder/homeList/HomeList.vue";
   import homeMyAdv from "./homeChilder/homeAdv/HomeAdv.vue";

 @Component({
    components : {
        navber, 
        homeList,
        homeMyAdv,
    },       
})
export default class Home extends Vue {
        created () {    
            console.log("TSB_7.0")  
            record(window.location.host);  
            // 获取首页数据   
            let that : any  = this;   
            let myHomeList : any = JSON.parse(localStorage.getItem("myHomeList") as any);   
            (myHomeList) ? (that.homeList = myHomeList) : [];     
            // 判断是否有了缓存数据 
            if(that.homeList.length > 0) {
                that.homeListBool = true;
            }  
        }
        mounted() {    
            let that : any  = this;   
            // 获取分类接口 
            new getFoodtypeList().get()
            .then((res : any) => {   
                that.homeListClassify.push(...JSON.parse(JSON.stringify(res.data.data)));
                // 不直接给that.homeList赋值的原因是因为，这样会导致属性data中的数据清空，体验不好 
                res.data.data.forEach((e:any,i :number) => { 
                   
                    that.homeListClassify[i].complete = 0;
                    // 这里加个&& that.homeListBool判断是为了判断调用接口后that.homeListBool里添加了值
                    if(that.homeList.length > 0 && that.homeListBool) {
                        //  有缓存的写法 
                        that.homeList[i].complete = 0;
                        that.homeList[i].id = e.id;
                        that.homeList[i].typeName = e.typeName
                    }
                    else {
                        // 没缓存的写法
                        that.homeListBool = false;
                        that.homeList[i] = {};
                        that.homeList[i].complete = 0;
                        that.homeList[i].id = e.id;
                        that.homeList[i].typeName = e.typeName
                    }  
                    that.getNewData(i,e.id)
                });
            })
            .catch((err : any) => {
                console.log(err)
            }) 
            dynamicInsertion();
            
        }
        deviceId : string = "" // 模拟用户id
        activeNames : Array<number> = [0] ;
        homeList: any [] = [];
        homeListBool : boolean = false;  // 用于判断是否有缓存数据
        homeListClassify : any [] = [];      // 用于判断缓存中的分类与数据库中的分类是否一样 (判断数据库中的分类删除或者增加)
        homeClassificationN : number = -1000;
        searchValue : string = ''  //搜索值,
        homeAdv : string = homeAdv
         
        getNewData(inx : number,myId : number) { 
            let that : any = this ;
            let pageIndex =  parseInt( (Math.random ()  * (10 - 1 + 1) + 1) as any )
            // 随机从5页中拿取其中一页
            that.homeList[inx].randomPage = pageIndex;
            that.homeListClassify[inx].randomPage = pageIndex;
            // 点击更多查询的页码
            that.homeList[inx].inquirePage = 0;
            that.homeListClassify[inx].inquirePage = 0; 
            // more 为是否还有下一页数据
            that.homeList[inx].more = true;
            that.homeListClassify[inx].more  = true;
            new getFoodselfListByPage(pageIndex,6,myId).get()
            .then((res : any) => { 
                that.homeList[inx].data = res.data.data.list; 
                that.homeList[inx].complete = 1 ;
                that.homeListClassify[inx].data = res.data.data.list; 
                that.homeListClassify[inx].complete = 1 ;
                that.homeClassificationN--; 
                // dynamicInsertion(); 
                let bool =  that.homeList.every(( e : any) => {
                    return e.complete == 1
                })   
                if(bool) {  
                    that.homeList = JSON.parse(JSON.stringify(that.homeListClassify));
                    that.homeClassificationN--; 
                    localStorage.removeItem("myHomeList"); 
                    localStorage.setItem("myHomeList",JSON.stringify(that.homeList))  
                }   
            })  
        }    
        
           
        homeListMore (item : any,index : number) {  
            let that : any = this;
            that.$store.commit(setTabValue,index + 1) 
            that.$router.push(
                {
                    path : `/HodgepodgeList/${item.typeName.replace(/\s+/g,'-')}/${item.id}`, 
                }
            ) 
        }
        get homeClassificationData () : any{
            let that : any  = this;
            that.homeClassificationN--;   
            return that.homeList;
        }
    }
</script>
<style  lang="scss">
    @import "./css/global.scss"; 
</style>
<style lang="scss" scoped>
 @import "./css/home.scss";
</style>