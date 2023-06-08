<template>
  <div>
    <div class="form-group">
      <remote-select
        :placeholder="remoteSelectPlaceholder"
        :value-path="remoteSelectValuePath"
        :set-value-command="remoteSelectSetValueCommand"
        :options="remoteSelectOptions"
        @search="remoteSelectSearch"
      />
    </div>
    <div class="text-right btn-wrapper mb-24">
      <el-button type="primary" plain size="medium" @click="onCloseForm">Đóng</el-button>
      <el-button type="primary" size="medium" @click="onSubmitForm">Lưu</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import RemoteSelect from '@/components/Select/remote.vue'
import { ACTION, FIELD } from '@/utils/constant'
import { createSuccessNotify } from '@/utils/common'
import { pick } from 'lodash'

@Component({
  components: { RemoteSelect }
})
export default class Form extends Vue {
  get recipeId() { return this.$route.params.recipeId }

  remoteSelectPlaceholder = 'Chọn quảng cáo'

  remoteSelectValuePath = 'adLocation.form.adId'

  remoteSelectSetValueCommand = 'adLocation/SET_FORM_AD_ID'

  get remoteSelectOptions() { return this.$store.state.ad.list.items.map((i: any) => ({ label: i.name, key: i.id, value: i.id })) }

  remoteSelectSearch(value) {
    this.$store.commit('ad/SET_LIST_QUERY_PAGE', 1)
    this.$store.commit('ad/SET_LIST_QUERY_LIMIT', 20)
    this.$store.commit('ad/SET_LIST_QUERY_SEARCH_KEYWORD', value)
    this.$store.dispatch('ad/getAllItem')
  }

  onCloseForm() { this.$emit('close-form') }

  async onSubmitForm() {
    try {
      const form = this.$store.state.adLocation.form
      form.recipeId = this.recipeId
      await this.$store.dispatch('adLocation/upsert', pick(form, ['recipeId', 'adId']))
      createSuccessNotify(this, ACTION.SAVE, FIELD.AD)
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
