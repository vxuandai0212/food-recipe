<template>
  <el-table
    v-loading="listLoading"
    class="table-TSM"
    :data="items"
    style="border-radius: 8px 8px 0 0;"
  >
    <el-table-column label="Tên dịp">
      <template slot-scope="{row}">
        {{ row.name }}
      </template>
    </el-table-column>
    <el-table-column align="left" class-name="action-column" width="350px">
      <template slot-scope="{row}">
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

@Component({
  components: { IconButton },
  computed: {
    ...mapState({
      listLoading: (state: any) => state.cookEvent.ui.listLoading,
      items: (state: any) => state.cookEvent.list.items
    })
  }
})
export default class Table extends Vue {
  get deleteNote() { return 'Xoá dịp' }

  openUpdateDialog(row) {
    this.$store.commit('cookEvent/SET_FORM', row)
    this.$store.commit('cookEvent/SET_UI_VISIBLE_FORM_DIALOG', true)
  }

  openDeleteDialog(row) {
    this.$store.commit('cookEvent/SET_DETAIL_ITEM', row)
    this.$store.commit('cookEvent/SET_UI_VISIBLE_DELETE_DIALOG', true)
  }
}
</script>
<style scoped></style>
