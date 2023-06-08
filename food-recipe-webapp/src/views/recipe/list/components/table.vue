<template>
  <el-table v-loading="listLoading" class="table-TSM" :data="items" style="border-radius: 8px 8px 0 0;">
    <el-table-column label="Tên công thức">
      <template slot-scope="{row}">{{ row.name }}</template>
    </el-table-column>
    <el-table-column label="Thời gian chế biến">
      <template slot-scope="{row}"><el-tag>{{ row.cookTime }}</el-tag></template>
    </el-table-column>
    <el-table-column align="left" class-name="action-column" width="350px">
      <template slot-scope="{row}">
        <el-button type="success" plain class="mr-8" @click="goToDetail(row)">Xem</el-button>
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
import { RECIPE } from '@/utils/constants/route'
@Component({
  components: { IconButton, ViewButton },
  computed: {
    ...mapState({
      listLoading: (state: any) => state.recipe.ui.listLoading,
      items: (state: any) => state.recipe.list.items
    })
  }
})
export default class Table extends Vue {
  get deleteNote() { return 'Xoá công thức' }

  openUpdateDialog(row) {
    this.$store.commit('recipe/SET_FORM', row)
    this.$store.commit('recipe/SET_UI_VISIBLE_FORM_DIALOG', true)
  }

  openDeleteDialog(row) {
    this.$store.commit('recipe/SET_DETAIL_ITEM', row)
    this.$store.commit('recipe/SET_UI_VISIBLE_DELETE_DIALOG', true)
  }

  goToDetail(row) {
    this.$store.commit('recipe/RESET_DETAIL_ITEM')
    this.$router.push({ name: RECIPE.DETAIL.NAME, params: { recipeId: row.id }})
  }
}
</script>
<style scoped></style>
