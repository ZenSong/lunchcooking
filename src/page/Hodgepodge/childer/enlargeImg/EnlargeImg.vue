<template>
     <div>
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
import {Component ,Prop,Vue} from "vue-property-decorator";
 @Component({

 })
 export default class HodgepodgeNav extends Vue {
    @Prop()
    showMaxImg : any 
    @Prop()
    HodgepodgeAdv : any 
    @Prop()
    MaxImgArr : any 
    @Prop()
    showMaxImg1 : any 
    @Prop()
    showMaxImgPreview : any
    @Prop()
    startMaxImg : any
    @Prop()
    startMaxImg1 : any 
    @Prop()
    contentChange : any
    @Prop()
    swipeChange : any
 }
</script>