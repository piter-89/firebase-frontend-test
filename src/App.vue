<template>
  <div>
    <div>
      <logo />
      <div class="wrapper">

        <account-info v-if="userVerified" />
        <create-account v-if="!userVerified" />
        <login v-if="!userVerified" />

        <hr>

        <add-new @product-saved="getProducts" />
        <get-prods :reload="reloadProducts"/>
        <yes-no />

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

import Logo from './components/LogoComp.vue';
import AddNew from './components/AddNewComp.vue';
import GetProds from './components/GetProdsComp.vue'
import YesNo from './components/YesNoComp.vue';
import CreateAccount from './components/user/CreateAccountComp.vue';
import Login from './components/user/LoginComp.vue';
import AccountInfo from './components/user/AccountInfoComp.vue';

import { yesNoResp, Product }  from './types'
import firebase from './firebase'

@Component({
  components: {
    AccountInfo,
    AddNew,
    GetProds,
    CreateAccount,
    Login,
    Logo,    
    YesNo
  }
})

export default class App extends Vue {
  reloadProducts: number = 0;

  mounted () {
    this.$store.dispatch('listenUserInfo');
  }

  getProducts () {
    this.reloadProducts++; // this will change prop in GetProdsComp and trigger reload of the products
  }

  get userVerified (): boolean {
    return this.$store.getters["get_userVerified"];
  }

}

</script>

