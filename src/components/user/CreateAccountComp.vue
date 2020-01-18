<template>
  <div class="login">
    <h3>Create new account</h3>

    <b-form inline  @submit.prevent="createAccount">
      
      <b-input
        v-model="email"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Jane Doe"
      ></b-input>

      <b-input
        v-model="pass"
        placeholder="Password"
        type="password"
        class="mb-2 mr-sm-2 mb-sm-0"
      ></b-input>

      <b-button variant="primary" type="submit">Create account</b-button>

    </b-form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    name: "CreateAccount"
  })

  export default class Login extends Vue {
    email: string = "";
    pass: string = "";
    
    createAccount () {
      this.$store.dispatch("createAccount", {
        email: this.email,
        pass: this.pass
      });
    }

  }

</script>