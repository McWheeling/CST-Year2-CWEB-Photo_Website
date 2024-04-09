<template>
  <div>
    <div>
      <h1>Login</h1>
    </div>
    <div>
      <!-- EMAIL -->
      <b-form-group :state="hasErr.em" class="mb-1">
        <b-input-group>

          <b-form-input :placeholder="dt.em" :state="hasErr.em" :disabled="isDisabled"
                        v-model="tempUser.email" trim @keydown="violation.email=null" />
        </b-input-group>
      </b-form-group>

      <!-- password -->
      <b-form-group :invalid-feedback="violation.password" :state="hasErr.pw" class="mb-1">
        <b-input-group>
          <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.pw">
            <b-icon-key-fill :title="dt.pw" />
          </b-input-group-prepend>
          <b-form-input :placeholder="dt.pw" :state="hasErr.pw" :disabled="isDisabled"
                        v-model="tempUser.password" trim @keydown="violation.password=null" />
        </b-input-group>
      </b-form-group>

      <!-- *--- Button to Login ---* -->
      <b-button-group class="w-100 mb-3">
        <IconButton variant="primary" :disabled="isDisabled" @click="userLogin"
                    icon="cloud-arrow-up-fill"> Submit</IconButton>
      </b-button-group>

      <!-- Modal For Confirmation -->
      <b-modal title="Confirm Login" ok-variant="danger" cancel-variant="primary"
               v-model="showConfirmUser" @ok="saveUser">
        <template #modal-cancel>
          <b-icon-x-square-fill /> Cancel
        </template>

        <!-- user Confirmation -->
        <template #modal-ok>
          <b-icon-check-lg/> Confirm
        </template>
        Are you sure you want to Confirm {{tempUser.firstName}}?
      </b-modal>

      <!-- *--- Error Message ---* -->
      <b-alert variant="danger" :show="violation.violationMessage">
        {{violation.violationMessage}}
      </b-alert>
    </div>

  </div>
</template>

<script lang="ts">
import {
  Component, Mixins, Prop, Watch,
} from 'vue-property-decorator';
import { BIcon } from 'bootstrap-vue';
import GlobalMixins from '../mixins/global-mixins';
import User from '../models/User';
import IconButton from './IconButton.vue';
import Appointment from '../models/Appointment';

@Component({
  components: { IconButton },
})

export default class UserLogin extends Mixins(GlobalMixins) {
  @Prop({ type: Object, validator: (s) => s instanceof Object })readonly user :any

  tempUser:User = new User();

  violation: any = {}

  $refs!: {
    iconDelete: BIcon
    iconSave: BIcon
  }

  dt = { // Display Text - object that store
    fn: 'First Name',
    ln: 'Last Name',
    pn: 'Phone Number',
    ad: 'Address',
    ur: 'Role',
    em: 'Email Address', // i dont know if i need a password option
    pw: 'Password',
  }

  get hasErr(): any {
    return {
      fn: this.violation.firstName ? false : null,
      ln: this.violation.lastName ? false : null,
      pn: this.violation.phoneNumber ? false : null,
      ad: this.violation.address ? false : null,
      ur: this.violation.role ? false : null,
      em: this.violation.email ? false : null,
      pw: this.violation.password ? false : null,
    };
  }

  showConfirmUser = false;

  get isNew():boolean { return !this.user || !this.user.id; }

  // eslint-disable-next-line class-methods-use-this
  animate(icon:BIcon, start:boolean) {
    if (start) {
      // apply animation style to the icon
      icon.classList.add('b-icon-animation-cylon-vertical');
    } else {
      // remove animation style from the icon
      icon.classList.remove('b-icon-animation-cylon-vertical');
    }
  }

  async saveUser() {
    const icon = this.$refs.iconSave;
    this.violation = await this.getErrorMessages(this.tempUser);
    if (Object.keys(this.violation).length === 0) {
      this.setBusy(true);
      this.animate(icon, true);
      const url = this.USER_API + (this.isNew ? '' : `/${this.user.id}`);
      const method = this.isNew ? 'post' : 'put';

      try {
        const data = await this.callAPI(url, method, this.user);
        this.$emit(this.tempUser.id === data.id ? 'updated' : 'added', Object.assign(new User(), data));
      } catch (err:any) {
        this.violation = this.mapValidationErrorArray(err.data);
      } finally {
        this.setBusy(false);
        this.animate(icon, false);
      }
    }
  }

  userLogin() {
    this.cancel();
    this.showConfirmUser = true;
  }

  cancel() {
    this.violation = {}; // hide error messages if any
    this.tempUser = Object.assign(new User(), this.user);
    this.$emit('cancelled', this.user);
  }

  login() {
    if (this.tempUser.email !== '' && this.tempUser.email !== '') {
      // if this user email is in database,
      // and the password matches the email in the users database
      // emit authenticated true
      // this is to be done in the backend, with a post
      // query the database with a 'find one by'
    }
  }
}
</script>
