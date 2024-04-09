<template>
  <div>
    <div>
      <h1>Profile</h1>
    </div>
    <div>
      <UserLogin class="col-md-6 col-lg-4" :user="selectedUser" @busy="setBusy"
                 :disabled="isDisabled" />
      <a class="pt-2" href="http://localhost:8080/#/signUp">Don't have an Account?</a>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { BvTableCtxObject } from 'bootstrap-vue/src/components/table';
import { BIcon, BTable } from 'bootstrap-vue';
import GlobalMixins from '../mixins/global-mixins';
import User from '../models/User';
import UserFormCreation from '../components/UserFormCreation.vue';
import UserLogin from '../components/UserLogin.vue';

@Component({
  components: { UserLogin, UserFormCreation },
})

export default class ProfileView extends Mixins(GlobalMixins) {
  provider(context:BvTableCtxObject) {
    return this.callAPI((`${context.apiUrl}`));
  }

  $refs!: {
    usertable:BTable
  }

  fields = [
    { key: 'id', sortable: true }, // may be uuid
    { key: 'firstName', sortable: true },
    { key: 'lastName', sortable: true },
    { key: 'phoneNumber', sortable: true },
    { key: 'address', sortable: true },
    { key: 'role', sortable: true },
    { key: 'email', sortable: true },

  ]

  selectedUser:User=new User()
}

</script>
