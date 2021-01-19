<template>
    <div class="search-list-title1">
        <strong>   
                <span>total of <em class="imp">{{searchMenuCount}}</em ></span>  <em class="imp">{{searchVal}} </em> menus 
        </strong> 
    </div>
</template>
<script lang="ts">
    import {Component ,Prop,Vue} from "vue-property-decorator";
    @Component({
       
    })
    export default class searchNumber extends  Vue{
        @Prop({
            type : Number,
            default : 0
        })
        searchMenuCount !:number
        @Prop({
            type : String,
            default : ""
        })
        searchVal !:string
    }
</script>


 