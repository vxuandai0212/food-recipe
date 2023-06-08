<template>
  <div>
    <!-- Tên -->
    <div class="form-group">
      <vt-input
        v-model="name"
        class="mb-8"
        :max-length="MAX_LENGTH_AD_CUSTOMER_NAME"
      >
        <template #label><span>Tên</span></template>
      </vt-input>
    </div>
    <!-- Số điện thoại -->
    <div class="form-group">
      <vt-input
        v-model="phone"
        class="mb-8"
        :max-length="MAX_LENGTH_PHONE"
        :class="{ error: validations.phone.anyError() }"
        @blur="onPhoneBlur"
      >
        <template #label><span class="required">Số điện thoại</span></template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.phone.validated">
          <div v-if="!validations.phone.require">Số điện thoại bắt buộc nhập</div>
          <div v-else-if="validations.phone.required && !validations.phone.notExist">Số điện thoại đã tồn tại</div>
        </div>
      </div>
    </div>
    <!-- Email -->
    <div class="form-group">
      <vt-input
        v-model="email"
        class="mb-8"
        :max-length="MAX_LENGTH_EMAIL"
      >
        <template #label><span>Địa chỉ email</span></template>
      </vt-input>
    </div>
    <!-- Website -->
    <div class="form-group">
      <vt-input
        v-model="website"
        class="mb-8"
        :max-length="MAX_LENGTH_WEBSITE"
      >
        <template #label><span>Website</span></template>
      </vt-input>
    </div>
    <div class="text-right btn-wrapper mb-24">
      <el-button type="primary" plain size="medium" @click="onCloseForm">Đóng</el-button>
      <el-button type="primary" size="medium" :loading="loading" :disabled="!isFormValid" @click="onSubmitForm">Lưu</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {
  MAX_LENGTH_AD_CUSTOMER_NAME,
  MAX_LENGTH_PHONE,
  MAX_LENGTH_EMAIL,
  MAX_LENGTH_WEBSITE
} from '@/utils/constants/constraint'
import VtInput from '@/components/VtInput/index.vue'
import { ACTION, FIELD } from '@/utils/constant'
import { createSuccessNotify } from '@/utils/common'
import { mapState } from 'vuex'
import { AD_CUSTOMER_PHONE_EXIST } from '@/utils/constants/error'
import { pick } from 'lodash'
@Component({
  components: {
    VtInput
  },
  computed: {
    ...mapState({
      loading: (state: any) => state.adCustomer.ui.commandLoading
    })
  }
})
export default class Form extends Vue {
  AD_CUSTOMER_PHONE_EXIST = AD_CUSTOMER_PHONE_EXIST
  MAX_LENGTH_AD_CUSTOMER_NAME = MAX_LENGTH_AD_CUSTOMER_NAME
  MAX_LENGTH_PHONE = MAX_LENGTH_PHONE
  MAX_LENGTH_EMAIL = MAX_LENGTH_EMAIL
  MAX_LENGTH_WEBSITE = MAX_LENGTH_WEBSITE

  get name() { return this.$store.state.adCustomer.form.name }
  set name(value) { this.$store.commit('adCustomer/SET_FORM_NAME', value) }

  get phone() { return this.$store.state.adCustomer.form.phone }
  set phone(value) { this.$store.commit('adCustomer/SET_FORM_PHONE', value) }

  get email() { return this.$store.state.adCustomer.form.email }
  set email(value) { this.$store.commit('adCustomer/SET_FORM_EMAIL', value) }

  get website() { return this.$store.state.adCustomer.form.website }
  set website(value) { this.$store.commit('adCustomer/SET_FORM_WEBSITE', value) }

  get isFormValid(): boolean {
    return this.validations.phone.require &&
      this.validations.phone.notExist
  }

  validations = {
    phone: {
      require: true,
      validated: false,
      notExist: true,
      anyError() {
        return !this.require || !this.notExist
      }
    }
  }

  onPhoneBlur() {
    const phone = this.phone
    this.validations.phone.validated = true
    if (phone) {
      this.validations.phone.require = true
    } else {
      this.validations.phone.require = false
    }
  }

  onCloseForm() { this.$emit('close-form') }

  async onSubmitForm() {
    try {
      const form = this.$store.state.adCustomer.form
      const id = form.id
      if (!id) {
        await this.$store.dispatch('adCustomer/upsert', pick(form, ['name', 'phone', 'email', 'website']))
      } else {
        await this.$store.dispatch('adCustomer/upsert', pick(form, ['id', 'name', 'phone', 'email', 'website']))
      }
      createSuccessNotify(this, ACTION.SAVE, FIELD.AD_CUSTOMER)
      this.$emit('saved')
    } catch (error) {
      if ((error as any).message === AD_CUSTOMER_PHONE_EXIST) {
        this.validations.phone.notExist = false
      }
    }
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
