<template>
  <div id="app">
    <router-view></router-view>
    <myFooter></myFooter>
    <div class="my-positioning" @click="myPositioning()" v-if="move">
      <img src="./assets/img/dingwei.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts"> 
import { Component, Vue } from "vue-property-decorator";
import myFooter from "@/page/myFooter/myFooter.vue";

@Component({
  components: {  
      myFooter
  } 
})
export default class App extends Vue {
  move: boolean =  false
  mounted() {
    // 使用addEventListener解决 多个window.scroll共存问题
    let that: any = this;
    window.addEventListener("scroll", (e) => {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 800) {
        that.move = true;
      } else {
        that.move = false;
      }
    });
  }
  myPositioning() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}
 
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
body {
  background-color: #f5f5f5;
  // background-color: #fff8f1;
}

.my-positioning {
  width: 32px;
  height: 32px;
  position: fixed;
  bottom: 4rem;
  right: 20px;
  z-index: 2222;
}

.my-positioning > img {
  width: 100%;
  height: 100%;
  opacity: 0.7;
}
</style>
