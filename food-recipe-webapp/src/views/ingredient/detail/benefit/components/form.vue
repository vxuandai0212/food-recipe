<template>
  <div>
    <!-- Tiêu đề -->
    <div class="form-group">
      <vt-input
        v-model="title"
        class="mb-8"
        :max-length="MAX_LENGTH_INGREDIENT_INFO_TITLE"
        :class="{ error: validations.title.anyError() }"
        @blur="onTitleBlur"
      >
        <template #label>
          <span class="required">Tiêu đề</span>
        </template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.title.validated">
          <div v-if="!validations.title.require">
            Tiêu đề bắt buộc nhập
          </div>
        </div>
      </div>
    </div>
    <!-- Nội dung -->
    <div class="form-group">
      <vt-textarea
        v-model="description"
        class="mb-8"
        :max-length="MAX_LENGTH_INGREDIENT_INFO_DESCRIPTION"
      >
        <template #label>
          <span>Nội dung</span>
        </template>
      </vt-textarea>
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
  MAX_LENGTH_INGREDIENT_INFO_TITLE,
  MAX_LENGTH_INGREDIENT_INFO_DESCRIPTION
} from '@/utils/constants/constraint'
import VtInput from '@/components/VtInput/index.vue'
import VtTextarea from '@/components/VtTextarea/index.vue'
import { ACTION, FIELD } from '@/utils/constant'
import { createSuccessNotify } from '@/utils/common'
import { mapState } from 'vuex'
import { pick } from 'lodash'
import { INGREDIENT_INFO_TYPE } from '@/utils/constants/ingredient'

@Component({
  components: {
    VtInput,
    VtTextarea
  },
  computed: {
    ...mapState({
      loading: (state: any) => state.ingredientInfo.ui.commandLoading
    })
  }
})
export default class Form extends Vue {
  MAX_LENGTH_INGREDIENT_INFO_TITLE = MAX_LENGTH_INGREDIENT_INFO_TITLE
  MAX_LENGTH_INGREDIENT_INFO_DESCRIPTION = MAX_LENGTH_INGREDIENT_INFO_DESCRIPTION

  get ingredientId() { return this.$route.params.ingredientId }

  get title() { return this.$store.state.ingredientInfo.form.title }
  set title(value) { this.$store.commit('ingredientInfo/SET_FORM_TITLE', value) }

  get description() { return this.$store.state.ingredientInfo.form.description }
  set description(value) { this.$store.commit('ingredientInfo/SET_FORM_DESCRIPTION', value) }

  get isFormValid(): boolean {
    return this.validations.title.require
  }

  validations = {
    title: {
      require: true,
      validated: false,
      anyError() {
        return !this.require
      }
    }
  }

  onTitleBlur() {
    const title = this.title
    this.validations.title.validated = true
    if (title) {
      this.validations.title.require = true
    } else {
      this.validations.title.require = false
    }
  }

  onCloseForm() {
    this.$emit('close-form')
  }

  async onSubmitForm() {
    try {
      const form = this.$store.state.ingredientInfo.form
      form.ingredientId = this.ingredientId
      form.type = INGREDIENT_INFO_TYPE.BENEFIT
      const id = form.id
      if (!id) {
        await this.$store.dispatch('ingredientInfo/upsert', pick(form, ['ingredientId', 'title', 'description', 'type']))
      } else {
        await this.$store.dispatch('ingredientInfo/upsert', pick(form, ['id', 'ingredientId', 'title', 'description', 'type']))
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
