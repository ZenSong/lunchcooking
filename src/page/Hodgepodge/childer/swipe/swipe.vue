<template>
    <div class="home-swipe" v-if="swipeArr.length>0">
            <van-swipe :autoplay="5000000" :duration="1000"   :initial-swipe="startPage"  ref="swipe" @change="carouselEndIndex"  >
                <van-swipe-item v-for="(item, index) in swipeArr" :key="index">
                    <ul>
                        <li>
                            <div style="position: relative;"  class="my-swipe-img">
                                <img :src="item" alt="">
                                <img style="position: absolute; width: 30px;height:30px;right: 8px;bottom: 8px;" src="~assets/img/big2.png" alt="">
                            </div> 
                        </li>
                    </ul>
                </van-swipe-item>
            </van-swipe>  
            <div class="carousel-direction-left" @click="previous()">
                <van-icon name="arrow-left" color="#1989fa" size="2rem"/>
            </div>
            <div class="carousel-direction-right" @click="nextPicture()">
                <van-icon name="arrow" color="#1989fa" size="2rem"/>
            </div>
    </div> 
</template>
<script lang="ts"> 
import {Component ,Prop,Vue} from "vue-property-decorator";
 @Component({

 })
 export default class mySwipe extends Vue {
    startPage : number = 0  // 轮播起始
    @Prop({
        type : Array,
        default : [],
    })
    swipeArr : any
    carouselEndIndex(index:number){  
        //  滑动的是哪个轮播 
        let that : any = this;
        that.startPage = index;
    }
    // 上一张
    previous() {
        let that : any = this; 
        if(that.startPage == 0) {
            that.$refs.swipe.swipeTo(that.swipeArr.length-1);
        }
        else {
            that.$refs.swipe.swipeTo(--that.startPage);
        } 
    }
    // 下一张
    nextPicture() { 
        let that : any = this;
        if(that.startPage == (that.swipeArr.length-1)) {
            that.$refs.swipe.swipeTo(0);
        }
        else {
            that.$refs.swipe.swipeTo(++that.startPage);
        }  
    }
 }
</script>