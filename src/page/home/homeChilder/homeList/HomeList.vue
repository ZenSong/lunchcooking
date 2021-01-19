<template>
<div class="home-content">  
    <div class="home-list" v-for="(item, index) in homeList" :key="index"> 
                 
        <div class="section-title"  >
            <div> 
                <h3>{{item.typeName}}</h3>
            </div>  
        </div>  
        <div>
            <ul class="home-list-new-1" v-if="item.id != 1000 && item.id != 1001">  
                <li v-for="(proNew, newIndex) in item.data" :key="proNew+newIndex" @click="newDetails(proNew,item.typeName)">
                    
                    <listItem :item="proNew" />
                </li>  
            </ul>
                
            <div class="load-more" >
                <div @click="homeListMore(item,index)">
                    <div>VIEW MORE </div>  
                </div> 
            </div> 
        </div>   
    </div>
</div>
</template>
<script lang="ts"> 
import {Component,Prop,Vue} from 'vue-property-decorator'

import listItem from "components/list/ListItem.vue";
@Component({
    components : {
        listItem
    }
})
export default class HomeList extends Vue {

    @Prop({
        type : Array,
        default () {
            return []
        }
    })
    homeList :  any 

    newDetails(item : any, name : string) {
        let that : any = this; 
        that.$router.push({
            path : `/Hodgepodge/${name.replace(/\s+/g,'-')}/${item.title.trim().replace(/\s+/g,'-').replace(/[\+ | \? | \% | \& | \= | \# | \^ | \* | \! | \$|\/]/g,'')}/${item.id}`, 
    
        })
    }
}
</script>