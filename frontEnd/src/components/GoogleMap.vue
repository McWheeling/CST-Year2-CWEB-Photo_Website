<template>
  <div>
    <br>
    <!-- gmap-map AND gmap-marker are used for
     https://www.npmjs.com/package/vue2-google-maps?activeTab=readme

     Version 0.10.7 -> https://www.npmjs.com/package/vue2-google-maps/v/0.10.7
    Also need to use :center and :zoom as options for the gmap-map tag
    -->
    <b-row align-h="around">
      <b-col cols="7" id="GoogleMap">
        <gmap-map :center="center" :zoom="12" style="width:600px;  height: 410px;">
          <gmap-marker
            :key="index"
            v-for="(marker, index) in markers"
            :position="marker"
            @click="getMarkerInfo(marker)">
          </gmap-marker>
        </gmap-map>
      </b-col>

      <b-col cols="5" align-h="around" class="pt-4">
        <!-- Location Name Textarea that is disabled so that users can only view the data -->
        <h3>Location's Name</h3>
        <b-form-textarea disabled
                         id="textarea-default"
                         placeholder="Location Name"
                         rows="2" no-resize v-model="label">
        </b-form-textarea>

        <!-- Location Description Textarea that is disabled so that users can only view the data -->
        <h3 class="pt-4">Location's Description</h3>
        <b-form-textarea disabled
                         id="textarea-default"
                         placeholder="Location Description"
                         rows="8" no-resize v-model="description">
        </b-form-textarea>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import GlobalMixin from '../mixins/global-mixins';

@Component
export default class GoogleMap extends Mixins(GlobalMixin) {
  // Hard coded coord which center's to downtown Saskatoon
  center: object = {
    lat: 52.12968554232961, lng: -106.66526527532747, description: 'Downtown', label: 'Core',
  }

  // Markers Array that gets populated with location markers that display on the map
  markers: object[] = [];

  // Current Place Boolean
  currentPlace = null

  mounted() {
    this.geoLocate();
  }

  /**
   * Setting the current place
   * @param place
   */
  setPlace(place) {
    this.currentPlace = place;
  }

  // Description String to be placed in the textarea box  of which ever location was clicked
  description = '';

  // Label String to be placed in the textarea box of which ever location was clicked
  label = '';

  /**
   * This method gets all information for a marker when you click on it.
   * @param marker
   */
  getMarkerInfo(marker) {
    this.center = marker;
    // this.description = this.center;
    this.description = `${marker.description}`;
    this.label = `${marker.label}`;
    console.log(this.center);
    // Then load the data into the Description Textarea, it is in the object being sent from the GET
  }

  /**
   * This function centers on which ever marker is clicked in the start
   * then trys to do a GET request using Global-Mixins and then if successful pushes
   * the lat/ lng coords from the database into the markers array which is looped on above
   * in the gmap-marker tag
   */
  async geoLocate() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });

    /**
     * Call API to load markers
     * In here I need to push into the markers array everything from the data array object that is coming from the GET
     */
    try {
      // array of data coming back
      const data = await this.callAPI(this.LOCATION_API, 'get'); // GET request to database
      // console.log(data); // For testing
      // For Each Loop that pushes the location lat/ lng from the database into the markers array to be displayed
      data.forEach((dataMarker: object) => {
        //  this.markers = data.map((locationData: any): Location => Object.assign(new Location(), locationData));
        this.markers.push(dataMarker);
      });
    } catch {
      // Let user know there are no locations
      alert('There are no locations');
    }
  }
} // End of export
</script>
