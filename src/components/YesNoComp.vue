<template>
  <div>
    <h2>Do you like TEST APP?<br><small>External API call</small></h2>

    <b-button @click.prevent="callYesNo" variant="info">CHECK IT HERE</b-button>

    <div v-show="loading" class="res">Waiting...</div>

    <div v-if="hasData" class="answer">
      <h1>{{answer}}</h1>
      <img :src="answerImg" alt="img">
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import axios, { AxiosResponse } from 'axios';

  import { yesNoResp } from '../types';

  @Component({
    name: "YesNo"
  })

  export default class YesNo extends Vue {
    loading: boolean = false;
    hasData: boolean = false;
    answer: string = "";
    answerImg: string = "";

    async callYesNo () {
      const { data }: { data?: yesNoResp } = await axios.get('https://yesno.wtf/api') || {}; // dlaczego TS wywala ze zle gdy jest po promise || {} // https://mariusschulz.com/blog/typing-destructured-object-parameters-in-typescript
      
      if(data?.answer && data?.image) {
        this.hasData = true;
        this.answer = data?.answer;
        this.answerImg = data?.image;
      } else {
        this.answer = "Uops! External open API is not working!";
      }
    }

  }
</script>