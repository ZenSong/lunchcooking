<template>
    <div class="maybe-like"  >
        <div  class="show-tit"> 
                You maybe like 
        </div>
        <ul class="maybe-like-list">
            <li @click="detailsPage(item)" v-for="(item,index) in maybeLikeArr" :key="index">
                <div>
                    <div>
                        <img :src="item.picture" alt="No pictures found">
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
            </li> 
        </ul>  
    </div> 
</template>
<script lang="ts"> 
import {Component ,Prop,Vue} from "vue-property-decorator";
 @Component({

 })
 export default class MaybeLike extends Vue {
    @Prop({
        type : Array,
        default () {
            return []
        },
    })
    maybeLikeArr : any 
    detailsPage (item : any) { 
            let that : any = this; 
            that.$router.push({
                path : `/Hodgepodge/${item.typeName.replace(/\s+/g,'-')}/${item.title.trim().replace(/\s+/g,'-').replace(/[\+ | \? | \% | \& | \= | \# | \^ | \* | \! | \$|\/]/g,'')}/${item.id}`,
                /* query : {  
                    id : item.id, 
                    name : that.listName,
                    userID: `${that.deviceId}__Hodgepodge${that.$route.query.id}`
                } */
            })
        }
 }
</script>