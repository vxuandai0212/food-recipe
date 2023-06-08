<template>
  <el-table class="table-TSM" :data="items" style="border-radius: 8px 8px 0 0;">
    <el-table-column label="Tên">
      <template slot-scope="{row}">{{ row.nutritionName }}</template>
    </el-table-column>
    <el-table-column label="Đơn vị">
      <template slot-scope="{row}"><el-tag>{{ row.nutritionName === 'energy' ? 'kcal' : 'mg' }}</el-tag></template>
    </el-table-column>
    <el-table-column label="Giá trị">
      <template slot-scope="{row}">{{ row.nutritionValue }}</template>
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
import IconButton from '@/components/CommonButtons/IconButton.vue'
import AddResourceButton from '@/components/CommonButtons/AddResourceButton.vue'

@Component({
  components: { IconButton, AddResourceButton },
  computed: {
    ...mapState({
      items: (state: any) => state.ingredientNutrition.list.items
    })
  }
})
export default class Table extends Vue {
  get deleteNote() { return 'Xoá chất dinh dưỡng' }

  openUpdateDialog(row) {
    this.$store.commit('ingredientNutrition/SET_FORM', row)
    this.$store.commit('ingredientNutrition/SET_UI_VISIBLE_FORM_DIALOG', true)
  }

  openDeleteDialog(row) {
    this.$store.commit('ingredientNutrition/SET_DETAIL_ITEM', row)
    this.$store.commit('ingredientNutrition/SET_UI_VISIBLE_DELETE_DIALOG', true)
  }

  openDialog() {
    this.$store.commit('ingredientNutrition/RESET_FORM')
    this.$store.commit('ingredientNutrition/SET_UI_VISIBLE_FORM_DIALOG', true)
  }
}
</script>
<style scoped></style>
