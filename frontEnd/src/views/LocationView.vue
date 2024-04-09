<!--
Location View
This component acts as the PARENT component for Location related code.
-->

<template>
  <div>
    <h1>YXE Location Suggestions</h1>
    <!--
    This b-row contains the Google Maps Component and a Textarea box which is
    disabled and shows the location description for each marker in the map
    -->
    <b-row align-h="around">
      <!-- Google Maps Component -->
      <GoogleMap class="w-100"/>
    </b-row>

    <!-- Location Images Carousel -->
    <b-row style="width: 100%" align-h="around" class="pt-5">
      <b-carousel
        id="carousel-1"
        :interval="4000"
        controls
        indicators>
        <b-carousel-slide
          v-for="port in locationImages"
          :key="port.id"
          :img-src="port.fileName">
        </b-carousel-slide>
      </b-carousel>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import Location from '../models/Location';
import GoogleMap from '../components/GoogleMap.vue';
import GlobalMixin from '../mixins/global-mixins';

@Component({
  components: {
    GoogleMap,
  },
})
export default class LocationView extends Mixins(GlobalMixin) {
  locationImages: Location[] = []

  async mounted() {
    try {
      this.locationImages = await this.callAPI(this.LOCATION_API);
    } catch {
      alert('Sorry no Location Images');
    }
  }
}
</script>
