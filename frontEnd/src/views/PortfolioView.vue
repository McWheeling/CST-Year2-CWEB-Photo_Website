<template>
  <div>
    <h1 class="display-1">Portfolio</h1>
    <p>Below are some of the pictures that our photographers have taken of the beautiful city of Saskatoon</p>

    <!-- IMAGE CAROUSEL -->
    <b-carousel
      id="carousel-1"
      :interval="4000"
      controls
      indicators>
      <b-carousel-slide
        v-for="port in portfolios"
        :key="port.id"
        :caption="port.photographerName"
        :text="port.description"
        :img-src="port.fileName">
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script lang="ts">
import {
  Component, Emit, Mixins, Prop, Watch,
} from 'vue-property-decorator';

import Portfolio from '../models/Portfolio';
import GlobalMixin from '../mixins/global-mixins';

@Component
export default class PortfolioView extends Mixins(GlobalMixin) {
  // initialize the portfolios array
  portfolios: Portfolio[] = []

  violation: any = {}

  // This will load the data from the database and store it into the portfolios array
  async mounted() {
    try {
      this.portfolios = await this.callAPI(this.PORTFOLIO_API);
    } catch {
      // eslint-disable-next-line no-alert
      window.alert('Sorry no Images');
    }
  }
}
</script>

<style scoped>

</style>
