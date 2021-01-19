<template>
    <div class="hodgepodge-guide">
        <div>
            <div @click="goHome()" >Home</div>
            <div class="point"></div>
            <div class="no-point">{{hodgepodgeListName}}</div>  
        </div>
    </div>
</template>
<script lang="ts"> 
import {Component ,Prop,Vue} from "vue-property-decorator";
 @Component({

 })
 export default class HodgepodgeListGuide extends Vue {
    @Prop({
        type : String,
        default : '',
    })
    hodgepodgeListName : any
    goHome() {
        let that : any = this;
        that.$router.push({
            path : "/"
        })
    }
 }
</script>