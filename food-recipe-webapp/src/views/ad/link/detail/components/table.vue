<template>
  <el-table class="table-TSM" :data="items" style="border-radius: 8px 8px 0 0;">
    <el-table-column label="Công thức">
      <template slot-scope="{row}">{{ row.recipeName }}</template>
    </el-table-column>
    <el-table-column label="Lượt xem">
      <template slot-scope="{row}"><el-tag>{{ row.view }}</el-tag></template>
    </el-table-column>
    <el-table-column align="right" class-name="action-column" width="350px">
      <template slot-scope="{row}">
        <el-button type="success" plain class="mr-8" @click="goToDetail(row)">Chi tiết</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { AD } from '@/utils/constants/route'
@Component({
  computed: {
    ...mapState({
      items: (state: any) => state.adView.list.items
    })
  }
})
export default class Table extends Vue {
  get adId() { return this.$route.params.adId }

  goToDetail(row) { this.$router.push({ name: AD.LINK_LOG.NAME, params: { recipeId: row.recipeId, adId: this.adId }}) }
}
</script>
<style scoped></style>
