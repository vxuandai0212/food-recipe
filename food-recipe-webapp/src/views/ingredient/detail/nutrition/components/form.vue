<template>
  <div>
    <!-- Chất dinh dưỡng -->
    <div class="form-group mb-4">
      <fix-select
        placeholder="Chọn chất dinh dưỡng"
        :options="options"
        value-path="ingredientNutrition.form.nutritionId"
        set-value-command="ingredientNutrition/SET_FORM_NUTRITION_ID"
        :filterable="true"
      />
    </div>
    <!-- Giá trị -->
    <div class="form-group">
      <vt-input
        v-model="nutritionValue"
        class="mb-8"
        :max-length="MAX_LENGTH_NUTRITION_VALUE"
        :class="{ error: validations.nutritionValue.anyError() }"
        @blur="onNutritionValueBlur"
      >
        <template #label>
          <span class="required">Giá trị</span>
        </template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.nutritionValue.validated">
          <div v-if="!validations.nutritionValue.require">
            Giá trị chất dinh dưỡng bắt buộc nhập
          </div>
        </div>
      </div>
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
  MAX_LENGTH_NUTRITION_VALUE
} from '@/utils/constants/constraint'
import VtInput from '@/components/VtInput/index.vue'
import FixSelect from '@/components/Select/fix.vue'
import { ACTION, FIELD } from '@/utils/constant'
import { createSuccessNotify } from '@/utils/common'
import { mapState } from 'vuex'
import { pick } from 'lodash'

@Component({
  components: {
    VtInput,
    FixSelect
  },
  computed: {
    ...mapState({
      loading: (state: any) => state.ingredientNutrition.ui.commandLoading,
      options: (state: any) => state.nutrition.list.items.map(({ id, name }) => ({ label: name, key: id, value: id }))
    })
  }
})
export default class Form extends Vue {
  MAX_LENGTH_NUTRITION_VALUE = MAX_LENGTH_NUTRITION_VALUE

  get ingredientId() { return this.$route.params.ingredientId }

  get nutritionValue() { return this.$store.state.ingredientNutrition.form.nutritionValue }
  set nutritionValue(value) { this.$store.commit('ingredientNutrition/SET_FORM_NUTRITION_VALUE', value) }

  get isFormValid(): boolean {
    return this.validations.nutritionValue.require
  }

  validations = {
    nutritionValue: {
      require: true,
      validated: false,
      anyError() {
        return !this.require
      }
    }
  }

  onNutritionValueBlur() {
    const nutritionValue = this.nutritionValue
    this.validations.nutritionValue.validated = true
    if (nutritionValue) {
      this.validations.nutritionValue.require = true
    } else {
      this.validations.nutritionValue.require = false
    }
  }

  onCloseForm() {
    this.$emit('close-form')
  }

  async onSubmitForm() {
    try {
      const form = this.$store.state.ingredientNutrition.form
      form.ingredientId = this.ingredientId
      const id = form.id
      if (!id) {
        await this.$store.dispatch('ingredientNutrition/upsert', pick(form, ['ingredientId', 'nutritionId', 'nutritionValue']))
      } else {
        await this.$store.dispatch('ingredientNutrition/upsert', pick(form, ['id', 'ingredientId', 'nutritionId', 'nutritionValue']))
      }
      createSuccessNotify(this, ACTION.SAVE, FIELD.NUTRITION)
      this.$emit('saved')
    } catch (error) {
      console.log(error)
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
