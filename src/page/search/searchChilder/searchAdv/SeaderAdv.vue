<template>
    <!-- 谷歌广告 -->
    <div class="newGoogleList refreshAdv" v-html="searchAdv"></div>
</template>
<script lang="ts">
    import {Component ,Prop,Vue} from "vue-property-decorator";
    @Component({
       
    })
    export default class searchNumber extends  Vue{
        @Prop({
            type : String,
            default : ""
        })
        searchAdv !:string
    }
</script> 