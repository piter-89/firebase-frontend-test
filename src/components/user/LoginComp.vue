<template>
  <div class="login">
    <h3>Login</h3>

    <b-form inline  @submit.prevent="login">

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

      <b-button variant="primary" type="submit">Login</b-button>

    </b-form>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    name: "Login"
  })

  export default class Login extends Vue {
    email: string = "";
    pass: string = "";
    
    login () {
      this.$store.dispatch("login", {
        email: this.email,
        pass: this.pass
      });
    }

  }

</script>