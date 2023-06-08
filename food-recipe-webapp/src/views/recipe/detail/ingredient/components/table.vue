<template>
  <el-table v-loading="listLoading" class="table-TSM" :data="items" style="border-radius: 8px 8px 0 0;">
    <el-table-column label="Tên">
      <template slot-scope="{row}">{{ row.ingredientName }}</template>
    </el-table-column>
    <el-table-column label="Khối lượng">
      <template slot-scope="{row}">{{ row.quantity }}</template>
    </el-table-column>
    <el-table-column label="Khối lượng hiển thị">
      <template slot-scope="{row}">{{ row.displayQuantity }}</template>
    </el-table-column>
    <el-table-column label="Đơn vị hiển thị">
      <template slot-scope="{row}">{{ row.displayQuantityUnit }}</template>
    </el-table-column>
    <el-table-column align="left" class-name="action-column" width="350px">
      <template slot="header">
        <add-resource-button style="float:right;margin-right:34px;" @click="openDialog" />
      </template>
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
import AddResourceButton from '@/components/CommonButtons/AddResourceButton.vue'
import IconButton from '@/components/CommonButtons/IconButton.vue'

@Component({
  components: { IconButton, AddResourceButton },
  computed: {
    ...mapState({
      listLoading: (state: any) => state.recipeIngredient.ui.listLoading,
      items: (state: any) => state.recipeIngredient.list.items
    })
  }
})
export default class Table extends Vue {
  get deleteNote() { return 'Xoá thành phần' }

  async openUpdateDialog(row) {
    await this.getAllIngredient()
    await this.$store.commit('recipeIngredient/SET_FORM', row)
    await this.$store.commit('recipeIngredient/SET_UI_VISIBLE_FORM_DIALOG', true)
  }

  async getAllIngredient() {
    await this.$store.commit('ingredient/SET_LIST_QUERY_PAGE', 1)
    await this.$store.commit('ingredient/SET_LIST_QUERY_LIMIT', 1000)
    await this.$store.dispatch('ingredient/getAllItem')
  }

  openDeleteDialog(row) {
    this.$store.commit('recipeIngredient/SET_DETAIL_ITEM', row)
    this.$store.commit('recipeIngredient/SET_UI_VISIBLE_DELETE_DIALOG', true)
  }

  openDialog() {
    this.$store.commit('recipeIngredient/RESET_FORM')
    this.$store.commit('recipeIngredient/SET_UI_VISIBLE_FORM_DIALOG', true)
  }
}
</script>
<style scoped></style>
