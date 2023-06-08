<template>
  <el-table class="table-TSM" :data="items" style="border-radius: 8px 8px 0 0;">
    <el-table-column label="Thời gian">
      <template slot-scope="{row}">{{ row.viewAt | timeFilter }}</template>
    </el-table-column>
    <el-table-column label="IP">
      <template slot-scope="{row}"><el-tag>{{ row.ipAddress }}</el-tag></template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import moment from 'moment'
@Component({
  computed: {
    ...mapState({
      items: (state: any) => state.adViewLog.list.items
    })
  },
  filters: {
    timeFilter(value) {
      return moment(value).format('DD-MM-Y HH:mm:ss')
    }
  }
})
export default class Table extends Vue {}
</script>
<style scoped></style>
