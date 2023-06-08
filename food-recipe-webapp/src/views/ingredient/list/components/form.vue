<template>
  <div>
    <!-- Tên chất thành phần -->
    <div class="form-group">
      <vt-input
        v-model="name"
        class="mb-8"
        :max-length="MAX_LENGTH_INGREDIENT_NAME"
        :class="{ error: validations.name.anyError() }"
        @blur="onNameBlur"
      >
        <template #label>
          <span class="required">Tên thành phần</span>
        </template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.name.validated">
          <div v-if="!validations.name.require">
            Tên thành phần bắt buộc nhập
          </div>
          <div v-else-if="validations.name.required && !validations.name.notExist">
            Tên thành phần đã tồn tại
          </div>
        </div>
      </div>
    </div>
    <!-- Giá -->
    <div class="form-group" style="position:relative;">
      <vt-input
        v-model="price"
        class="mb-8"
        :max-length="MAX_LENGTH_INGREDIENT_PRICE"
        :class="{ error: validations.price.anyError() }"
        @blur="onPriceBlur"
      >
        <template #label>
          <span class="required">Giá</span>
        </template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.price.validated">
          <div v-if="!validations.price.require">
            Giá bắt buộc nhập
          </div>
        </div>
      </div>
      <div v-if="price > 0" style="position:absolute;top:18px;right:10px;">
        <el-col class="label" style="margin-bottom: 20px;"><el-tag type="primary">{{ price | moneyFilter }}</el-tag></el-col>
      </div>
    </div>
    <!-- Giá hiển thị -->
    <div class="form-group">
      <vt-input
        v-model="displayPrice"
        class="mb-8"
        :max-length="MAX_LENGTH_INGREDIENT_DISPLAY_PRICE"
      >
        <template #label>
          <span>Giá hiển thị</span>
        </template>
      </vt-input>
    </div>
    <!-- Đơn vị giá hiển thị -->
    <div class="form-group">
      <vt-input
        v-model="displayPriceUnit"
        class="mb-8"
        :max-length="MAX_LENGTH_INGREDIENT_DISPLAY_PRICE_UNIT"
      >
        <template #label>
          <span>Đơn vị giá hiển thị</span>
        </template>
      </vt-input>
    </div>
    <div class="text-right btn-wrapper mb-24">
      <el-button type="primary" plain size="medium" @click="onCloseForm">Đóng</el-button>
      <el-button
        type="primary"
        size="medium"
        :loading="loading"
        :disabled="!isFormValid"
        @click="onSubmitForm"
      >Lưu</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {
  MAX_LENGTH_INGREDIENT_NAME,
  MAX_LENGTH_INGREDIENT_PRICE,
  MAX_LENGTH_INGREDIENT_DISPLAY_PRICE,
  MAX_LENGTH_INGREDIENT_DISPLAY_PRICE_UNIT
} from '@/utils/constants/constraint'
import VtInput from '@/components/VtInput/index.vue'
import FixSelect from '@/components/Select/fix.vue'
import { ACTION, FIELD } from '@/utils/constant'
import { createSuccessNotify, formatVndMoney } from '@/utils/common'
import { mapState } from 'vuex'
import { INGREDIENT_NAME_TAKEN } from '@/utils/constants/error'
import { pick } from 'lodash'

@Component({
  components: {
    VtInput,
    FixSelect
  },
  computed: {
    ...mapState({
      loading: (state: any) => state.ingredient.ui.commandLoading
    })
  },
  filters: {
    moneyFilter(value) { return formatVndMoney(Number(value)) }
  }
})
export default class Form extends Vue {
  MAX_LENGTH_INGREDIENT_NAME = MAX_LENGTH_INGREDIENT_NAME
  MAX_LENGTH_INGREDIENT_PRICE = MAX_LENGTH_INGREDIENT_PRICE
  MAX_LENGTH_INGREDIENT_DISPLAY_PRICE = MAX_LENGTH_INGREDIENT_DISPLAY_PRICE
  MAX_LENGTH_INGREDIENT_DISPLAY_PRICE_UNIT = MAX_LENGTH_INGREDIENT_DISPLAY_PRICE_UNIT

  INGREDIENT_NAME_TAKEN = INGREDIENT_NAME_TAKEN

  get name() { return this.$store.state.ingredient.form.name }
  set name(value) { this.$store.commit('ingredient/SET_FORM_NAME', value) }

  get price() { return this.$store.state.ingredient.form.price }
  set price(value) { this.$store.commit('ingredient/SET_FORM_PRICE', value) }

  get displayPrice() { return this.$store.state.ingredient.form.displayPrice }
  set displayPrice(value) { this.$store.commit('ingredient/SET_FORM_DISPLAY_PRICE', value) }

  get displayPriceUnit() { return this.$store.state.ingredient.form.displayPriceUnit }
  set displayPriceUnit(value) { this.$store.commit('ingredient/SET_FORM_DISPLAY_PRICE_UNIT', value) }

  get isFormValid(): boolean {
    return this.validations.name.require &&
      this.validations.name.notExist &&
      this.validations.price.require
  }

  validations = {
    name: {
      require: true,
      validated: false,
      notExist: true,
      anyError() {
        return !this.require || !this.notExist
      }
    },
    price: {
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

  onPriceBlur() {
    const price = this.price
    this.validations.price.validated = true
    if (price) {
      this.validations.price.require = true
    } else {
      this.validations.price.require = false
    }
  }

  onCloseForm() {
    this.$emit('close-form')
  }

  async onSubmitForm() {
    try {
      const form = this.$store.state.ingredient.form
      const id = form.id
      if (!id) {
        await this.$store.dispatch('ingredient/upsert', pick(form, ['name', 'price', 'displayPrice', 'displayPriceUnit']))
      } else {
        await this.$store.dispatch('ingredient/upsert', pick(form, ['id', 'name', 'price', 'displayPrice', 'displayPriceUnit']))
      }
      createSuccessNotify(this, ACTION.SAVE, FIELD.INGREDIENT)
      this.$emit('saved')
    } catch (error) {
      if ((error as any).message === INGREDIENT_NAME_TAKEN) {
        this.validations.name.notExist = false
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
