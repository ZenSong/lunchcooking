<template>
  <div class="privacy-policy">
        <navber></navber>
        <div class="content">
            PRIVACY POLICY 
            <div>
                This Privacy Policy describes how your personal information is collected and  used, when you visit or make a purchase from tastycooking.info (the “Site”). 
            </div>
            
            <div>PERSONAL INFORMATION WE COLLECT</div>  
            <div> 
                - Automatic Data Collection. When you visit the site, we automatically collect certain information about your device, through 
            our Services or other methods of web analysis, including information such as your Internet protocol (IP) address, cookie identifiers, 
            mobile advertising identifiers, and other device identifiers that are automatically assigned to your computer or device Additionally, as you browse the Site, 
            we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, 
            and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.” 
            </div>
            <div> We collect Device Information using the following technologies: </div>
            <div>   - “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit tastycooking.info </div> 
            <div>    - “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps. 
            - “Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.</div>
            <div> We collect the following types of personal information: </div>

            <div> Posting on the Site. We collect information you post through the Site. For example, when you posting a review ，the Site will collect the information you provide in such submissions, including any Personal Information.</div>
            <div> HOW DO WE USE YOUR PERSONAL INFORMATION? </div>
            <div> We use the collected information  to communicate with you via email. When in line with the preferences you have shared with us, we will provide you with information or advertising relating to our products or services.</div>
            <div> In addition, we will not disclose your personal information to the outside.</div>
            <div> This interpretation is reserved by our company. </div>
            <div> CONTACT US </div>
            <div> For more information about our privacy practices, if you have questions, please contact us by e-mail at  susiedjy@gmail.com</div>
        </div> 
  </div>
</template>

<script lang="ts">
import navber from "../../components/navigation/navigation.vue"
import { Component, Vue } from 'vue-property-decorator'; 

@Component({ 
    components : {
        navber,
    }, 
})
export default class privacyPolicy extends Vue {

}
</script>

<style lang="scss">
    .privacy-policy{
        width: 100%;
        padding: 0.8rem; 
        margin-top: 3rem;
        margin-bottom: 0.5rem; 
        >.content{
            width: 100%;
            padding-top: 0.5rem;
            text-indent: 30px;
            line-height: 1.5;
            word-break: break-all;
            // font-family: Roboto, serif;
            // font-size: 1.2rem;
            // font-weight: 600;
            >div{
                margin: 0.5rem 0;
            }
        }
    }
</style>
