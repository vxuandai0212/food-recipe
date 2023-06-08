<template>
  <el-table v-loading="listLoading" class="table-TSM" :data="items" style="border-radius: 8px 8px 0 0;">
    <el-table-column label="Tên">
      <template slot-scope="{row}">{{ row.name }}</template>
    </el-table-column>
    <el-table-column label="Giá">
      <template slot-scope="{row}"><el-tag>{{ row.price | moneyFilter }}</el-tag></template>
    </el-table-column>
    <el-table-column label="Giá hiển thị">
      <template slot-scope="{row}">{{ row.displayPrice }}</template>
    </el-table-column>
    <el-table-column label="Đơn vị giá hiển thị">
      <template slot-scope="{row}">{{ row.displayPriceUnit }}</template>
    </el-table-column>
    <el-table-column align="left" class-name="action-column" width="350px">
      <template slot-scope="{row}">
        <el-button type="success" plain class="mr-8" @click="viewDetail(row)">Xem</el-button>
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
import { INGREDIENT } from '@/utils/constants/route'
import { formatVndMoney } from '@/utils/common'

@Component({
  components: { IconButton },
  computed: {
    ...mapState({
      listLoading: (state: any) => state.ingredient.ui.listLoading,
      items: (state: any) => state.ingredient.list.items
    })
  },
  filters: {
    moneyFilter(value) { return formatVndMoney(Number(value)) }
  }
})
export default class Table extends Vue {
  get deleteNote() { return 'Xoá thành phần' }

  viewDetail(row) {
    const { id } = row
    this.$router.push({ name: INGREDIENT.DETAIL.NAME, params: { ingredientId: id }})
    this.$store.commit('ingredient/SET_DETAIL_ITEM', row)
  }

  openUpdateDialog(row) {
    this.$store.commit('ingredient/SET_FORM', row)
    this.$store.commit('ingredient/SET_UI_VISIBLE_FORM_DIALOG', true)
  }

  openDeleteDialog(row) {
    this.$store.commit('ingredient/SET_DETAIL_ITEM', row)
    this.$store.commit('ingredient/SET_UI_VISIBLE_DELETE_DIALOG', true)
  }
}
</script>
<style scoped></style>
