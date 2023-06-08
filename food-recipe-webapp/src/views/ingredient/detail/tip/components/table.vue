<template>
  <el-table v-loading="listLoading" class="table-TSM" :data="items" style="border-radius: 8px 8px 0 0;">
    <el-table-column label="Nội dung">
      <template slot-scope="{row}">
        <el-tooltip :content="row.description" placement="right" :open-delay="200"><span>{{ row.description }}</span></el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="Loại">
      <template slot-scope="{row}"><el-tag>{{ getType(row.type) }}</el-tag></template>
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
import { INGREDIENT_INFO_TYPE_MAP } from '@/utils/constants/ingredient'

@Component({
  components: { IconButton, AddResourceButton },
  computed: {
    ...mapState({
      listLoading: (state: any) => state.ingredientInfo.ui.listLoading,
      items: (state: any) => state.ingredientInfo.list.items
    })
  }
})
export default class Table extends Vue {
  get deleteNote() { return 'Xoá mẹo' }

  getType(type) { return INGREDIENT_INFO_TYPE_MAP.get(type) }

  openUpdateDialog(row) {
    this.$store.commit('ingredientInfo/SET_FORM', row)
    this.$store.commit('ingredientInfo/SET_UI_VISIBLE_FORM_DIALOG', true)
  }

  openDeleteDialog(row) {
    this.$store.commit('ingredientInfo/SET_DETAIL_ITEM', row)
    this.$store.commit('ingredientInfo/SET_UI_VISIBLE_DELETE_DIALOG', true)
  }

  openDialog() {
    this.$store.commit('ingredientInfo/RESET_FORM')
    this.$store.commit('ingredientInfo/SET_UI_VISIBLE_FORM_DIALOG', true)
  }
}
</script>
<style scoped></style>
