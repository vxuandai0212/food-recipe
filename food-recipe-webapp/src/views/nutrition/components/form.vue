<template>
  <div>
    <!-- Tên chất dinh dưỡng -->
    <div class="form-group">
      <vt-input
        v-model="name"
        class="mb-8"
        :max-length="MAX_LENGTH_NUTRITION_NAME"
        :class="{ error: validations.name.anyError() }"
        @blur="onNameBlur"
      >
        <template #label>
          <span class="required">Tên chất dinh dưỡng</span>
        </template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.name.validated">
          <div v-if="!validations.name.require">
            Tên chất dinh dưỡng bắt buộc nhập
          </div>
          <div v-else-if="validations.name.required && !validations.name.notExist">
            Tên chất dinh dưỡng đã tồn tại
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
  MAX_LENGTH_NUTRITION_NAME
} from '@/utils/constants/constraint'
import VtInput from '@/components/VtInput/index.vue'
import { ACTION, FIELD } from '@/utils/constant'
import { createSuccessNotify } from '@/utils/common'
import { mapState } from 'vuex'
import { NUTRITION_NAME_TAKEN } from '@/utils/constants/error'
import { pick } from 'lodash'

@Component({
  components: {
    VtInput
  },
  computed: {
    ...mapState({
      loading: (state: any) => state.nutrition.ui.commandLoading
    })
  }
})
export default class Form extends Vue {
  MAX_LENGTH_NUTRITION_NAME = MAX_LENGTH_NUTRITION_NAME
  NUTRITION_NAME_TAKEN = NUTRITION_NAME_TAKEN

  get name() { return this.$store.state.nutrition.form.name }
  set name(value) { this.$store.commit('nutrition/SET_FORM_NAME', value) }

  get isFormValid(): boolean {
    return this.validations.name.require &&
      this.validations.name.notExist
  }

  validations = {
    name: {
      require: true,
      validated: false,
      notExist: true,
      anyError() {
        return !this.require || !this.notExist
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

  onCloseForm() {
    this.$emit('close-form')
  }

  async onSubmitForm() {
    try {
      const form = this.$store.state.nutrition.form
      const id = form.id
      if (!id) {
        await this.$store.dispatch('nutrition/upsert', pick(form, ['name']))
      } else {
        await this.$store.dispatch('nutrition/upsert', pick(form, ['id', 'name']))
      }
      createSuccessNotify(this, ACTION.SAVE, FIELD.UNIT)
      this.$emit('saved')
    } catch (error) {
      if ((error as any).message === NUTRITION_NAME_TAKEN) {
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
