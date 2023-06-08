<template>
  <el-table class="table-TSM" :data="items" style="border-radius: 8px 8px 0 0;">
    <el-table-column label="Tên">
      <template slot-scope="{row}">{{ row.adName }}</template>
    </el-table-column>
    <el-table-column label="Lượt xem">
      <template slot-scope="{row}"><el-tag>{{ row.view }}</el-tag></template>
    </el-table-column>
    <el-table-column label="Khách hàng">
      <template slot-scope="{row}">{{ row.customerName }}</template>
    </el-table-column>
    <el-table-column label="Công thức">
      <template slot-scope="{row}">{{ row.recipeName }}</template>
    </el-table-column>
    <el-table-column label="Danh mục">
      <template slot-scope="{row}"><el-tag>{{ getType(row.adType) }}</el-tag></template>
    </el-table-column>
    <el-table-column align="left" class-name="action-column" width="350px">
      <template slot-scope="{row}">
        <el-button type="success" plain class="mr-8" @click="goToDetail(row)">Xem</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { RECIPE } from '@/utils/constants/route'
import { AD_CATEGORY_MAP } from '@/utils/constants/ad'
@Component({
  computed: {
    ...mapState({
      items: (state: any) => state.viewAdmob.list.items
    })
  }
})
export default class Table extends Vue {
  getType(type) { return AD_CATEGORY_MAP.get(type) }

  goToDetail(row) { this.$router.push({ name: RECIPE.DETAIL.NAME, params: { recipeId: row.recipeId }}) }
}
</script>
<style scoped></style>
