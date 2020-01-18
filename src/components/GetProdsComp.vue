<template>
  <div>

    <div class="products">

      <h2>Cars</h2>

      <b-form inline  @submit.prevent="getProducts">
      
        <b-input
          v-model="productId"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Product ID"
        ></b-input>

        <b-button variant="success" type="submit">Download cars</b-button>

      </b-form>

      <div v-show="loading" class="res">Waiting...</div>

      <div v-show="products.length" class="list">
        <strong>Cars list:</strong>
        <div v-for="product in products" :key="product.id">
          {{product.id}}: {{product.name}} |  {{product.desc}}
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';

import { Product } from '../types';

@Component({
  name: "GetProds",
  props: {
    reload: Number
  }
})

export default class GetProd extends Vue {
  productId: string = "";
  products: Product[] = [];
  loading: boolean = false;

  @Watch('reload')
  reloadProducts () {
    this.getProducts();
  }

  getProducts () {
    const id: number = parseInt(this.productId);
    const token: string = this.$store.getters["get_userIdToken"];
    
    if(id || id === 0) {
      this.getSinlgeProduct(id, token);
    } else {
      this.getMultiProduct(token);
    }
  }

  async getMultiProduct (token: string) {
    const url: string = `${this.API_URL}/products?idToken=${token}`;
    this.loading = true;

    try {
      const { data }: { data: Product[] } = await axios.get(url) || [];
      this.products = data.length ? [...data] : [];
      this.loading = false;
    } catch (err) {
      this.loading = false;
      alert("NOT AUTHORIZED");
    }
  }

  async getSinlgeProduct (id: number, token: string) {
    const url: string = `${this.API_URL}/products/${id}?idToken=${token}`;
    this.loading = true;
    
    try {
      const { data }: { data: Product } = await axios.get(url) || {};
      
      this.products = data ? [data] : [];
      this.loading = false;
    } catch (err) {
      this.loading = false;
      alert("NOT AUTHORIZED");
    }
  }

  get API_URL (): string {
    return this.$store.getters["get_API_URL"];
  }
}

</script>

<style scoped>
  .list {
    text-align: left;
    max-width: 500px;
    margin: 20px auto;
    font-size: 18px;
  }
</style>