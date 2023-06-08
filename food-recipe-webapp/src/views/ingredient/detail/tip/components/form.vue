<template>
  <div>
    <!-- Nội dung -->
    <div class="form-group">
      <vt-textarea
        v-model="description"
        class="mb-8"
        :max-length="MAX_LENGTH_INGREDIENT_INFO_DESCRIPTION"
        :class="{ error: validations.description.anyError() }"
        @blur="onDescriptionBlur"
      >
        <template #label>
          <span class="required">Nội dung</span>
        </template>
      </vt-textarea>
      <div class="form-error">
        <div v-if="validations.description.validated">
          <div v-if="!validations.description.require">
            Nội dung bắt buộc nhập
          </div>
        </div>
      </div>
    </div>
    <!-- Loại -->
    <div class="form-group mb-4">
      <fix-select
        placeholder="Chọn loại mẹo"
        :options="options"
        value-path="ingredientInfo.form.type"
        set-value-command="ingredientInfo/SET_FORM_TYPE"
      />
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
  MAX_LENGTH_INGREDIENT_INFO_DESCRIPTION
} from '@/utils/constants/constraint'
import VtTextarea from '@/components/VtTextarea/index.vue'
import { ACTION, FIELD } from '@/utils/constant'
import { createSuccessNotify } from '@/utils/common'
import { mapState } from 'vuex'
import { pick } from 'lodash'
import { INGREDIENT_INFO_TIP_TYPE_OPTIONS } from '@/utils/constants/ingredient'
import FixSelect from '@/components/Select/fix.vue'

@Component({
  components: {
    VtTextarea,
    FixSelect
  },
  computed: {
    ...mapState({
      loading: (state: any) => state.ingredientInfo.ui.commandLoading
    })
  }
})
export default class Form extends Vue {
  MAX_LENGTH_INGREDIENT_INFO_DESCRIPTION = MAX_LENGTH_INGREDIENT_INFO_DESCRIPTION

  get ingredientId() { return this.$route.params.ingredientId }

  get description() { return this.$store.state.ingredientInfo.form.description }
  set description(value) { this.$store.commit('ingredientInfo/SET_FORM_DESCRIPTION', value) }

  get options() {
    return INGREDIENT_INFO_TIP_TYPE_OPTIONS
  }

  get isFormValid(): boolean {
    return this.validations.description.require
  }

  validations = {
    description: {
      require: true,
      validated: false,
      anyError() {
        return !this.require
      }
    }
  }

  onDescriptionBlur() {
    const description = this.description
    this.validations.description.validated = true
    if (description) {
      this.validations.description.require = true
    } else {
      this.validations.description.require = false
    }
  }

  onCloseForm() {
    this.$emit('close-form')
  }

  async onSubmitForm() {
    try {
      const form = this.$store.state.ingredientInfo.form
      form.ingredientId = this.ingredientId
      const id = form.id
      if (!id) {
        await this.$store.dispatch('ingredientInfo/upsert', pick(form, ['ingredientId', 'description', 'type']))
      } else {
        await this.$store.dispatch('ingredientInfo/upsert', pick(form, ['id', 'ingredientId', 'description', 'type']))
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
