<template>
    <div>
        <van-pull-refresh v-model="myRef" @refresh="obj.refreshData" loading-text="loading" loosing-text="release and refresh" pulling-text="Pull down to refresh">
            <ul class="hodgepodge-clearfix">   
                <li v-for="(item, index) in obj.recipesClearfixArr" :key="index" @click="obj.AllRecipesDetails(item)"> 
                    <listItem :item="item" /> 
                </li>   
            </ul>
        </van-pull-refresh> 
    </div>    
</template>
<script lang="ts"> 
import {Component ,Prop,Vue, Watch} from "vue-property-decorator";
import listItem from "components/list/ListItem.vue"
 @Component({
    components : {
        listItem
    }
 })
 export default class HodgepodgeGuide extends Vue {
    myAdv : boolean =false
    created() {
       this.myAdv =   (this.obj as any).dropDownRefresh
    }
    @Prop({
        type :Object,
        default () {
            return {}
        }
    })
    obj !: object
    @Watch( "obj",{deep:true})
    change(newValue : boolean , oldValue : boolean ) {
        console.log(newValue);
        (this.obj as any).dropDownRefresh = (<any>newValue).dropDownRefresh 
        this.myAdv =   (this.obj as any).dropDownRefresh
    }
    changeRefresh (bool : boolean) { 
        (this.obj as any).dropDownRefresh = bool
        
    } 
    get myRef () {
        return this.myAdv
    }
    set myRef (value : any) {
         
    }
    @Prop()
    
 }
</script>
