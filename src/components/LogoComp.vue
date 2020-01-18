<template>
  <div>
    <div class="logo" @click="changeTitle"><img src="../assets/logo.png" alt="logo"><div class="title-logo">{{title}}</div></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: "Logo"
})

export default class Logo extends Vue {
  title: string = "Welcome in FIREBASE TEST APP";

  changeTitle () {
    this.title = "FIREBASE TEST APP!"
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    background-color: #7e7e7e;
    text-align: center;
    padding: 10px;
  }
  .logo img {
    max-height: 80px;
  }
  .title-logo {
    color: #fff;
    font-size: 16px;
  }
</style>
