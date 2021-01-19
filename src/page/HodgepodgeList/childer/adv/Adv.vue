<template>
    <div> 
        <!-- 谷歌广告 --> 
        <div class="newGoogleList refreshAdv" v-if="hodgepodgeListID == 26" v-html="HodgepodgeListAdv.hodgepodgeListID26">
                
        </div> 
        <div class="newGoogleList refreshAdv" v-else-if="hodgepodgeListID == 25"  v-html="HodgepodgeListAdv.hodgepodgeListID25">

        </div> 
        <div class="newGoogleList refreshAdv" v-else-if="hodgepodgeListID == 24" v-html="HodgepodgeListAdv.hodgepodgeListID24">
            
        </div> 
        <div class="newGoogleList refreshAdv" v-else-if="hodgepodgeListID == 23" v-html="HodgepodgeListAdv.hodgepodgeListID23">
                
        </div> 
        <div class="newGoogleList refreshAdv" v-else-if="hodgepodgeListID == 2" v-html="HodgepodgeListAdv.hodgepodgeListID2">
                
        </div> 
        <div class="newGoogleList refreshAdv" v-else-if="hodgepodgeListID == 1" v-html="HodgepodgeListAdv.hodgepodgeListID1">
                
        </div> 
        <div class="newGoogleList refreshAdv" v-else v-html="HodgepodgeListAdv.hodgepodgeListID26">  
        </div> 
    </div>
</template>
<script lang="ts"> 
import {Component ,Prop,Vue} from "vue-property-decorator";
 @Component({

 })
 export default class hodgepodgeGuide extends Vue { 
    @Prop(
        {
            type : String,
            default : '26',
        }  
    )
    hodgepodgeListID : any
    @Prop(
        {
            type : Object,
            default () {
                return {}
            }
        }  
    )
    HodgepodgeListAdv : any
 }
</script>