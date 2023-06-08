<template>
  <div v-loading="containerLoading">
    <el-col :span="24">
      <el-col :span="24" style="margin-bottom:10px;">
        <add-resource-button v-if="!showKeywordForm" :text="addBtnTitle" @click="showKeywordForm = true" />
        <template v-else>
          <el-col :span="14">
            <remote-select
              :placeholder="remoteSelectPlaceholder"
              :value-path="remoteSelectValuePath"
              :set-value-command="remoteSelectSetValueCommand"
              :options="remoteSelectOptions"
              :allow-create="true"
              value-key="label"
              @search="remoteSelectSearch"
              @on-change="onChangeKeyword"
            />
          </el-col>
          <el-col :span="10">
            <el-button type="primary" plain style="margin-left:8px;" @click="showKeywordForm = false">Huỷ</el-button>
          </el-col>
        </template>
      </el-col>
      <el-col :span="24">
        <el-tag v-for="keyword in keywords" :key="keyword.id" style="margin-right:8px;" closable @close="removeKeyword(keyword.id)">
          {{ keyword.name }}
        </el-tag>
      </el-col>
    </el-col>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import AddResourceButton from '@/components/CommonButtons/AddResourceButton.vue'
import RemoteSelect from '@/components/Select/remote.vue'

@Component({
  components: {
    AddResourceButton,
    RemoteSelect
  },
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.recipeKeyword.ui.containerLoading,
      keywords: (state: any) => state.recipeKeyword.list.items
    })
  }
})
export default class List extends Vue {
  addBtnTitle = 'Thêm từ khoá'

  remoteSelectPlaceholder = 'Nhập từ khoá'

  remoteSelectValuePath = 'recipeKeyword.form.keywordId'

  remoteSelectSetValueCommand = 'recipeKeyword/SET_FORM_KEYWORD_NAME'

  get remoteSelectOptions() { return this.$store.state.keyword.list.items.map((i: any) => ({ label: i.name, key: i.id, value: i.name })) }

  async remoteSelectSearch(value) {
    await this.$store.commit('keyword/SET_LIST_QUERY_PAGE', 1)
    await this.$store.commit('keyword/SET_LIST_QUERY_LIMIT', 20)
    await this.$store.commit('keyword/SET_LIST_QUERY_SEARCH_KEYWORD', value)
    await this.$store.dispatch('keyword/getAllItem')
  }

  showKeywordForm = false

  get recipeId() { return this.$route.params.recipeId }

  async created() { await this.resetFilterAndGetAll() }

  async getAllItem() {
    await this.$store.commit('recipeKeyword/SET_LIST_QUERY_RECIPE_ID', this.recipeId)
    await this.$store.commit('recipeKeyword/SET_UI_CONTAINER_LOADING', true)
    await this.$store.dispatch('recipeKeyword/getAllItem')
    await this.$store.commit('recipeKeyword/SET_UI_CONTAINER_LOADING', false)
  }

  async resetFilterAndGetAll() {
    await this.$store.commit('recipeKeyword/RESET_LIST_QUERY')
    await this.getAllItem()
  }

  async removeKeyword(id) {
    await this.$store.dispatch('recipeKeyword/delete', id)
    await this.getAllItem()
  }

  async onChangeKeyword(value) {
    await this.$store.dispatch('recipeKeyword/upsert', { recipeId: this.recipeId, keywordName: value })
    await this.getAllItem()
  }
}
</script>
<style lang="scss"></style>
