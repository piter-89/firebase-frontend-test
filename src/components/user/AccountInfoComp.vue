<template>
  <div>
    <div v-if="userVerified" class="pull-right">
      <h4>Firebase user data: <small>{{userLogin}} - verified</small></h4>
      <b-btn @click.prevent="logout" variant="warning">Logout</b-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AccountInfo extends Vue {
  logout () {
    this.$store.dispatch("logout");
  }

  get userLogin (): string {
    return this.$store.getters["get_userLogin"];
  }

  get userVerified (): string {
    return this.$store.getters["get_userVerified"];
  }
}

</script>