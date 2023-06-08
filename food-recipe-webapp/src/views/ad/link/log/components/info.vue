<template>
  <div v-if="!containerLoading">
    <card :d-flex="true">
      <el-col>
        <el-col :span="12">
          <label>Thông tin quảng cáo</label>
          <el-divider style="width: 80%!important" />
          <el-col :span="12">
            <p><b>Tên</b><span class="ml-8 mr-48">{{ name }}</span></p>
            <p><b>Giá</b><span class="ml-8 mr-48">{{ price | moneyFilter }}</span></p>
            <p><b>Danh mục</b><span class="ml-8 mr-48">{{ type | typeFilter }}</span></p>
            <p><b>Thanh toán</b><span class="ml-8">{{ payStatus | payStatusFilter }}</span></p>
            <el-button :disabled="!link" type="success" plain class="mr-8" @click="visit">Truy cập website</el-button>
          </el-col>
          <el-col :span="12">
            <p><b>Ngày bắt đầu</b><span class="ml-8 mr-48">{{ validFromDate | dateFilter }}</span></p>
            <p><b>Ngày hết hạn</b><span class="ml-8">{{ validToDate | dateFilter }}</span></p>
            <p><b>Trạng thái</b><span class="ml-8">{{ status | statusFilter }}</span></p>
          </el-col>
        </el-col>
        <el-col :span="12">
          <label>Nơi đặt quảng cáo</label>
          <el-divider style="width: 80%!important" />
          <p>
            <b>Tên công thức</b><span class="ml-8 mr-48">{{ recipeName }}</span>
            <b>Lượt xem</b><span class="ml-8 mr-48">{{ view }}</span>
          </p>
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
      type: (state: any) => state.ad.detail.item.type,
      recipeName: (state: any) => state.adView.detail.item.recipeName,
      view: (state: any) => state.adView.detail.item.view
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

  get recipeId() { return this.$route.params.recipeId }

  async created() {
    await this.$store.commit('ad/SET_UI_CONTAINER_LOADING', true)
    await this.getAdInfo()
    await this.getAdView()
    await this.$store.commit('ad/SET_UI_CONTAINER_LOADING', false)
  }

  async getAdInfo() { await this.$store.dispatch('ad/getDetailItem', this.adId) }

  async getAdView() { await this.$store.dispatch('adView/getDetailItem', { recipeId: this.recipeId, adId: this.adId }) }

  visit() { window.open((this as any).link, '_blank') }
}
</script>
<style lang="scss"></style>
