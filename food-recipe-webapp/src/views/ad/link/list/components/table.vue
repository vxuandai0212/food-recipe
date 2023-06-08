<template>
  <el-table class="table-TSM" :data="items" style="border-radius: 8px 8px 0 0;">
    <el-table-column width="300" label="Tên">
      <template slot-scope="{row}">
        <el-tooltip :content="row.name" placement="right" :open-delay="200"><span>{{ row.name }}</span></el-tooltip>
      </template>
    </el-table-column>
    <el-table-column width="180" label="Giá">
      <template slot-scope="{row}">
        <el-tag v-if="row.price" type="warning">{{ row.price | moneyFilter }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column width="220" label="Danh mục">
      <template slot-scope="{row}">
        <el-tag>{{ row.type | typeFilter }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column width="150" label="Bắt đầu">
      <template slot-scope="{row}">
        <el-tag v-if="row.validFromDate" type="danger">{{ row.validFromDate | dateFilter }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column width="150" label="Hết hạn">
      <template slot-scope="{row}">
        <el-tag v-if="row.validToDate" type="danger">{{ row.validToDate | dateFilter }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column width="165" label="Thanh toán">
      <template slot-scope="{row}">
        <el-tag>{{ row.payStatus | payStatusFilter }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Trạng thái" width="180px">
      <template slot-scope="{row}">
        <status-tag :active-label="AD_STATUS.ACTIVE.TITLE" :disable-label="AD_STATUS.DISABLE.TITLE" :status="isStatusActive(row.status)" />
      </template>
    </el-table-column>
    <el-table-column align="right" class-name="action-column" width="250px">
      <template slot="header">
        <add-resource-button style="float:right;margin-right:34px;" @click="openDialog" />
      </template>
      <template slot-scope="{row}">
        <el-popover
          trigger="click"
          placement="bottom-end"
          popper-class="action-popover"
        >
          <el-button slot="reference" class="more-btn" size="medium" type="primary" plain>
            <svg-icon icon-class="more" />
          </el-button>
          <div>
            <div class="action" @click="goToDetail(row.id)">Xem</div>
            <div v-if="row.link" class="action" @click="visit(row.link)">Truy cập</div>
            <div class="action" @click="openUpdateDialog(row)">Cập nhật</div>
            <div class="action" @click="openDeleteDialog(row)">Xóa</div>
          </div>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import StatusTag from '@/components/StatusTag/index.vue'
import AddResourceButton from '@/components/CommonButtons/AddResourceButton.vue'
import { AD } from '@/utils/constants/route'
import moment from 'moment'
import { formatVndMoney } from '@/utils/common'
import { AD_CATEGORY_MAP, AD_PAY_STATUS_MAP, AD_STATUS_MAP, AD_STATUS } from '@/utils/constants/ad'
@Component({
  components: { StatusTag, AddResourceButton },
  computed: {
    ...mapState({
      items: (state: any) => state.ad.list.items
    })
  },
  filters: {
    moneyFilter(value) { return formatVndMoney(value) },
    typeFilter(value) { return AD_CATEGORY_MAP.get(value) },
    statusFilter(value) { return AD_STATUS_MAP.get(value) },
    payStatusFilter(value) { return AD_PAY_STATUS_MAP.get(value) },
    dateFilter(value) { return moment(value).format('DD-MM-Y') }
  }
})
export default class Table extends Vue {
  AD_STATUS = AD_STATUS

  isStatusActive(value) :boolean {
    return value === AD_STATUS.ACTIVE.VALUE
  }

  openUpdateDialog(row) {
    this.$store.commit('ad/SET_FORM', row)
    this.$store.commit('ad/SET_UI_VISIBLE_FORM_DIALOG', true)
  }

  openDeleteDialog(row) {
    this.$store.commit('ad/SET_DETAIL_ITEM', row)
    this.$store.commit('ad/SET_UI_VISIBLE_DELETE_DIALOG', true)
  }

  goToDetail(id) {
    this.$store.commit('ad/RESET_DETAIL_ITEM')
    this.$router.push({ name: AD.LINK_DETAIL.NAME, params: { adId: id }})
  }

  openDialog() {
    this.$store.commit('ad/RESET_FORM')
    this.$store.commit('ad/SET_UI_VISIBLE_FORM_DIALOG', true)
  }

  visit(link) { window.open(link, '_blank') }
}
</script>
<style lang="scss" scoped>
.more-btn {
  .svg-icon {
    vertical-align: middle;
  }
}
</style>
