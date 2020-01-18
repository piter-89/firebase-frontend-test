<template>
  <div>

    <h1 class="title">
      External API test
    </h1>

    <div class="products">
      <h2>Add new car</h2>

      <b-form inline  @submit.prevent="saveNewProduct">
      
        <b-input
          v-model="productName"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Name"
        ></b-input>

        <b-input
          v-model="productDesc"
          placeholder="Description"
          class="mb-2 mr-sm-2 mb-sm-0"
        ></b-input>

        <b-button variant="danger" type="submit">Save product</b-button>

      </b-form>

      <div v-show="loading" class="res">Waiting...</div>

    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({
  name: "Logo"
})

export default class AddNew extends Vue {
  productName: string = "";
  productDesc: string = "";
  loading: boolean = false;

  async saveNewProduct () {
    const url = `${this.API_URL}/products?idToken=${this.$store.getters["get_userIdToken"]}`;

    this.loading = true;

    try {
      await axios.post(url, {
        name: this.productName,
        desc: this.productDesc
      });

      this.loading = false;
      this.$emit("product-saved");
    } catch (err) {
      alert("NOT AUTHORIZED");
    }
  }

  get API_URL () : string {
    return this.$store.getters["get_API_URL"];
  }

}

</script>