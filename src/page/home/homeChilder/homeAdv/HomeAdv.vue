<template>
    <div class="newGoogleList" style="margin-top:3.2rem;" v-html="homeAdv"> </div> 
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator"
    @Component({

    })
    export default class HomeAdv extends Vue {
        @Prop({
            type : String,
            default : ''
        })
        homeAdv : any
        
    }
</script>