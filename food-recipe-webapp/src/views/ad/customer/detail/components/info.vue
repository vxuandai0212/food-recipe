<template>
  <el-col v-if="!containerLoading" :span="24">
    <el-row :gutter="20">
      <card>
        <el-col :span="8">
          <el-row>
            <el-col :span="24"><label>Thông tin khách hàng</label></el-col>
            <el-col :span="24"><el-divider /></el-col>
            <el-col :span="24">
              <p v-if="name"><b>Tên</b><span class="ml-8">{{ name }}</span></p>
              <p><b>Số điện thoại</b><span class="ml-8">{{ phone }}</span></p>
              <p v-if="email"><b>Email</b><span class="ml-8">{{ email }}</span></p>
              <el-button :disabled="!website" type="success" plain class="mr-8" @click="visit">Truy cập website</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="16">
          <el-row>
            <el-col :span="24"><label>Thông tin quảng cáo</label></el-col>
            <el-col :span="24"><el-divider /></el-col>
            <el-col :span="24">
              <el-col :span="8">
                <p><b>Tổng</b><span class="ml-8">{{ total }}</span></p>
                <p><b>Đã thanh toán</b><span class="ml-8">{{ total }}</span></p>
                <p><b>Quá hạn</b><span class="ml-8">{{ expire }}</span></p>
              </el-col>
              <el-col :span="8">
                <p><b class="ml-32">Hoạt động</b><span class="ml-8">{{ active }}</span></p>
                <p><b class="ml-32">Chưa thanh toán</b><span class="ml-8">{{ active }}</span></p>
              </el-col>
              <el-col :span="8">
                <p><b class="ml-32">Không hoạt động</b><span class="ml-8">{{ inactive }}</span></p>
              </el-col>
            </el-col>
          </el-row>
        </el-col>
      </card>
    </el-row>
  </el-col>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import Card from '@/components/Card/common.vue'
@Component({
  components: { Card },
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.adCustomer.ui.containerLoading,
      name: (state: any) => state.adCustomer.detail.item.name,
      phone: (state: any) => state.adCustomer.detail.item.phone,
      email: (state: any) => state.adCustomer.detail.item.email,
      website: (state: any) => state.adCustomer.detail.item.website,
      total: (state: any) => state.ad.list.total,
      active: (state: any) => state.ad.list.active,
      inactive: (state: any) => state.ad.list.inactive,
      payed: (state: any) => state.ad.list.payed,
      notPayed: (state: any) => state.ad.list.notPayed,
      expire: (state: any) => state.ad.list.expire
    })
  }
})
export default class Detail extends Vue {
  get customerId() { return this.$route.params.customerId }

  async created() { await this.getItem() }

  async getItem() {
    await this.$store.commit('adCustomer/SET_UI_CONTAINER_LOADING', true)
    await this.$store.dispatch('adCustomer/getDetailItem', this.customerId)
    await this.$store.commit('adCustomer/SET_UI_CONTAINER_LOADING', false)
  }

  visit() { window.open((this as any).website, '_blank') }
}
</script>
<style lang="scss"></style>
