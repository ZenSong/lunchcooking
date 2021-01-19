<template>
    <div class="new-detail"> 
        <navber></navber>
        <hodgepodgeGuide :listName= "listName"/>
        
        <HodgepodgeAdvCpn :HodgepodgeAdv="HodgepodgeAdv"  />

        <h2 class="new-detail-title" v-html="title"> </h2>
        <div class="create-time">{{new Date(createTime).toDateString().split(' ').splice(1,3).join(' ')}} </div>
        
        <!-- 轮播 -->
        <mySwipe :swipeArr = "swipeArr" />

        <div class="new-content">
            <div v-html="myHtml" class="new-my-html"></div>
        </div>   

        <!-- 谷歌广告 -->
        <div class="my-scroll-adv-bottom"></div>

        <!-- 有可能喜欢 -->
        <maybeLike :maybeLikeArr="maybeLikeArr" />

        
        <!-- 内容里的文章 -->
        <!-- <enlargeImg :contentChange="contentChange" :swipeChange="swipeChange" :showMaxImg="showMaxImg" :HodgepodgeAdv="HodgepodgeAdv"  :MaxImgArr="MaxImgArr" :showMaxImg1="showMaxImg1" :showMaxImgPreview="showMaxImgPreview" :startMaxImg="startMaxImg" :startMaxImg1="startMaxImg1"/>  -->
        <div class="my-type-img-preview" v-if="showMaxImg">
            <div class = "type-img-preview-adv" v-html="HodgepodgeAdv.img">   
            </div>
            <div class="teleport-img-preview"></div>
        </div>
        <van-image-preview
            @change= "contentChange"
            className = "my-amplification"
            v-model="showMaxImg"
            :images="MaxImgArr" 
            :start-position = "startMaxImg"
            :show-index = false
            :style="{ height: '85vh',width : '100%' ,marginTop : '15vh',zIndex:'2000002'}"
            get-container=".teleport-img-preview"
            >  
        </van-image-preview>
        <!-- 轮播图片 -->
        <div class="my-type-img-preview-1" v-if="showMaxImg1">
            <div class = "type-img-preview-adv-1" v-html="HodgepodgeAdv.img">   
            </div>
            <div class="teleport-img-preview-1"></div>
        </div>
        <van-image-preview
            @change= "swipeChange"
            className = "my-amplification1"
            v-model="showMaxImg1"
            :images="showMaxImgPreview" 
            :start-position = "startMaxImg1"
            :show-index = false
            :style="{ height: '85vh',width : '100%' ,marginTop : '15vh',zIndex:'2000002'}"
            get-container=".teleport-img-preview-1"
            >  
        </van-image-preview>
    </div>
