<template>
  <div>
    <!-- Tên công thức -->
    <div class="form-group">
      <vt-input
        v-model="name"
        class="mb-8"
        :max-length="MAX_LENGTH_RECIPE_NAME"
        :class="{ error: validations.name.anyError() }"
        @blur="onNameBlur"
      >
        <template #label><span class="required">Tên công thức</span></template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.name.validated">
          <div v-if="!validations.name.require">Tên công thức bắt buộc nhập</div>
          <div v-else-if="validations.name.required && !validations.name.notExist">Tên công thức đã tồn tại</div>
        </div>
      </div>
    </div>
    <!-- Thời gian nấu -->
    <div class="form-group">
      <vt-input
        v-model.trim="cookTime"
        class="mb-8"
        :class="{ error: validations.cookTime.anyError() }"
        @blur="onCookTimeBlur"
      >
        <template #label><span class="required">Thời gian chế biến</span></template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.cookTime.validated">
          <div v-if="!validations.cookTime.require">
            Thời gian chế biến bắt buộc nhập
          </div>
          <div v-else-if="validations.cookTime.required && !validations.cookTime.onlyNumber">
            Chỉ được phép nhập số
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
  MAX_LENGTH_RECIPE_NAME
} from '@/utils/constants/constraint'
import VtInput from '@/components/VtInput/index.vue'
import { ACTION, FIELD } from '@/utils/constant'
import { createSuccessNotify } from '@/utils/common'
import { mapState } from 'vuex'
import { RECIPE_NAME_TAKEN } from '@/utils/constants/error'
import { pick } from 'lodash'
@Component({
  components: {
    VtInput
  },
  computed: {
    ...mapState({
      loading: (state: any) => state.recipe.ui.commandLoading
    })
  }
})
export default class Form extends Vue {
  RECIPE_NAME_TAKEN = RECIPE_NAME_TAKEN
  MAX_LENGTH_RECIPE_NAME = MAX_LENGTH_RECIPE_NAME

  get name() { return this.$store.state.recipe.form.name }
  set name(value) { this.$store.commit('recipe/SET_FORM_NAME', value) }

  get cookTime() { return this.$store.state.recipe.form.cookTime }
  set cookTime(value) { this.$store.commit('recipe/SET_FORM_COOK_TIME', value) }

  get isFormValid(): boolean {
    return this.validations.name.require &&
      this.validations.name.notExist &&
      this.validations.cookTime.require
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
    cookTime: {
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

  onCookTimeBlur() {
    const cookTime = this.cookTime
    this.validations.cookTime.validated = true
    if (cookTime) {
      this.validations.cookTime.require = true
    } else {
      this.validations.cookTime.require = false
    }
  }

  onCloseForm() {
    this.$emit('close-form')
  }

  async onSubmitForm() {
    try {
      const form = this.$store.state.recipe.form
      const id = form.id
      if (!id) {
        await this.$store.dispatch('recipe/upsert', pick(form, ['name', 'cookTime']))
      } else {
        await this.$store.dispatch('recipe/upsert', pick(form, ['id', 'name', 'cookTime']))
      }
      createSuccessNotify(this, ACTION.SAVE, FIELD.RECIPE)
      this.$emit('saved')
    } catch (error) {
      if ((error as any).message === RECIPE_NAME_TAKEN) {
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
