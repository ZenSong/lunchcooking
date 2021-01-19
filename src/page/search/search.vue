<template>
    <div class="search">
        <navber @getSearchVal1="getSearchVal"></navber>
        <div class="search-lists">
            <searchNumber :searchMenuCount="searchMenuCount" :searchVal="searchVal" />
            <searchAdvCpn :searchAdv="searchAdv" />
            <van-pull-refresh v-model="dropDownRefresh" @refresh="refreshData" loading-text="loading" loosing-text="release and refresh" pulling-text="Pull down to refresh">
                <ul class="search-list"> 
                    <li @click="recipesDetails(item)" v-for="(item,index) in searchValArr" :key="index">  
                        <listItem :item= "item" />
                    </li> 
                </ul>
            </van-pull-refresh>
            <!-- <div class="my-loading" v-show="myLoading">
                  <van-loading color="#00BBD3" />
            </div>  -->
            <div class="dropload-noData" v-show="droploadNoData">No more data...</div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component ,Vue, Watch} from "vue-property-decorator";
    import navber from "@/components/navigation/navigation.vue"; 
    import listItem from "components/list/ListItem.vue"
    import searchNumber from './searchChilder/searchNumber/SearchNumber.vue'
    import searchAdvCpn from "./searchChilder/searchAdv/SeaderAdv.vue"
    
    import {record,dynamicInsertion} from "network/tool.ts"
    import {searchAdv} from "ADCode/ADCode"
    import {getMySearchVal} from "network/Search.ts"
    @Component({
        components : {
            navber,
            listItem,
            searchNumber,
            searchAdvCpn,
        }
    })
    export default class search extends Vue {
            deviceId : string = "" // 模拟用户id
            searchVal : string =  ""  // 搜索值
            myLoading : boolean =  false // 加载
            searchValArr : [] = []  // 搜索返回的数据
            searchMenuCount : number =  0 
            searchListPage : number = 1  // 页码
            droploadNoData  : boolean =  false // 没有数据的时候显示
            dropDownRefresh : boolean = false // 下拉刷新
            searchAdv : any  = searchAdv // 广告
            created() {   
                let that : any = this;
                that.searchVal = that.$route.params.searchVal  
                record(window.location.href);  
                that.getSearchList();
                // 设置title标签
                var title = document.querySelector("title") as HTMLElement;
                title.innerHTML = "food, recipes, healthy eating, cooking, nutrition, healthy cooking tips, healthy recipes"
            }
            mounted () { 
                let that : any = this;
                // window.addEventListener('scroll', that.searchScroll, false);
                // dynamicInsertion()
            }
            // 离开时操作
            /* destroyed(){
                let that : any = this;
                window.removeEventListener('scroll', that.searchScroll, false);
            } */
            /* searchScroll () {
                let that : any = this;
                var scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - 80; 
                var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                if(document.querySelector(".my-loading") != undefined) {
                    var a = document.documentElement.clientHeight || document.body.clientHeight;
                    var clientHeight = a + (document.querySelector(".my-loading") as HTMLElement).clientHeight;
                } 
                // 判断是否不在详情页 
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var daodi = scrollTop + clientHeight 
                if(daodi >=  scrollHeight) {  
                        that.myLoading = true 
                        window.removeEventListener('scroll', that.searchScroll, false); 
                        that.timer = setTimeout((res : any)=> {
                            that.searchListPage++;
                            that.getSearchList();
                        },1000)
                }
                else {
                    that.myLoading = false
                } 
            } */
            getSearchVal(val : string) {
                let that : any = this;
                that.searchVal = val;
            }
            // 下拉获取数据
            getSearchList () { 
                let that : any = this;
                // 是否已经没数据
                let full = false;
                new getMySearchVal(that.searchListPage,10,that.searchVal).get()
                .then((res :any) => {  
                    that.dropDownRefresh = false
                    var myPages = parseInt((res.data.data.total / 10) as any);
                    if(res.data.data.total % 10 != 0) {
                        myPages += 1;
                    }
                    if(that.searchListPage > myPages) {
                        full = true;
                    } 
                    if(res.data.data.total <= 0  || full) {
                            that.droploadNoData = true; 
                    }
                    else { 
                        that.searchValArr = res.data.data.list; 
                        that.searchMenuCount = res.data.data.total ; 
                    } 
                    // 谷歌广告
                    that.$nextTick(()=>{
                        dynamicInsertion()
                    })
                })
                .catch((err: any)=>{
                    console.log(err)
                })
            }
            // 刚开始搜索时获取数据
            getSearchValData() {
                let that : any = this; 
                // 是否已经没数据
                let full = false;
                new getMySearchVal(1,10,that.searchVal).get()
                .then((res : any) => { 
                    var myPages = parseInt((res.data.data.total / 10) as any);
                    if(res.data.data.total % 10 != 0) {
                        myPages += 1;
                    }
                    if(that.searchListPage > myPages) {
                        full = true;
                    } 
                    if(res.data.data.total <= 0  || full) {
                            that.droploadNoData = true;
                            // that.myLoading = false ;
                            window.removeEventListener('scroll', that.searchScroll, false);
                    }
                    else {
                        that.searchValArr.push(...res.data.data.list); 
                        that.searchMenuCount = res.data.data.total ; 
                    } 
                    dynamicInsertion()
                })
                .catch((err: any)=>{
                    console.log(err)
                })
            }
            refreshData() { 
                let that : any = this;
                let refreshAdv = document.querySelector('.refreshAdv')
                if(refreshAdv) { 
                    that.refreshMyAdv(refreshAdv)
                }  
                that.searchListPage++;
                that.getSearchList()

            } 
            // 动态刷新广告
            refreshMyAdv(dom : any) {
                dom.classList.remove('newGoogleList')
                setTimeout(() => {  
                        dom.innerHTML = ''   
                        dom.innerHTML = searchAdv
                        let script =document.createElement("script"); 
                        script.type='text/javascript';
                        let nHTML='(adsbygoogle = window.adsbygoogle || []).push({});';
                        script.setAttribute('class','refresh-my-adv');
                        script.innerHTML = nHTML
                        dom.appendChild(script);  
                }, 100);
            } 
            // 跳转到recipes详情数据
            recipesDetails(item : any) { 
                let that : any = this; 
                if(item.hasOwnProperty("picture")) {
                    that.$router.push({
                        path : `/Hodgepodge/${item.typeName.replace(/\s+/g,'-')}/${item.title.trim().replace(/\s+/g,'-').replace(/[\+ | \? | \% | \& | \= | \# | \^ | \* | \! | \$|\/]/g,'')}/${item.id}`,
                        /* query : {  
                            id : item.id, 
                            userID: `${that.deviceId}_search`
                        } */
                    })
                }
                else {
                     that.$router.push({
                        path : "/RecipesDetail",
                        query : {  
                            cid : item.cid,
                            doc_id : item.doc_id,
                            // userID: `${that.deviceId}_search`
                        }
                    })
                }  
            }
            @Watch("$route")
            routeChange() {
                let that : any = this;
                that.$router.go(0);
            }
    }
</script>
 
<style lang="scss" scoped>
    @import "./css/search.scss";
</style>

