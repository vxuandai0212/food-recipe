<template>
  <el-table v-loading="listLoading" class="table-TSM" :data="items" style="border-radius: 8px 8px 0 0;">
    <el-table-column label="Tên">
      <template slot-scope="{row}">{{ row.title }}</template>
    </el-table-column>
    <el-table-column label="Chuyên mục">
      <template slot-scope="{row}"><el-tag v-if="row.category">{{ row.category }}</el-tag></template>
    </el-table-column>
    <el-table-column label="Chuyên mục con">
      <template slot-scope="{row}"><el-tag v-if="row.subCategory">{{ row.subCategory }}</el-tag></template>
    </el-table-column>
    <el-table-column label="Ngày xuất bản">
      <template slot-scope="{row}">{{ row.createdAt | timeFilter }}</template>
    </el-table-column>
    <el-table-column align="left" class-name="action-column" width="350px">
      <template slot-scope="{row}">
        <el-button type="primary" plain class="mr-8" @click="viewDetail(row)">Cập nhật</el-button>
        <icon-button icon="remove" type="danger" :note="deleteNote" @click="openDeleteDialog(row)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import IconButton from '@/components/CommonButtons/IconButton.vue'
import { FT_POST } from '@/utils/constants/route'
import moment from 'moment'

@Component({
  components: { IconButton },
  computed: {
    ...mapState({
      listLoading: (state: any) => state.ftPost.ui.listLoading,
      items: (state: any) => state.ftPost.list.items
    })
  },
  filters: {
    timeFilter(value) {
      return moment(value).format('DD-MM-Y HH:mm:ss')
    }
  }
})
export default class Table extends Vue {
  get deleteNote() { return 'Xoá bài viết' }

  viewDetail(row) {
    const { id } = row
    this.$router.push({ name: FT_POST.DETAIL.NAME, params: { postId: id }})
    this.$store.commit('ftPost/SET_DETAIL_ITEM', row)
  }

  openDeleteDialog(row) {
    this.$store.commit('ftPost/SET_DETAIL_ITEM', row)
    this.$store.commit('ftPost/SET_UI_VISIBLE_DELETE_DIALOG', true)
  }
}
</script>
<style scoped></style>
