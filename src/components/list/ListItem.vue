<template> 
    <div >
        <div> 
            <img v-lazy="item.thumb || item.picture" alt="No pictures found"> 
        </div>
        <div>
            <div v-html="item.title"></div> 
            <div>
                    <img src="~assets/img/reading.png" alt="No pictures found">  
                    <div>{{item.reading}}</div>
                    <div> {{new Date(item.createTime).toDateString().split(' ').splice(1,3).join(' ')}}</div>
            </div>  
        </div> 
    </div>   
  
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator" 
    @Component({

    })  
    export default class listItem extends Vue {
        @Prop({ 
            type : Object,
            default () {
                return []
            }
        }) 
        item : any
    }  
</script>  
 