<template>
  <div>
    <!-- Thành phần -->
    <div class="form-group mb-4">
      <remote-select
        placeholder="Chọn thành phần"
        :options="options"
        value-path="recipeIngredient.form.ingredientId"
        set-value-command="recipeIngredient/SET_FORM_INGREDIENT_ID"
        @search="searchIngredient"
      />
    </div>
    <!-- Khối lượng -->
    <div class="form-group">
      <vt-input
        v-model="quantity"
        class="mb-8"
        :max-length="MAX_LENGTH_INGREDIENT_QUANTITY"
        :class="{ error: validations.quantity.anyError() }"
        @blur="onQuantityBlur"
      >
        <template #label><span class="required">Khối lượng</span></template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.quantity.validated">
          <div v-if="!validations.quantity.require">
            Khối lượng bắt buộc nhập
          </div>
        </div>
      </div>
    </div>
    <!-- Khối lượng hiển thị -->
    <div class="form-group">
      <vt-input
        v-model="displayQuantity"
        class="mb-8"
        :max-length="MAX_LENGTH_DISPLAY_QUANTITY"
        :class="{ error: validations.displayQuantity.anyError() }"
        @blur="onDisplayQuantityBlur"
      >
        <template #label><span class="required">Khối lượng hiển thị</span></template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.displayQuantity.validated">
          <div v-if="!validations.displayQuantity.require">
            Khối lượng hiển thị bắt buộc nhập
          </div>
        </div>
      </div>
    </div>
    <!-- Đơn vị hiển thị -->
    <div class="form-group">
      <vt-input
        v-model="displayQuantityUnit"
        class="mb-8"
        :max-length="MAX_LENGTH_DISPLAY_QUANTITY_UNIT"
        :class="{ error: validations.displayQuantityUnit.anyError() }"
        @blur="onDisplayQuantityUnitBlur"
      >
        <template #label><span class="required">Đơn vị hiển thị</span></template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.displayQuantityUnit.validated">
          <div v-if="!validations.displayQuantityUnit.require">
            Đơn vị hiển thị bắt buộc nhập
          </div>
        </div>
      </div>
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
  MAX_LENGTH_INGREDIENT_QUANTITY,
  MAX_LENGTH_DISPLAY_QUANTITY,
  MAX_LENGTH_DISPLAY_QUANTITY_UNIT
} from '@/utils/constants/constraint'
import VtInput from '@/components/VtInput/index.vue'
import FixSelect from '@/components/Select/fix.vue'
import { ACTION, FIELD } from '@/utils/constant'
import { createSuccessNotify } from '@/utils/common'
import { mapState } from 'vuex'
import { pick } from 'lodash'
import RemoteSelect from '@/components/Select/remote.vue'

@Component({
  components: {
    VtInput,
    FixSelect,
    RemoteSelect
  },
  computed: {
    ...mapState({
      loading: (state: any) => state.recipeIngredient.ui.commandLoading,
      options: (state: any) => state.ingredient.list.items.map((i: any) => ({ label: i.name, key: i.id, value: i.id }))
    })
  }
})
export default class Form extends Vue {
  MAX_LENGTH_INGREDIENT_QUANTITY = MAX_LENGTH_INGREDIENT_QUANTITY
  MAX_LENGTH_DISPLAY_QUANTITY = MAX_LENGTH_DISPLAY_QUANTITY
  MAX_LENGTH_DISPLAY_QUANTITY_UNIT = MAX_LENGTH_DISPLAY_QUANTITY_UNIT

  get quantity() { return this.$store.state.recipeIngredient.form.quantity }
  set quantity(value) { this.$store.commit('recipeIngredient/SET_FORM_QUANTITY', value) }

  get displayQuantity() { return this.$store.state.recipeIngredient.form.displayQuantity }
  set displayQuantity(value) { this.$store.commit('recipeIngredient/SET_FORM_DISPLAY_QUANTITY', value) }

  get displayQuantityUnit() { return this.$store.state.recipeIngredient.form.displayQuantityUnit }
  set displayQuantityUnit(value) { this.$store.commit('recipeIngredient/SET_FORM_DISPLAY_QUANTITY_UNIT', value) }

  get isFormValid(): boolean {
    return this.validations.quantity.require &&
      this.validations.displayQuantity.require &&
      this.validations.displayQuantityUnit.require
  }

  validations = {
    quantity: {
      require: true,
      validated: false,
      anyError() {
        return !this.require
      }
    },
    displayQuantity: {
      require: true,
      validated: false,
      anyError() {
        return !this.require
      }
    },
    displayQuantityUnit: {
      require: true,
      validated: false,
      anyError() {
        return !this.require
      }
    }
  }

  onQuantityBlur() {
    const quantity = this.quantity
    this.validations.quantity.validated = true
    if (quantity) {
      this.validations.quantity.require = true
    } else {
      this.validations.quantity.require = false
    }
  }

  onDisplayQuantityBlur() {
    const displayQuantity = this.displayQuantity
    this.validations.displayQuantity.validated = true
    if (displayQuantity) {
      this.validations.displayQuantity.require = true
    } else {
      this.validations.displayQuantity.require = false
    }
  }

  onDisplayQuantityUnitBlur() {
    const displayQuantityUnit = this.displayQuantityUnit
    this.validations.displayQuantityUnit.validated = true
    if (displayQuantityUnit) {
      this.validations.displayQuantityUnit.require = true
    } else {
      this.validations.displayQuantityUnit.require = false
    }
  }

  onCloseForm() {
    this.$emit('close-form')
  }

  async onSubmitForm() {
    try {
      const form = this.$store.state.recipeIngredient.form
      const id = form.id
      const recipeId = this.$route.params.recipeId
      form.recipeId = recipeId
      if (!id) {
        await this.$store.dispatch('recipeIngredient/upsert', pick(form, ['recipeId', 'ingredientId', 'quantity', 'displayQuantity', 'displayQuantityUnit']))
      } else {
        await this.$store.dispatch('recipeIngredient/upsert', pick(form, ['id', 'recipeId', 'ingredientId', 'quantity', 'displayQuantity', 'displayQuantityUnit']))
      }
      createSuccessNotify(this, ACTION.SAVE, FIELD.INGREDIENT)
      this.$emit('saved')
    } catch (error) {
      console.log(error)
    }
  }

  searchIngredient(value) {
    this.$store.commit('ingredient/SET_LIST_QUERY_PAGE', 1)
    this.$store.commit('ingredient/SET_LIST_QUERY_LIMIT', 20)
    this.$store.commit('ingredient/SET_LIST_QUERY_SEARCH_KEYWORD', value)
    this.$store.dispatch('ingredient/getAllItem')
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
