<template>
  <el-table class="table-TSM" :data="items" style="border-radius: 8px 8px 0 0;">
    <el-table-column label="Tên">
      <template slot-scope="{row}">{{ row.name }}</template>
    </el-table-column>
    <el-table-column label="Số điện thoại">
      <template slot-scope="{row}"><el-tag>{{ row.phone }}</el-tag></template>
    </el-table-column>
    <el-table-column label="Email">
      <template slot-scope="{row}"><el-tag v-if="row.email">{{ row.email }}</el-tag></template>
    </el-table-column>
    <el-table-column align="left" class-name="action-column" width="450px">
      <template slot-scope="{row}">
        <el-button type="success" plain class="mr-8" @click="goToDetail(row)">Xem</el-button>
        <el-button :disabled="!row.website" type="warning" plain class="mr-8" @click="visit(row)">Truy cập</el-button>
        <el-button type="primary" plain class="mr-8" @click="openUpdateDialog(row)">Cập nhật</el-button>
        <icon-button icon="remove" type="danger" :note="deleteNote" @click="openDeleteDialog(row)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import IconButton from '@/components/CommonButtons/IconButton.vue'
import ViewButton from '@/components/CommonButtons/ViewButton.vue'
import { AD } from '@/utils/constants/route'
@Component({
  components: { IconButton, ViewButton },
  computed: {
    ...mapState({
      items: (state: any) => state.adCustomer.list.items
    })
  }
})
export default class Table extends Vue {
  get deleteNote() { return 'Xoá khách hàng' }

  openUpdateDialog(row) {
    this.$store.commit('adCustomer/SET_FORM', row)
    this.$store.commit('adCustomer/SET_UI_VISIBLE_FORM_DIALOG', true)
  }

  openDeleteDialog(row) {
    this.$store.commit('adCustomer/SET_DETAIL_ITEM', row)
    this.$store.commit('adCustomer/SET_UI_VISIBLE_DELETE_DIALOG', true)
  }

  goToDetail(row) {
    this.$store.commit('adCustomer/RESET_DETAIL_ITEM')
    this.$router.push({ name: AD.CUSTOMER_DETAIL.NAME, params: { customerId: row.id }})
  }

  visit(row) { window.open(row.website, '_blank') }
}
</script>
<style scoped></style>
