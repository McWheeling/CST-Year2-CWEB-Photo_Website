<template>
  <div>
    <b-row align-h="around">
      <!-- *--- Form ---* -->
      <b-col cols="6" id="BookAppointmentFirstHalf">
        <!-- First Name Field -->
        <h5 class="pt-2">First Name</h5>
        <b-form-group :invalid-feedback="violation.firstName" :state="hasErr.fN" class="mb-1">
          <b-input-group>
            <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.fN">
              <b-icon-person-fill :title="dt.fN" />
            </b-input-group-prepend>
            <b-form-input :placeholder="dt.fN" :state="hasErr.fN" :disabled="isDisabled"
                          v-model="tempAppointment.firstName" trim @keydown="violation.firstName=null" />
          </b-input-group>
        </b-form-group>

        <!-- Last Name Field -->
        <h5 class="pt-2">Last Name</h5>
        <b-form-group :invalid-feedback="violation.lastName" :state="hasErr.lN" class="mb-1">
          <b-input-group>
            <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.lN">
              <b-icon-people-fill :title="dt.lN" />
            </b-input-group-prepend>
            <b-form-input :placeholder="dt.lN" :state="hasErr.lN" :disabled="isDisabled"
                          v-model="tempAppointment.lastName" trim @keydown="violation.lastName=null" />
          </b-input-group>
        </b-form-group>

        <!-- Email Field -->
        <h5 class="pt-2">Email</h5>
        <b-form-group :invalid-feedback="violation.email" :state="hasErr.em" class="mb-1">
          <b-input-group>
            <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.em">
              <b-icon-envelope-fill :title="dt.em" />
            </b-input-group-prepend>
            <b-form-input :placeholder="dt.em" :state="hasErr.em" :disabled="isDisabled"
                          v-model="tempAppointment.email" trim @keydown="violation.email=null" />
          </b-input-group>
        </b-form-group>

        <!-- Phone Field -->
        <h5 class="pt-2">Phone</h5>
        <b-form-group :invalid-feedback="violation.phone" :state="hasErr.pn" class="mb-1">
          <b-input-group>
            <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.pn">
              <b-icon-telephone-fill :title="dt.pn" />
            </b-input-group-prepend>
            <b-form-input :placeholder="dt.pn" :state="hasErr.pn" :disabled="isDisabled"
                          v-model="tempAppointment.phone" trim @keydown="violation.phone=null" />
          </b-input-group>
        </b-form-group>

        <!-- Address Field -->
        <h5 class="pt-2">Address</h5>
        <b-form-group :invalid-feedback="violation.address" :state="hasErr.sA" class="mb-1">
          <b-input-group>
            <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.sA">
              <b-icon-house-fill :title="dt.sA" />
            </b-input-group-prepend>
            <b-form-input :placeholder="dt.sA" :state="hasErr.sA" :disabled="isDisabled"
                          v-model="tempAppointment.address" trim @keydown="violation.address=null" />
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col cols="6" align-h="around">
        <!-- Make this a 2nd col/ row for Time, Date, Description, and What are you looking for-->
        <!-- Time Field -->
        <h5 class="pt-2">Time</h5>
        <b-form-group :invalid-feedback="violation.time" :state="hasErr.tm" class="mb-1">
          <b-input-group>
            <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.tm">
              <b-icon-clock-fill :title="dt.tm" />
            </b-input-group-prepend>
            <b-form-timepicker locale="en" :placeholder="dt.tm" :state="hasErr.tm" :disabled="isDisabled"
                               v-model="tempAppointment.time" trim @keydown="violation.time=null" />
          </b-input-group>
        </b-form-group>

        <!-- Date Field https://bootstrap-vue.org/docs/components/form-datepicker -->
        <!-- <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"></b-form-datepicker> -->
        <h5 class="pt-2">Date</h5>
        <b-form-group :invalid-feedback="violation.time" :state="hasErr.tm" class="mb-1">
          <b-input-group>
            <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.tm">
              <b-icon-calendar-fill :title="dt.tm" />
            </b-input-group-prepend>
            <b-form-datepicker :placeholder="dt.da" :state="hasErr.da" :disabled="isDisabled"
                               v-model="tempAppointment.date" trim @keydown="violation.date=null"></b-form-datepicker>
          </b-input-group>
        </b-form-group>

        <!-- Location Address Field -->
        <h5 class="pt-2">Location Address (If Applicable)</h5>
        <b-form-group :invalid-feedback="violation.locationAddress" :state="hasErr.lo" class="mb-1">
          <b-input-group>
            <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.lo">
              <b-icon-pin-map-fill :title="dt.lo" />
            </b-input-group-prepend>
            <b-form-input :placeholder="dt.lo" :state="hasErr.lo" :disabled="isDisabled"
                          v-model="tempAppointment.locationAddress" trim @keydown="violation.locationAddress=null" />
          </b-input-group>
        </b-form-group>

        <!-- Description Field -->
        <h5 class="pt-2">Description of Work</h5>
        <b-form-group :invalid-feedback="violation.description" :state="hasErr.de" class="mb-1">
          <b-input-group>
            <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.de">
              <b-icon-pencil-square :title="dt.de" />
            </b-input-group-prepend>
            <b-textarea :placeholder="dt.de" :state="hasErr.de" :disabled="isDisabled" rows="4" no-resize
                        v-model="tempAppointment.description" trim @keydown="violation.description=null" />
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col cols="6" align-h="around">
        <!-- *--- Button to Save ---* -->
        <b-button-group class="w-100 mb-3">
          <IconButton variant="primary" :disabled="isDisabled" @click="appointmentConfirm"
                      icon="cloud-arrow-up-fill"> Submit</IconButton>
        </b-button-group>
      </b-col>
    </b-row>

    <!-- Modal For Confirmation -->
    <b-modal title="Confirm Appointment" ok-variant="danger" cancel-variant="primary"
             v-model="showConfirmAppointment" @ok="saveAppointment">
      <template #modal-cancel>
        <b-icon-x-square-fill /> Cancel
      </template>

      <!-- Appointment Confirmation -->
      <template #modal-ok>
        <b-icon-check-lg/> Confirm
      </template>
      Are you sure you want to Confirm {{tempAppointment.firstName}}?
    </b-modal>

    <!-- *--- Error Message ---* -->
    <b-alert variant="danger" :show="violation.violationMessage">
      {{violation.violationMessage}}
    </b-alert>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import GlobalMixin from '../mixins/global-mixins';
