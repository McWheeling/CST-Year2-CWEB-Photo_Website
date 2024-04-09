<template>
  <div>
    <div>
      <h1>Selected User</h1>
    </div>
    <div>
      <UserDeletionEdit class="col-md-6 col-lg-4" :user="selectedUser" @busy="setBusy"
                        :disabled="isDisabled" @added="handleAdd" @updated="handleUpdate"
                        @cancelled="handleCancel"
                        @deleted="handleDelete" @reset="handleReset"/>
      <!--      //display user  information-->
      <b-overlay opacity=".25" class="col-md-6 col-lg-8 order-md-0" :show="isDisabled">
        <b-table striped hover responsive primary-key="id" @row-selected="selectedUser=$event"
                 :fields="fields" :api-url="USER_API" :items="provider"
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
import { Component, Mixins } from 'vue-property-decorator';
import { BvTableCtxObject } from 'bootstrap-vue/src/components/table';
import { BIcon, BTable } from 'bootstrap-vue';
import UserFormCreation from '@/components/UserFormCreation.vue';
import GlobalMixins from '../mixins/global-mixins';
import User from '../models/User';
import UserDeletionEdit from '../components/UserDeletionEdit.vue';

@Component({
  components: { UserFormCreation, UserDeletionEdit },
})

export default class UserView extends Mixins(GlobalMixins) {
  provider(context:BvTableCtxObject) {
    return this.callAPI((`${context.apiUrl}`));
  }

  $refs!: {
    userTable:BTable
  }

  fields = [
    { key: 'id', sortable: true },
    { key: 'firstName', sortable: true },
    { key: 'lastName', sortable: true },
    { key: 'phoneNumber', sortable: true },
    { key: 'address', sortable: true },
    { key: 'role', sortable: true },
    { key: 'email', sortable: true },

  ]

  selectedUser:User=new User()

  get users() { return this.$refs.userTable.localItems; }

  refreshTable() { this.$refs.userTable.refresh(); }

  // handleAdd
  async handleAdd(user:User) {
    await this.users.unshift(user);
    // this.selectRow(user);
    this.selectedUser = user;
  }

  // handleupdate
  handleUpdate(user:User) {
    Object.assign(this.selectedUser, user);
  }

  // handlecancel
  handleCancel(user:User) {
    // donothing
  }

  // handledelete
  handleReset(user:User) {
    this.refreshTable();
  }

  // handledelete
  handleDelete(user:User) {
    this.selectedUser = new User();
    const index = this.users.findIndex((s:User) => s.id === user.id);
    if (index >= 0) this.users.splice(index, 1);
  }
}

</script>
