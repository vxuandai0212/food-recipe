<template>
  <el-table v-loading="listLoading" class="table-TSM" :data="items" style="border-radius: 8px 8px 0 0;">
    <el-table-column label="Từ khóa">
      <template slot-scope="{row}">{{ row.name }}</template>
    </el-table-column>
    <el-table-column label="Lượt tìm kiếm">
      <template slot-scope="{row}"><el-tag>{{ row.view }}</el-tag></template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
@Component({
  computed: {
    ...mapState({
      listLoading: (state: any) => state.viewKeyword.ui.listLoading,
      items: (state: any) => state.viewKeyword.list.items
    })
  }
})
export default class Table extends Vue {}
</script>
<style scoped></style>
