<template>
  <div>
    <div>
      <h1>User</h1>
    </div>
    <div>
      <!--      FIRST NAME-->
      <b-form-group :invalid-feedback="violation.firstName" :state="hasErr.fn">
        <b-input-group>
          <b-form-input :placeholder="dt.fn" :state="hasErr.fn" :disabled="isDisabled"
                        v-model="tempUser.firstName" trim @keydown="violation.firstName=null" />
        </b-input-group>
      </b-form-group>
      <!--      LAST NAME-->
      <b-form-group :invalid-feedback="violation.lastName" :state="hasErr.ln">
        <b-input-group>
          <b-form-input :placeholder="dt.ln" :state="hasErr.ln" :disabled="isDisabled"
                        v-model="tempUser.lastName" trim @keydown="violation.lastName=null" />
        </b-input-group>
      </b-form-group>
      <!-- PHONE-->
      <b-form-group :invalid-feedback="violation.phoneNumber" :state="hasErr.pn" class="mb-1">
        <b-input-group>
          <b-form-input :placeholder="dt.pn" :state="hasErr.pn" :disabled="isDisabled"
                        v-model="tempUser.phoneNumber" trim @keydown="violation.phoneNumber=null" />
        </b-input-group>
      </b-form-group>
      <!-- ADDRESS -->
      <b-form-group :invalid-feedback="violation.address" :state="hasErr.ad" class="mb-1">
        <b-input-group>
          <b-form-input :placeholder="dt.ad" :state="hasErr.sA" :disabled="isDisabled"
                        v-model="tempUser.address" trim @keydown="violation.address=null" />
        </b-input-group>
      </b-form-group>
      <!-- EMAIL -->
      <b-form-group :invalid-feedback="violation.email" :state="hasErr.em" class="mb-1">
        <b-input-group>
          <b-form-input :placeholder="dt.em" :state="hasErr.em" :disabled="isDisabled"
                        v-model="tempUser.email" trim @keydown="violation.email=null" />
        </b-input-group>
      </b-form-group>
    </div>
    <b-button-group class="w-100 mb-3">
      <b-button variant="primary" :disabled="isDisabled" @click="saveUser">
        <b-icon-cloud-arrow-up-fill ref="iconSave" /> Save
      </b-button>
      <b-button variant="danger" :disabled="isDisabled || isNew" @click="deleteUser">
        <b-icon-trash-fill ref="iconDelete" /> Begone
      </b-button>
      <b-button variant="primary" :disabled="isDisabled" @click="cancel">
        <b-icon-x-square-fill/> Cancel
      </b-button>
    </b-button-group>

    <b-modal title="Delete User" ok-variant="danger" cancel-variant="primary"
             v-modal="showConfirmDelete" @ok="tempUser">
      <template #modal-cancel>
        <b-icon-x-square-fill /> Cancel
      </template>
      <template #modal-ok>
        <b-icon-x-square-fill /> delete
      </template>
      Are you sure you want to delete {{tempUser.firstName}}, {{tempUser.lastName}}?
    </b-modal>
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

@Component({
  components: { IconButton },
})

export default class UserDeletionEdit extends Mixins(GlobalMixins) {
  @Prop({ type: Object, validator: (s) => s instanceof Object }) readonly user :any

  tempUser:User = new User();

  violation: any = {}

  showConfirmDelete = false;

  $refs!: {
    iconDelete: BIcon
    iconSave : BIcon
  }

  dt = { // Display Text - obj
    fn: 'First Name',
    ln: 'Last Name',
    pn: 'Phone Number',
    ad: 'Address',
    ur: 'Role',
    em: 'Email Address',
  }

  get hasErr(): any {
    return {
      fn: this.violation.firstName ? false : null,
      ln: this.violation.lastName ? false : null,
      pn: this.violation.phoneNumber ? false : null,
      ad: this.violation.address ? false : null,
      ur: this.violation.role ? false : null,
      em: this.violation.email ? false : null,
    };
  }

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

  async deleteUser() {
    const icon = this.$refs.iconDelete;
    this.setBusy(true);
    this.animate(icon, true);

    const url = `${this.USER_API}/${this.user.id}`;
    this.violation = await this.getErrorMessages(this.tempUser);
    try {
      const data = await this.callAPI(url, 'delete', this.tempUser = new User());
      this.$emit(data, this.user);
    } catch (err:any) {
      this.violation = this.mapValidationErrorArray(err.data);
    } finally {
      this.setBusy(false);
      this.animate(icon, false);
    }
  }

  deleteConfirm() {
    this.cancel();
    this.showConfirmDelete = true;
  }

  cancel() {
    this.violation = {}; // hide error message if any
    this.tempUser = Object.assign(new User(), this.user);
    this.$emit('canceled', this.user);
  }
}
</script>
