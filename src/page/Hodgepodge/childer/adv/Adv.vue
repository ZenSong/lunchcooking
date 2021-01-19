<template>
    <!-- 谷歌广告 -->
    <div class="newGoogleList" v-html="HodgepodgeAdv.top">  
    </div>
</template>
<script lang="ts"> 
import {Component ,Prop,Vue} from "vue-property-decorator";
 @Component({

 })
 export default class HodgepodgeGuideAdv extends Vue {
    @Prop({
        type : Object,
        default () {
            return {}
        },
    })
    HodgepodgeAdv : any 
 }
</script>