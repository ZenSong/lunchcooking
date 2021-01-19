<template>
    <div class="hodgepodge-list">
        <navber></navber> 
        <div class="hodgepodge-header"> 
            <HodgepodgeGuide :hodgepodgeListName="hodgepodgeListName" />
           
            <div class="hodgepodge-content">  
                <HodgepodgeGuideAdv :hodgepodgeListID="hodgepodgeListID" :HodgepodgeListAdv="HodgepodgeListAdv" />

                <div class="my-loading" v-if="preload"> 
                    <van-loading color="#00BBD3" />
                </div> 
                
                <van-pull-refresh v-model="dropDownRefresh" @refresh="refreshData" loading-text="loading" loosing-text="release and refresh" pulling-text="Pull down to refresh">
                    <ul class="hodgepodge-clearfix">   
                        <li v-for="(item, index) in recipesClearfixArr" :key="index" @click="AllRecipesDetails(item)"> 
                            <listItem :item="item" /> 
                        </li>   
                    </ul>
                </van-pull-refresh> 

                <!-- <list ref="myList" :obj= "{dropDownRefresh : dropDownRefresh,refreshData : refreshData,recipesClearfixArr: recipesClearfixArr,AllRecipesDetails : AllRecipesDetails}"  /> -->
                
                <!-- <div class="my-loading" v-if="myLoading"> 
                    <van-loading color="#00BBD3" />
                </div>  -->
                <div class="dropload-noData" v-if="droploadNoData">No more data...</div> 

            </div>
             
          
        </div>
    </div>
