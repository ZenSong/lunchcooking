<template>
    <div class="new-detail-header">
        <div class="new-detail-guide">
            <div>
                <div @click="goHome()" >Home</div>
                <div class="point"></div>
                <div class="no-point" @click="goBack()">{{listName}}</div>  
            </div>
        </div> 
    </div>
</template>
<script lang="ts"> 
import {Component ,Prop,Vue} from "vue-property-decorator";
 @Component({

 })
 export default class HodgepodgeNav extends Vue {
    @Prop({
        type : String,
        default : '',
    })
    listName : any
    goHome() {
        let that : any = this;
        that.$router.push({
            path : "/"
        })
    }
    goBack () {
        (this as any).$router.go(-1);
    };
 }
</script>