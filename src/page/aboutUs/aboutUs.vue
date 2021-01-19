<template>
  <div class="about-us">  
        <navber></navber>
        <div class="content">
            <div>
                A decade ago, we set out to bring cooks together from all over to exchange recipes and to support each other in the kitchen. We wanted to create a buzzing place for others who do what we do all day long: talk about food! Since we started Tastycooking.info , tens of millions of cooks and eaters have found their way to the site.
            
            </div> 

           <div> On Tastycooking.info you can find thousands of recipes submitted by our community and cooked by our editors in our very own test kitchens. </div>

            <div> In 2019  we curate the great things that allow you to cook and eat thoughtfully, and we’ve grown to include the home goods and crafts that support joyful living—and we’ve even started making some of these products with you! Great food isn't just about ingredients, it's about everything that makes a meal—it's the platter you serve tacos on; the composter in your kitchen; the knife you take on picnics. And joyful living goes beyond just the kitchen; it’s the beeswax candles on your table, the wreath on your doorway, the linen throw that accents your couch.</div>

            <div>We envision 'tastycooking.info' as the one place you can see thousands of test kitchen-approved recipes, shop the kitchenware you need to make them, and discuss the results with like-minded people. That same destination can be the go to when you need a birthday gift for a food-obsessed friend. The place to look for great table linens. The place to window-shop and daydream. We depend on—and we look forward to—your ideas, feedback, and support. So get ready for some inspiration and come hang out!</div>

            <div>We look forward to cooking with you!</div>
        </div>
       
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';  
import navber from "../../components/navigation/navigation.vue"
@Component({
        components : {
            navber,  
        } 
    })
export default class aboutUs extends Vue {
      
}
</script>

<style lang="scss" scoped>
    .about-us{
        width: 100%;  
        margin-top: 3rem;
        display: inline-block;  
        .content{
            line-height: 1.5;
            padding: 0.8rem; 
            font-size: 1.2rem;
            text-indent: 30px; 
            // word-wrap: break-word;
            word-break: break-all;
        }
        
    }
</style>