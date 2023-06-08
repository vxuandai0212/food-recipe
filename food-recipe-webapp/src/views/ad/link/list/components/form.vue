<template>
  <div>
    <!-- Khách hàng -->
    <div v-if="showAdCustomerField" class="form-group mb-4">
      <remote-select
        placeholder="Chọn khách hàng"
        :options="adCustomerOptions"
        value-path="ad.form.adCustomerId"
        set-value-command="ad/SET_FORM_AD_CUSTOMER_ID"
        @search="searchAdCustomer"
      />
    </div>
    <!-- Tên -->
    <div class="form-group">
      <vt-input
        v-model="name"
        class="mb-8"
        :max-length="MAX_LENGTH_AD_NAME"
        :class="{ error: validations.name.anyError() }"
        @blur="onNameBlur"
      >
        <template #label><span class="required">Tên</span></template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.name.validated">
          <div v-if="!validations.name.require">
            Tên quảng cáo bắt buộc nhập
          </div>
        </div>
      </div>
    </div>
    <!-- Link -->
    <div class="form-group">
      <vt-input
        v-model="link"
        class="mb-8"
        :max-length="MAX_LENGTH_LINK"
      >
        <template #label><span>Link</span></template>
      </vt-input>
    </div>
    <!-- Giá -->
    <div class="form-group">
      <vt-input
        v-model="price"
        class="mb-8"
        :max-length="MAX_LENGTH_AD_PRICE"
      >
        <template #label><span>Giá</span></template>
      </vt-input>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <!-- Ngày bắt đầu hiệu lực -->
        <div class="form-group">
          <vt-datepicker v-model="validFromDate" :min-date="new Date()" label="Ngày bắt đầu hiệu lực" />
        </div>
      </el-col>
      <el-col :span="12">
        <!-- Ngày hết hiệu lực -->
        <div class="form-group">
          <vt-datepicker v-model="validToDate" :min-date="new Date()" label="Ngày hết hiệu lực" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="form-group mb-4">
          <fix-select
            placeholder="Trạng thái thanh toán"
            :options="AD_PAY_STATUS_OPTIONS"
            value-path="ad.form.payStatus"
            set-value-command="ad/SET_FORM_PAY_STATUS"
          />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="form-group mb-4">
          <fix-select
            placeholder="Trạng thái hoạt động"
            :options="AD_STATUS_OPTIONS"
            value-path="ad.form.status"
            set-value-command="ad/SET_FORM_STATUS"
          />
        </div>
      </el-col>
    </el-row>
    <div class="form-group mb-4">
      <fix-select
        placeholder="Danh mục quảng cáo"
        :options="AD_CATEGORY_OPTIONS"
        value-path="ad.form.type"
        set-value-command="ad/SET_FORM_TYPE"
      />
    </div>
    <div class="text-right btn-wrapper mb-24">
      <el-button type="primary" plain size="medium" @click="onCloseForm">Đóng</el-button>
      <el-button type="primary" size="medium" :disabled="!isFormValid" @click="onSubmitForm">Lưu</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {
  MAX_LENGTH_AD_NAME,
  MAX_LENGTH_LINK,
  MAX_LENGTH_AD_PRICE
} from '@/utils/constants/constraint'
import VtInput from '@/components/VtInput/index.vue'
import FixSelect from '@/components/Select/fix.vue'
import VtDatepicker from '@/components/VtDatepicker/index.vue'
import { ACTION, FIELD } from '@/utils/constant'
import { createSuccessNotify } from '@/utils/common'
import { mapState } from 'vuex'
import { pick } from 'lodash'
import RemoteSelect from '@/components/Select/remote.vue'
import { AD } from '@/utils/constants/route'
import { AD_CATEGORY_OPTIONS, AD_PAY_STATUS_OPTIONS, AD_STATUS_OPTIONS } from '@/utils/constants/ad'

@Component({
  components: {
    VtInput,
    FixSelect,
    RemoteSelect,
    VtDatepicker
  },
  computed: {
    ...mapState({
      adCustomerOptions: (state: any) => state.adCustomer.list.items.map((i: any) => ({ label: i.name, key: i.id, value: i.id }))
    })
  }
})
export default class Form extends Vue {
  MAX_LENGTH_AD_NAME = MAX_LENGTH_AD_NAME
  MAX_LENGTH_LINK = MAX_LENGTH_LINK
  MAX_LENGTH_AD_PRICE = MAX_LENGTH_AD_PRICE

  AD_CATEGORY_OPTIONS = AD_CATEGORY_OPTIONS
  AD_PAY_STATUS_OPTIONS = AD_PAY_STATUS_OPTIONS
  AD_STATUS_OPTIONS = AD_STATUS_OPTIONS

  get showAdCustomerField() {
    return this.$route.name === AD.LINK_LIST.NAME
  }

  get name() { return this.$store.state.ad.form.name }
  set name(value) { this.$store.commit('ad/SET_FORM_NAME', value) }

  get link() { return this.$store.state.ad.form.link }
  set link(value) { this.$store.commit('ad/SET_FORM_LINK', value) }

  get price() { return this.$store.state.ad.form.price }
  set price(value) { this.$store.commit('ad/SET_FORM_PRICE', value) }

  get validFromDate() { return this.$store.state.ad.form.validFromDate }
  set validFromDate(value) { this.$store.commit('ad/SET_FORM_VALID_FROM_DATE', value) }

  get validToDate() { return this.$store.state.ad.form.validToDate }
  set validToDate(value) { this.$store.commit('ad/SET_FORM_VALID_TO_DATE', value) }

  get isFormValid(): boolean {
    return this.validations.name.require &&
      this.validations.name.require
  }

  validations = {
    name: {
      require: true,
      validated: false,
      anyError() {
        return !this.require
      }
    }
  }

  onNameBlur() {
    const name = this.name
    this.validations.name.validated = true
    if (name) {
      this.validations.name.require = true
    } else {
      this.validations.name.require = false
    }
  }

  onCloseForm() { this.$emit('close-form') }

  async onSubmitForm() {
    try {
      const form = this.$store.state.ad.form
      const id = form.id
      const adCustomerId = form.adCustomerId
      if (!adCustomerId) { form.adCustomerId = this.$route.params.customerId }
      if (!id) {
        await this.$store.dispatch('ad/upsert', pick(form, ['name', 'link', 'adCustomerId', 'price', 'validFromDate', 'validToDate', 'payStatus', 'status', 'type']))
      } else {
        await this.$store.dispatch('ad/upsert', pick(form, ['id', 'name', 'link', 'adCustomerId', 'price', 'validFromDate', 'validToDate', 'payStatus', 'status', 'type']))
      }
      createSuccessNotify(this, ACTION.SAVE, FIELD.AD)
      this.$emit('saved')
    } catch (error) {
      console.log(error)
    }
  }

  searchAdCustomer(value) {
    this.$store.commit('adCustomer/SET_LIST_QUERY_PAGE', 1)
    this.$store.commit('adCustomer/SET_LIST_QUERY_LIMIT', 20)
    this.$store.commit('adCustomer/SET_LIST_QUERY_SEARCH_KEYWORD', value)
    this.$store.dispatch('adCustomer/getAllItem')
  }
}
</script>
<style lang="scss">
.btn-wrapper button {
  width: 110px;
  font-size: 16px;
  line-height: 18px;
  height: 50px;
}
</style>