import Appointment from '../models/Appointment';
import IconButton from './IconButton.vue';

@Component({
  components: { IconButton },
})
export default class BookAppointmentForm extends Mixins(GlobalMixin) {
  @Prop({ type: Object, validator: (b) => b instanceof Object }) readonly appointment: any

  /**
   * Cannot get it to post to the backEnd.
   * I originally had different code that wasn't working so tried class code which also didn't work
   * There are copy/ paste artifacts but ran out of time to debug this Component
   */

  tempAppointment: Appointment = new Appointment()

  violation: any = {}

  // Display Text
  dt = {
    fN: 'First Name',
    lN: 'Last Name',
    em: 'Email',
    pn: 'Phone',
    sA: 'Address',
    tm: 'Time',
    da: 'Date',
    lo: 'Location Address (If Applicable)',
    de: 'Description of event/ photo types.',
  }

  // Confirm Boolean that when "confirmed" by the popup in the form becomes true in the backend
  showConfirmAppointment = false

  get hasErr(): any {
    return {
      fN: this.violation.firstName ? false : null,
      lN: this.violation.lastName ? false : null,
      em: this.violation.email ? false : null,
      pn: this.violation.phone ? false : null,
      sA: this.violation.address ? false : null,
      tm: this.violation.time ? false : null,
      da: this.violation.date ? false : null,
      lo: this.violation.locationAddress ? false : null,
      de: this.violation.description ? false : null,
    };
  }

  get isNew(): boolean {
    return !this.appointment || !this.appointment.id;
  }

  /**
   * Save Appointment Method
   */
  async saveAppointment() {
    this.violation = await this.getErrorMessages(this.tempAppointment);

    if (Object.keys(this.violation).length === 0) {
      // this.setBusy(true);

      const url = this.APPOINTMENTBOOK_API + (this.isNew ? '' : `/${this.tempAppointment.id}`);
      console.log(this.tempAppointment);
      const method = this.isNew ? 'post' : 'put';
      // const method = 'post';

      try {
        const data = await this.callAPI(url, method, this.tempAppointment);
        this.$emit(
          this.tempAppointment.id === data.id ? 'updated' : 'added',
        );
        // Set the Confirmed Appointment Boolean to be TRUE
        this.tempAppointment.confirmed = true;
      } catch (err: any) {
        this.violation = this.mapValidationErrorArray(err.data);
      } finally {
        this.setBusy(false);
      }
    }
  }

  /**
   * Confirmation popup - which also calls the cancel method
   */
  appointmentConfirm() {
    this.cancel();
    this.showConfirmAppointment = true;
  }

  /**
   * Cancel Method
   */
  cancel() {
    this.violation = {}; // hide error messages if any
    this.tempAppointment = Object.assign(new Appointment(), this.appointment);
    this.$emit('cancelled', this.appointment);
  }
}
</script>
