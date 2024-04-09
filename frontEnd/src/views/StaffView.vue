<template>
  <div>
    <div>
      <h1>Selected User</h1>
    </div>
    <div>
      <b-calendar
        id="ex-disabled-readonly"
        :disabled="disabled"
        :readonly="readonly"
      ></b-calendar>
    </div>
    <div>
      <!--      //display user  information-->
      <b-overlay opacity=".25" class="col-md-6 col-lg-8 order-md-0" :show="isDisabled">
        <b-table striped hover responsive primary-key="id" @row-selected="selectedAppt=$event"
                 :fields="fields" :api-url="APPOINTMENT_API" :items="provider"
                 selectable select-mode="single" selected-variant="primary"
                 no-provider-sorting no-provider-filtering no-provider-paging >
          <template #table-busy>
            <div class="text-center text danger m-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong class="ml-2">Loading...</strong>
            </div>
          </template>
        </b-table>
      </b-overlay>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component, Emit, Mixins, Prop, Watch,
} from 'vue-property-decorator';
import { BTable, BvTableCtxObject } from 'bootstrap-vue';
import GlobalMixin from '../mixins/global-mixins';
import Appointment from '../models/Appointment';

export default class StaffView extends Mixins(GlobalMixin) {
  provider(ctx:BvTableCtxObject):Promise<any> {
    // return fetch('' + ctx.apiUrl).then(res => res.json())
    return this.callAPI(`${ctx.apiUrl}`);
  }

  selectedAppt: Appointment = new Appointment();

  $refs!:{
    apptTable:BTable
  }

  get appts() { return this.$refs.apptTable.localItems; }

  fields =[
    { key: 'id', sortable: true },
    { key: 'firstName', sortable: true },
    { key: 'lastName', sortable: true },
    { key: 'date', sortable: true },
  ]
}
</script>

<style scoped>

</style>
