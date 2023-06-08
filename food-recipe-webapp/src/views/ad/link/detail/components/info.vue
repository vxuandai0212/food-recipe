<template>
  <div v-if="!containerLoading">
    <card>
      <el-col :span="24">
        <label>Thông tin quảng cáo</label>
        <el-divider />
        <el-col :span="8">
          <p><b>Tên</b><span class="ml-8 mr-48">{{ name }}</span></p>
          <p><b>Giá</b><span class="ml-8 mr-48">{{ price | moneyFilter }}</span></p>
          <p><b>Danh mục</b><span class="ml-8 mr-48">{{ type | typeFilter }}</span></p>
          <el-button :disabled="!link" type="success" plain class="mr-8" @click="visit">Truy cập website</el-button>
        </el-col>
        <el-col :span="8">
          <p><b>Ngày bắt đầu</b><span class="ml-8 mr-48">{{ validFromDate | dateFilter }}</span></p>
          <p><b>Trạng thái</b><span class="ml-8">{{ status | statusFilter }}</span></p>
          <p><b>Thanh toán</b><span class="ml-8">{{ payStatus | payStatusFilter }}</span></p>
        </el-col>
        <el-col :span="8">
          <p><b>Ngày hết hạn</b><span class="ml-8">{{ validToDate | dateFilter }}</span></p>
        </el-col>
      </el-col>
    </card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import Card from '@/components/Card/common.vue'
import moment from 'moment'
import { formatVndMoney } from '@/utils/common'
import { AD_CATEGORY_MAP, AD_PAY_STATUS_MAP, AD_STATUS_MAP } from '@/utils/constants/ad'
@Component({
  components: { Card },
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.ad.ui.containerLoading,
      name: (state: any) => state.ad.detail.item.name,
      link: (state: any) => state.ad.detail.item.link,
      price: (state: any) => state.ad.detail.item.price,
      validFromDate: (state: any) => state.ad.detail.item.validFromDate,
      validToDate: (state: any) => state.ad.detail.item.validToDate,
      status: (state: any) => state.ad.detail.item.status,
      payStatus: (state: any) => state.ad.detail.item.payStatus,
      type: (state: any) => state.ad.detail.item.type
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
export default class Detail extends Vue {
  get adId() { return this.$route.params.adId }

  async created() { await this.getItem() }

  async getItem() {
    await this.$store.commit('ad/SET_UI_CONTAINER_LOADING', true)
    await this.$store.dispatch('ad/getDetailItem', this.adId)
    await this.$store.commit('ad/SET_UI_CONTAINER_LOADING', false)
  }

  visit() { window.open((this as any).link, '_blank') }
}
</script>
<style lang="scss"></style>