</template>
<script lang="ts">
    import{Component,Vue, Watch} from "vue-property-decorator"
    import {record,dynamicInsertion} from "network/tool.ts"
    import {getDetails,getRota} from "network/Hodgepodge.ts"
    import {getFoodselfListByPage} from "network/HodgepodgeList.ts"
    import {HodgepodgeAdv} from "ADCode/ADCode.ts"

    import navber from "components/navigation/navigation.vue";
    import hodgepodgeGuide from "./childer/nav/Nav.vue"
    import HodgepodgeAdvCpn from "./childer/adv/Adv.vue"
    import mySwipe from "./childer/swipe/swipe.vue"
    import maybeLike from "./childer/maybeLike/MaybeLike.vue"
    @Component({
        components : {
            navber,
            hodgepodgeGuide,
            HodgepodgeAdvCpn,
            mySwipe,
            maybeLike,
        },  
         
    })
    export default class NewDetail extends Vue {
        created () { 
            let that :any = this;
            that.myInit();
        } 
        deviceId : string = "" // 模拟用户id
        title : string = "";
        listName : string = "";
        myHtml : string = ""        // 页面html
        showMaxImg: boolean =  false  // 全屏显示图片
        showMaxImg1: boolean =  false  // 轮播全屏显示图片
        MaxImgArr : [] = []    // 全屏需要显示图片的数据
        showMaxImgPreview: [] = []    // 轮播全屏需要显示图片的数据
        startMaxImg : number =  0   // 图片预览位置
        startMaxImg1 : number =  0   // 轮播图片预览位置
        maybeLikeArr : any [] = []  // 有可能喜欢
        swipeArr : any [] = [] // 轮播数据 
        
        createTime : string = '' // 文章时间
        HodgepodgeAdv : any = HodgepodgeAdv // 广告
        myInit() {
            document.documentElement.scrollTop =0;
            document.body.scrollTop = 0
            let that :any = this;
            that.title  = "";
            that.listName  = "";
            that.myHtml  = ""        
            that.showMaxImg =  false  
            that.showMaxImg1 = false 
            that.MaxImgArr  = []     
            that.showMaxImgPreview = []
            that.startMaxImg1 = 0
            that.startMaxImg  =  0    
            that.maybeLikeArr   = []   
            that.swipeArr  = [] ; 
            var id = that.$route.params.id;   
            id ? (that.getData(id),that.getSwipeArr(id)) : ""; 
            that.listName = that.$route.params.typeName ? that.$route.params.typeName : "";
            record(window.location.href); 
            /* 点击有可能喜欢的时候 给底部广告清空 */
            if(document.querySelector('.my-scroll-adv-bottom')) {
                (<HTMLElement>document.querySelector('.my-scroll-adv-bottom')).innerHTML = ""
            } 
            dynamicInsertion()
            
        };
         // 离开时操作
        destroyed(){
            // 广告
            window.removeEventListener('scroll', this.scrollAdv, false); 
        }
        getSwipeArr (id : number) {
            let that :any = this;
            new getRota(id).get()
            .then((res : any) =>{  
                if(res.data) {  
                    that.showMaxImgPreview =  that.swipeArr = res.data.data[0].picture.split(',')   
                    that.$nextTick(() => {
                        let imgArr = Array.from(document.querySelectorAll(".my-swipe-img") as NodeListOf<HTMLElement>);  
                        imgArr.forEach((e:any,i:number) => {  
                            e.addEventListener("click",() =>{
                                that.showMaxImg1 = true ;
                                that.startMaxImg1 = i ;  
                                setTimeout(() => {
                                    that.$nextTick(()=> {
                                        let myAmplification = Array.from(document.querySelectorAll('.my-amplification1 .van-swipe-item'));  
                                        // 防止重复添加
                                        let repeatImg  =   Array.from(myAmplification[i].querySelectorAll('.myPositionSon'));
                                        if(repeatImg.length <= 0) {
                                            var myImg : any = myAmplification[i].querySelector('img');  
                                            // 往图片里添加 缩小标签
                                            var div = document.createElement("div") 
                                            var divSon = document.createElement("img") 
                                            div.setAttribute('class','myPositionImg')
                                            div.style.position = 'relative'; 
                                            divSon.setAttribute('class','myPositionSon')
                                            divSon.src = require("../../assets/img/small.png")  
                                            div.style.display = 'flex';
                                            div.style.alignItems = 'center'; 
                                            div.style.width = '100%';  
                                            myImg.parentNode.style.display = 'flex';
                                            myImg.parentNode.style.alignItems = 'center';   
                                            myImg.style.height = 'auto';  
                                            myImg.style.objectFit = ''; 
                                            myImg.parentNode.replaceChild(div, myImg)
                                            div.appendChild(myImg)
                                            div.appendChild(divSon) 
                                        } 
                                    }) 
                                    var ads = <HTMLElement>document.querySelector(".type-img-preview-adv-1");
                                    let script =document.createElement("script"); 
                                    script.type='text/javascript';
                                    let nHTML='(adsbygoogle = window.adsbygoogle || []).push({});';
                                    script.setAttribute('class','mygoogleList1');
                                    script.innerHTML=nHTML
                                    ads.appendChild(script);  
                                }, 200); 
                            })
                        }); 
                    })
                }   
            })
            .catch((err : any) =>{
                console.log(err)
            })
        } 
        // 轮播里的图片切换
        swipeChange(i : number) {
            setTimeout(()=>{
                let myAmplification = Array.from(document.querySelectorAll('.my-amplification1 .van-swipe-item'));  
                // 防止重复添加
                let repeatImg  =   Array.from(myAmplification[i].querySelectorAll('.myPositionSon'));
                if(repeatImg.length <= 0) {
                    var myImg : any = myAmplification[i].querySelector('img');  
                    // 往图片里添加 缩小标签
                    var div = document.createElement("div") 
                    var divSon = document.createElement("img") 
                    div.setAttribute('class','myPositionImg')
                    div.style.position = 'relative'; 
                    divSon.setAttribute('class','myPositionSon')
                    divSon.src = require("../../assets/img/small.png")  
                    div.style.display = 'flex';
                    div.style.alignItems = 'center'; 
                    div.style.width = '100%'; 
                    myImg.parentNode.style.display = 'flex';
                    myImg.parentNode.style.alignItems = 'center';   
                    myImg.style.height = 'auto';  
                    myImg.style.objectFit = '';
                    myImg.parentNode.replaceChild(div, myImg)
                    div.appendChild(myImg)
                    div.appendChild(divSon) 
                } 
            },200)
        }
        getData(id : number) { 
            let that :any = this;
            new getDetails(id).get()
            .then((res : any) =>{  
                if(res.data.data.hasOwnProperty("details")) { 
                    that.getMakeLike(res.data.data.typeId)
                    that.createTime = res.data.data.createTime
                    that.myHtml = res.data.data.details.replace(/&nbsp;/g,"     ");  
                    that.title = res.data.data.title; 
                    // 设置title标签
                    that.$nextTick(()=>{  
                        var title : any = document.querySelector("title") as HTMLElement;
                        var myTitle : any = document.querySelector(".new-detail-title") as HTMLElement; 
                        title.innerHTML = myTitle.textContent;
                    }) 
                }  
                // 详情页的操作
                that.$nextTick(() =>{  
                    // 谷歌广告
                    var fatherDiv = document.querySelector(".new-my-html")
                    var sonDivs = document.querySelectorAll(".new-my-html p")  
                    if(sonDivs.length ==0) {
                        sonDivs = document.querySelectorAll(".new-my-html >div")
                    }
                    if(sonDivs.length ==0) {
                        sonDivs = document.querySelectorAll(".new-my-html li")
                    }  
                    var l = sonDivs.length;
                    // 广告随机 
                    var d = parseInt((Math.random()  * (l- parseInt( (l/2)   as any) ) + 0) as any ) 
                    var div = document.createElement("div")
                    div.setAttribute("class","my-scroll-adv"); 
                    // var s = '<div class="newGoogleList"> <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7936490518220507" data-ad-slot="9810955341" data-ad-format="auto" data-full-width-responsive="true"></ins> </div>' 
                    // div.innerHTML = s;
                    if(sonDivs.length ==0) { 
                        var adsFather = <HTMLElement>document.querySelector(".new-my-html");
                        adsFather.insertBefore(div,adsFather.firstChild)
                    }
                    else {
                        (sonDivs[d] as any).parentNode.insertBefore(div, sonDivs[d].nextSibling);
                    }  
                    // 广告监听
                    window.addEventListener('scroll', that.scrollAdv, false); 
 
                    // 让网页能正常显示的操作
                    let picture = Array.from(document.querySelectorAll("picture") as NodeListOf<HTMLElement>); 
                    picture.forEach((element : any) => {
                        var div = <HTMLElement>document.createElement('div'); 
                        div.innerHTML = element.innerHTML;
                        (element.parentNode as any).replaceChild(div,element)
                    }); 
                    let singleNextLink = Array.from(document.querySelectorAll(".single--next-link") as NodeListOf<HTMLElement>);  
                    singleNextLink.forEach((element : any) => {
                        (element.parentNode as any).removeChild(element);
                    });
                    let als =  Array.from(document.querySelectorAll("a") as NodeListOf<HTMLElement>);
                    als.forEach((element : any) => {
                        element.setAttribute("href","javaScript:void(0)");
                        element.removeAttribute("target");
                    }); 
                    // 获取图片链接
                    let imgArr = Array.from(document.querySelectorAll(".new-my-html img") as NodeListOf<HTMLElement>);  
                    imgArr.forEach((e:any,i:number) => { 
                        // 往图片里添加 放大标签
                        var div = document.createElement("div") 
                        var divSon = document.createElement("img") 
                        div.setAttribute('class','myPositionImg')
                        div.style.position = 'relative'; 
                        divSon.setAttribute('class','myPositionSon')
                        divSon.src = require("../../assets/img/big2.png")  
                        e.parentNode.replaceChild(div, e)
                        div.appendChild(e)
                        div.appendChild(divSon) 

                        that.MaxImgArr.push(e.getAttribute("src"))  
                        
                    });   
                    var myPosition = Array.from(document.querySelectorAll('.myPositionImg'))
                    myPosition.forEach((e,i) => { 
                        e.addEventListener("click",() =>{  
                            that.showMaxImg = true ;
                            that.startMaxImg = i ;
                            setTimeout(() => {
                                that.$nextTick(()=> {
                                    let myAmplification = Array.from(document.querySelectorAll('.my-amplification .van-swipe-item'));  
                                    // 防止重复添加
                                    let repeatImg  =   Array.from(myAmplification[i].querySelectorAll('.myPositionSon'));
                                    if(repeatImg.length <= 0) {
                                        var myImg : any = myAmplification[i].querySelector('img');  
                                        // 往图片里添加 缩小标签
                                        var div = document.createElement("div") 
                                        var divSon = document.createElement("img") 
                                        div.setAttribute('class','myPositionImg')
                                        div.style.position = 'relative'; 
                                        divSon.setAttribute('class','myPositionSon')
                                        divSon.src = require("../../assets/img/small.png")  
                                        div.style.display = 'flex';
                                        div.style.alignItems = 'center'; 
                                        div.style.width = '100%'; 

                                        myImg.parentNode.style.display = 'flex';
                                        myImg.parentNode.style.alignItems = 'center';   
                                        myImg.style.height = 'auto';  
                                        myImg.style.objectFit = '';

                                        myImg.parentNode.replaceChild(div, myImg)
                                        div.appendChild(myImg)
                                        div.appendChild(divSon) 
                                    } 
                                }) 
                                var ads = <HTMLElement>document.querySelector(".type-img-preview-adv");
                                let script =document.createElement("script"); 
                                script.type='text/javascript';
                                let nHTML='(adsbygoogle = window.adsbygoogle || []).push({});';
                                script.setAttribute('class','mygoogleList1');
                                script.innerHTML=nHTML
                                ads.appendChild(script);  
                            }, 200); 
                        })
                    }) 
                    document.documentElement.scrollTop =0;
                    document.body.scrollTop = 0
                })
            })
            .catch((err : any) =>{
                console.log(err)
            })
        };
        // 文章图片预览里的切换
        contentChange(i : number) { 
            setTimeout(()=>{
                let myAmplification = Array.from(document.querySelectorAll('.my-amplification .van-swipe-item'));  
                // 防止重复添加
                let repeatImg  =   Array.from(myAmplification[i].querySelectorAll('.myPositionSon'));
                if(repeatImg.length <= 0) {
                    var myImg : any = myAmplification[i].querySelector('img');  
                    // 往图片里添加 缩小标签
                    var div = document.createElement("div") 
                    var divSon = document.createElement("img") 
                    div.setAttribute('class','myPositionImg')
                    div.style.position = 'relative'; 
                    divSon.setAttribute('class','myPositionSon')
                    divSon.src = require("../../assets/img/small.png")  
                    div.style.display = 'flex';
                    div.style.alignItems = 'center'; 
                    div.style.width = '100%';  
                    myImg.parentNode.style.display = 'flex';
                    myImg.parentNode.style.alignItems = 'center';   
                    myImg.style.height = 'auto';  
                    myImg.style.objectFit = ''; 
                    myImg.parentNode.replaceChild(div, myImg)
                    div.appendChild(myImg)
                    div.appendChild(divSon) 
                } 
            },200)
        }
        // 滑到一定位置显示文章中的广告  
        scrollAdv () {
            // 文章中广告
            let that : any = this;
            let bodyScroll = document.documentElement.scrollTop || document.body.scrollTop;
            let myScrollAdv = Array.from(document.querySelectorAll('.my-scroll-adv')); 
            if(myScrollAdv.length > 0) {
                myScrollAdv.forEach((e :any,i : number)=>{   
                    if(e.getBoundingClientRect().top <= 350) { 
                        that.dynamicInsertionScrollAdv(e)
                    }
                })
            }
            // 底部广告
            let myScrollAdvBotton = Array.from(document.querySelectorAll('.my-scroll-adv-bottom')); 
            if(myScrollAdvBotton.length > 0) {
                myScrollAdvBotton.forEach((e : any,i : number)=>{
                    // 滑到底才能请求广告  
                    if(e.getBoundingClientRect().top <= 350  ) { 
                        this.dynamicInsertionAdvBotton(e)
                    }
               })
            }
           // 有可能喜欢 
           /* let myScrollAdvMaybeLike = Array.from(document.querySelectorAll('.my-scroll-adv-maybe-like')); 
            if(myScrollAdvMaybeLike.length > 0) {
                myScrollAdvMaybeLike.forEach((e : any,i : number)=>{
                   // 滑到底才能请求广告  
                    if(e.getBoundingClientRect().top <= 450  ) { 
                        this.dynamicInsertionAdvMaybeLike(e)
                    }
               })
           } */
        }
        // 动态加载谷歌广告 文章中
        dynamicInsertionScrollAdv(dom : any){ 
            let myVar=setTimeout(() => {
                    var ss = dom.querySelectorAll(".my-scroll-adv-add");
                    if(ss.length > 0 && ss[0].innerHTML == '(adsbygoogle = window.adsbygoogle || []).push({});') {
                         
                    } 
                    else { 
                        var s = HodgepodgeAdv.content
                        dom.innerHTML = s;
                        let script =document.createElement("script"); 
                        script.type='text/javascript';
                        let nHTML='(adsbygoogle = window.adsbygoogle || []).push({});';
                        script.setAttribute('class','my-scroll-adv-add');
                        script.innerHTML=nHTML
                        dom.appendChild(script);
                    }  
            }, 10);
        } 
        // 底部
        dynamicInsertionAdvBotton(dom : any){ 
            let that = this;
            let myVar=setTimeout(() => {
                    var ss = dom.querySelectorAll(".my-scroll-adv-add-botton");
                    if(ss.length > 0 && ss[0].innerHTML == '(adsbygoogle = window.adsbygoogle || []).push({});') {
                         
                    } 
                    else { 
                        dom.innerHTML = HodgepodgeAdv.bottom
                        let script =document.createElement("script"); 
                        script.type='text/javascript';
                        let nHTML='(adsbygoogle = window.adsbygoogle || []).push({});';
                        script.setAttribute('class','my-scroll-adv-add-botton');
                        script.innerHTML=nHTML
                        dom.appendChild(script); 
                    }  
            }, 10);
        }
        // 有可能喜欢
        /* dynamicInsertionAdvMaybeLike(dom : any){ 
            let that = this;
            let myVar=setTimeout(() => {
                    var ss = dom.querySelectorAll(".my-scroll-adv-add-maybe-like");
                    if(ss.length > 0 && ss[0].innerHTML == '(adsbygoogle = window.adsbygoogle || []).push({});') {
                         
                    } 
                    else { 
                        dom.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="-fb+5w+4e-db+86" data-ad-client="ca-pub-7936490518220507" data-ad-slot="9285584039"></ins>'
                        let script =document.createElement("script"); 
                        script.type='text/javascript';
                        let nHTML='(adsbygoogle = window.adsbygoogle || []).push({});';
                        script.setAttribute('class','my-scroll-adv-add-maybe-like');
                        script.innerHTML=nHTML
                        dom.appendChild(script); 
                    }  
            }, 10);
        } */
        getMakeLike (id : number) {
            let that :any = this; 
            var Ri = parseInt((Math.random() * (10-1) +1) as any)   
            new getFoodselfListByPage(Ri,4,id).get()
            .then((res : any) =>{ 
                if(res.data.data.list.length > 0) { 
                    that.maybeLikeArr = res.data.data.list;
                    that.$nextTick(()=>{
                        document.documentElement.scrollTop =0;
                        document.body.scrollTop = 0
                        dynamicInsertion()
                    })
                }   
            })
            .catch((err : any) =>{
                console.log(err)
            })
        };
        
        
        
         
        
        @Watch('$route')
        routeChanged() { 
            let that :any = this;
            that.myInit()   
        }
    }