</template>
<script lang="ts">
    import navber from "components/navigation/navigation.vue"; 

    import HodgepodgeGuide from "./childer/nav/Nav.vue";
    import HodgepodgeGuideAdv from "./childer/adv/Adv.vue"; 
    import listItem from "components/list/ListItem.vue"

    import {record,dynamicInsertion} from "network/tool.ts";
    import {getFoodselfListByPage} from "network/HodgepodgeList.ts";
    import {HodgepodgeListAdv} from "ADCode/ADCode";
    import {Component ,Vue, Watch} from 'vue-property-decorator';
    @Component({
        components : {
            navber, 
            HodgepodgeGuide,
            HodgepodgeGuideAdv,
            listItem, 
        },
    })
    export default class HodgepodgeList extends Vue {
            deviceId : string = "" // 模拟用户id
            recipesClearfixArr : [] = []    //菜单列表 
            myLoading : boolean =  false    // 到达底部显示加载 
            menuPage : number =  1          // 分页 
            timer : any =  ""               //定时器   
            droploadNoData : boolean =  false // 没有数据的时候显示
            preload : boolean =  false   // 接口返回数据慢 给个加载动画       
            hodgepodgeListID : any =  "" // 分类的id
            hodgepodgeListName : string =  "" // 分类名
            dropDownRefresh : boolean = false // 下拉刷新 
            HodgepodgeListAdv : any = HodgepodgeListAdv // 广告
            created () {     
                let that : any = this;  
                that.myInit(); 
            }
            mounted () {
                let that : any = this;
                // that.operation ()
                // 谷歌广告
                dynamicInsertion()  
            } 
            // 离开时操作
            /* destroyed(){
                let that : any = this;
                window.removeEventListener('scroll', that.myscroll1, false);
            }  */
            // 初始化
            myInit() {
                let that : any = this;
                that.menuPage = 1 ;
                that.droploadNoData = false; 
                // 设置title标签
                var title = document.querySelector("title") as HTMLElement
                title.innerHTML = "TastyCooking | Food, Recipes, Healthy Eating, Cooking, Nutrition, Healthy Cooking Tips, Healthy Recipes." 
                that.preload = true; 
                that.recipesClearfixArr = [];
                // 分类id
                that.hodgepodgeListID = that.$route.params.id; 
                that.hodgepodgeListName = that.$route.params.typeName;
                record(window.location.href); 
                if(that.hodgepodgeListID) { 
                    that.hodgepodgeList()
                }  
                // 谷歌广告
                that.$nextTick(()=>{
                    dynamicInsertion()
                })
                 
            }
            refreshData() { 
                let that : any = this;
                let refreshAdv = document.querySelector('.refreshAdv')
                if(refreshAdv) { 
                    that.refreshMyAdv(refreshAdv)
                }  
                that.menuPage++
                that.hodgepodgeList()

            } 
            // 动态刷新广告
            refreshMyAdv(dom : any) {
                let that : any = this;
                dom.classList.remove('newGoogleList')
                setTimeout(() => {  
                        dom.innerHTML = ''   
                        if(that.hodgepodgeListID == 26) {
                            dom.innerHTML =  HodgepodgeListAdv.hodgepodgeListID26
                        }
                        else if (that.hodgepodgeListID == 25) {
                            dom.innerHTML =  HodgepodgeListAdv.hodgepodgeListID25
                        }
                        else if (that.hodgepodgeListID == 24) {
                            dom.innerHTML =  HodgepodgeListAdv.hodgepodgeListID24
                        }
                        else if (that.hodgepodgeListID == 23) {
                            dom.innerHTML =  HodgepodgeListAdv.hodgepodgeListID23
                        }
                        else if (that.hodgepodgeListID == 2) {
                            dom.innerHTML =  HodgepodgeListAdv.hodgepodgeListID2
                        }
                        else if (that.hodgepodgeListID == 1) {
                            dom.innerHTML =  HodgepodgeListAdv.hodgepodgeListID1
                        }
                        else {
                            dom.innerHTML =  HodgepodgeListAdv.hodgepodgeListID26
                        }
                        let script =document.createElement("script"); 
                        script.type='text/javascript';
                        let nHTML='(adsbygoogle = window.adsbygoogle || []).push({});';
                        script.setAttribute('class','refresh-my-adv');
                        script.innerHTML=nHTML
                        dom.appendChild(script);  
                }, 100);
            } 
            // 详情显示之后的一些js操作 和不显示详情时的下拉加载操作 
            /* operation () {
                let that : any = this; 
                setTimeout(()=>{        
                    window.addEventListener('scroll', that.myscroll1);
                },100)
            } */
           /*  myscroll1 () { 
                let that : any = this;     
                var scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) -80; 
                var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                if((document.querySelector(".my-loading") as HTMLElement) != undefined) {
                    let a :number = document.documentElement.clientHeight || document.body.clientHeight;
                    let myLoadingEle : any = document.querySelector(".my-loading") as HTMLElement;
                    let clientHeight :any = a + myLoadingEle.clientHeight;
                }    
                if((document.querySelector(".hodgepodge-list") as HTMLElement) != undefined) {
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    var daodi = scrollTop + clientHeight;
                    if(daodi >=  scrollHeight) {  
                            that.myLoading = true   
                            window.removeEventListener('scroll', that.myscroll1, false);
                            that.timer = setTimeout(()=> {
                                that.menuPage++;
                                that.hodgepodgeList();
                            },1000) 
                    }
                    else {
                        that.myLoading = false
                    } 
                }   
            } */ 
            // 获取菜单列表
            hodgepodgeList() {
                let that : any = this;
                // 是否已经没数据
                let full = false;
                //不带有cid 
                clearTimeout(that.timer);  
                new getFoodselfListByPage(that.menuPage,10,that.hodgepodgeListID).get()
                .then((res : any) => {  
                    that.dropDownRefresh = false;  
                    // that.$refs.myList.changeRefresh(that.dropDownRefresh);
                    that.preload = false;
                    var myPages = parseInt((res.data.data.total / 10) as any);
                    if(res.data.data.total % 10 != 0) {
                        myPages += 1;
                    }
                    if(that.menuPage > myPages) {
                        full = true;
                    }
                    if(res.data.data.total <= 0  || full) {
                        that.droploadNoData = true
                        // that.myLoading = false
                        // window.removeEventListener('scroll', that.myscroll1, false); 
                    } 
                    else {
                        // that.myLoading = false 
                        that.recipesClearfixArr = res.data.data.list  
                    }
                    // 谷歌广告
                    /* that.$nextTick(()=>{
                        dynamicInsertion()
                    })  */ 
                })
                .catch((err : any )=>{
                    console.log(err)
                }) 
            } 
            AllRecipesDetails (item : any) {  
                let that : any = this;
                that.$router.push({
                    path : `/Hodgepodge/${that.hodgepodgeListName.replace(/\s+/g,'-')}/${item.title.trim().replace(/\s+/g,'-').replace(/[\+ | \? | \% | \& | \= | \# | \^ | \* | \! | \$|\/]/g,'')}/${item.id}`,
              
                })
            } 
            // 监听路由变化
            @Watch("$route")   
            routeChanged () {
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    let that : any = this; 
                    that.myInit();
            } 
    }
</script> 
<style >
    .newGoogleList{
        z-index: 2222222222;
    }
</style>
<style lang="scss" scoped>
    @import "./css/HodgepodgeList.scss";
</style>