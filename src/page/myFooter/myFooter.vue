<template>
  <div class="my-footer">  
        <div class="policy">
            <dt>
                 <div @click="policy">
                     Privacy Policy
                 </div>
                 <div>|</div>
                 <div @click="aboutUs">
                    About Us
                </div>
            </dt> 
            <dt>
                Contact Us :  <span>kkwthink@gmail.com</span>
            </dt>   
            <dt>
                Copyright © 2021 All Rights Reserved
            </dt>
        </div>   
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';  
 
@Component({
        
})
export default class myFooter extends Vue {
        // aboutUs
        aboutUs() {
            let that : any = this;
                that.$router.push({
                path : "/aboutUs"
            })
        }
        // policy
        policy() {
            let that : any = this;
                that.$router.push({
                path : "/privacyPolicy"
            })
        }
}
</script> 
<style lang="scss" scoped>
    .my-footer {
        width: 100%;
        .policy{
        background: #ECECEC;
        width: 100%;
        padding: 0.5rem 8px;
        >dt{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%; 
            font-size: 0.5rem;
            padding: 0.2rem 0;
            font-weight: 600;
            line-height: 1.5;
            color: rgb(0, 0, 0);
            text-align: center;
            >div{
                padding: 0 5px;
            }
            span {
                display: flex;
                align-items: center;
                padding-left: 10px;
                color: #8f8f8f;
                font-size: 0.4rem;
                letter-spacing: 2px; 
            }
        }
        // >div{
        //     padding: 0.5rem 0;
        //     letter-spacing: 2px; 
        //     line-height: 1;
        //     color: rgb(120, 120, 241);
        // }
    }
    } 
</style>

 