</script>  

<style>
.new-my-html img,.myPositionImg img {  
    width: 100% !important;  
    /* max-height: 350px; */
}
.new-my-html .myPositionSon,.myPositionImg .myPositionSon{
    width: 30px !important; 
    height: 30px;
    position: absolute;
    right: 8px;
    bottom: 10px;
    margin: 0;
    background-color: transparent !important; 
}
.newGoogleList{
    z-index: 2222222222;
}
.new-my-html  h3{ 
    font-weight: bold !important;
    font-weight: 1000 !important;
    margin: 0.5rem 0 !important;
} 
.new-my-html  img{
    width: 100%; 
    margin: 0 !important;
    height: 15rem;
}
.new-my-html  p{
    width: 100%;
    font-size: 1rem;  
} 
.new-my-html  *{
    width: 100% !important;
    font-size: 1rem;
    margin: 10px 0 !important;
    word-break: break-all;
    text-indent: 0 !important;
    background-color: #ffffff !important;
    transform: translate3d(0,0,0) !important;
}  
 .new-my-html .my-scroll-adv {
     margin: 0 !important;
 }

    .my-adv-show{
        background-color: rgba(0,0,0,.9);
    }
    .my-type-img-preview{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 200000002;
    }
    .my-type-img-preview .type-img-preview-adv { 
        width: 100%;
        height: 15vh;  
        background-color: rgba(0,0,0,.9); 
        z-index: 200000008;
    }
    .my-type-img-preview .teleport-img-preview{
        width: 100%;
        height: 85vh;
        z-index: 200000002;
    }
    .teleport-img-preview * {
        height: 100%;
    }
    .teleport-img-preview img{
        height: auto;
    } 
    .my-type-img-preview-1{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 200000002;
    }
    .my-type-img-preview-1 .type-img-preview-adv-1 { 
        width: 100%;
        height: 15vh;  
        background-color: rgba(0,0,0,.9); 
        z-index: 200000008;
    }
    .my-type-img-preview-1 .teleport-img-preview-1{
        width: 100%;
        height: 85vh;
        z-index: 200000002;
    }
    .teleport-img-preview-1 * {
        height: 100%;
    }
    .teleport-img-preview-1 img{
        height: auto;
    }  
    .new-detail .van-overlay{
        width: 100%;
        height: 85vh;
        margin-top: 15vh;

    }
    .navigation .van-overlay{
        width: 100%;
        height: 100vh !important;  
    }
    .new-detail .van-image-preview{
        z-index: 200010002 !important;
    }
</style>
<style lang="scss" scoped>
    @import "./css/Hodgepodge.scss";
</style>