<template>
  <div>
    <h1>Book an Appointment!</h1>
    <b-row align-h="around">
      <b-col>
        <BookAppointmentForm></BookAppointmentForm>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import GlobalMixin from '../mixins/global-mixins';
import BookAppointmentForm from '../components/BookAppointmentForm.vue';

@Component({
  components: { BookAppointmentForm },
})
export default class BookAppointmentView extends Mixins(GlobalMixin) {
  // Fill if needed
}
</script>
