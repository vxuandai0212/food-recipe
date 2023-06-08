<template>
  <el-table v-loading="listLoading" class="table-TSM" :data="items" style="border-radius: 8px 8px 0 0;">
    <el-table-column label="Tên">
      <template slot-scope="{row}">
        <el-tooltip :content="row.adName" placement="right" :open-delay="200"><span>{{ row.adName }}</span></el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="Danh mục">
      <template slot-scope="{row}"><el-tag>{{ row.adType | typeFilter }}</el-tag></template>
    </el-table-column>
    <el-table-column label="Khách hàng">
      <template slot-scope="{row}"><el-tag>{{ row.customerName }}</el-tag></template>
    </el-table-column>
    <el-table-column align="left" class-name="action-column" width="350px">
      <template slot="header">
        <add-resource-button style="float:right;margin-right:34px;" @click="openDialog" />
      </template>
      <template slot-scope="{row}">
        <el-button type="warning" plain class="mr-8" @click="detail(row)">Chi tiết</el-button>
        <el-button type="primary" plain class="mr-8" @click="visit(row)">Truy cập</el-button>
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
import { AD_CATEGORY_MAP } from '@/utils/constants/ad'
import { AD } from '@/utils/constants/route'

@Component({
  components: { IconButton, AddResourceButton },
  computed: {
    ...mapState({
      listLoading: (state: any) => state.adLocation.ui.listLoading,
      items: (state: any) => state.adLocation.list.items
    })
  },
  filters: {
    typeFilter(value) { return AD_CATEGORY_MAP.get(value) }
  }
})
export default class Table extends Vue {
  recipeId = this.$route.params.recipeId

  get deleteNote() { return 'Xoá quảng cáo' }

  openDeleteDialog(row) {
    this.$store.commit('adLocation/SET_DETAIL_ITEM', row)
    this.$store.commit('adLocation/SET_UI_VISIBLE_DELETE_DIALOG', true)
  }

  openDialog() {
    this.$store.commit('adLocation/RESET_FORM')
    this.$store.commit('adLocation/SET_UI_VISIBLE_FORM_DIALOG', true)
  }

  detail(row) { this.$router.push({ name: AD.LINK_LOG.NAME, params: { adId: row.adId, recipeId: this.recipeId }}) }

  visit(row) { window.open(row.adLink, '_blank') }
}
</script>
<style scoped></style>
