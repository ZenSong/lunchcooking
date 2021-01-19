<template>
    <div class="navigation"> 
        <!-- <div v-if="myHeaderValue == 1" class="home-header">
            <div @click="menu()" class="navigation-icon"> 
                 <img v-show="menuShow" class="fan-cha" src="../../../src/assets/img/fancha.png" alt="">
                 <img v-show="!menuShow" src="../../../src/assets/img/pingcha.png" alt="">
            </div>  
            <div>Tastycooking </div>
        </div> -->
        <!-- v-if="myHeaderValue != 1" -->
        <div   class="recipes-header">
            <div>
                <div @click="menu()" class="navigation-icon">
                    <img v-if="menuShow" class="fan-cha" src="~assets/img/fancha.png" alt="">
                    <img v-else  src="~assets/img/pingcha.png" alt="">
                </div>  
                <div>Tastycooking</div>
            </div>
            <div>
                <div>
                    <input class="search-val" type="text" placeholder="SEARCH" @keypress="CheckInfo()"> 
                </div>
                <div @click="search()">
                    <img src="~assets/img/sousou.png" alt="">
                </div> 
            </div>
        </div>  
        <van-popup v-model="menuShow" position="left"  duration="0.5"   :overlay-style="{marginTop: '2.8rem' }"   get-container=".navigation"       :style="{ marginTop: '2.8rem', width: '70%', height: '100%',zIndex: '2222222222', background: 'white',overflowY: 'scroll'}">
            <ul class="navber-menu">  
                <li v-for="(item,index) in myMenu" :key="index" >
                     <div @click="selectActive(item,index)">
                        <div :class="{'span-1': setMyActive === index}"></div>
                        <div>
                           
                            <div>{{item.typeName}}</div>
                        </div>
                    </div>
                </li>  
                
            </ul>
        </van-popup>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'; 
    import {record} from "network/tool.ts"
    import {getFoodtypeList} from "network/List.ts"
    import {setTabValue} from "store/mutationsType";
    @Component({
           
    })  
    export default class navigation extends Vue { 
            menuShow : boolean =  false
            myMenu : any [] = [ 
                {
                    id : 1000000,
                    typeName : 'Home'
                }, 
            ] 
            myVal : string =  ""
            first : string =  ""
            headerValue : number = 1

            created () {  
                let that : any = this
                that.myVal = that.$route.query.searchVal
                that.first = that.$store.state.selectTabValue; 
                new getFoodtypeList().get()
                .then((res : any) => { 
                    that.myMenu.push(...res.data.data); 
                    
                })
                .catch((err : any) => {
                    console.log(err)
                }) 
            } 
            mounted() {
                let that : any = this
                if(that.myVal != undefined) {
                    let val :any = document.querySelector(".recipes-header .search-val") as HTMLElement
                    val.value = that.myVal
                }  
                
            }

            menu () {  
                let that : any = this
                that.menuShow = !that.menuShow;
            }
            CheckInfo(evt : any){ 
                let that : any = this;
                evt = (evt) ? evt : window.event
                if (evt.keyCode) {
                    if(evt.keyCode == 13){
                        that.search () 
                    }
                }
            }
            search () {
                let that : any = this
                let val :any = document.querySelector(".recipes-header .search-val") as HTMLElement; 
                if(val.value.replace(/\s*/gi,"") != "") { 
                    that.$router.push({
                        path : `/search/${val.value.replace(/\//g,'')}`, 
                    }) 
                    if(that.first == 0){
                        this.$emit('getSearchVal1',val.value)
                        var myVar1=setTimeout(() => { 
                            this.$router.go(0);   
                            window.scrollTo(0,0);  
                        }, 50);
                    } 
                } 
            }
            selectActive(item : any,index : number) { 
                let that : any = this;
                that.$store.commit(setTabValue,index); 
                if(item.id == 1000000) {
                    that.menuShow = false; 
                    this.$router.push({ path : "/" }) 
                }
                 
                else{ 
                    that.menuShow = false; 
                    that.$router.push({
                        path : `/HodgepodgeList/${item.typeName.replace(/\s+/g,'-')}/${item.id}`, 
                    })
                    
                }
                
                // else { 
                //     that.menuShow = false
                //     record(title); 
                //     that.$router.push(
                //         {
                //             path : "/recipes",
                //             query : {RecipeType:title, cid:cid,recipesDetails:'false'}
                //         }
                //     )
                // }
            }

            get myHeaderValue ()  {
                let that : any = this
                that.headerValue = that.$store.state.selectHeader
                return that.headerValue
            }
            get setMyActive () { 
                let that : any = this
                return that.$store.state.selectTabValue
            }
    }
</script>

 

<style lang="scss" scoped>
 @import "./css/navigation.scss";
</style>
 