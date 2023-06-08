<template>
  <div v-loading="containerLoading">
    <el-col :span="24">
      <el-col :span="24">
        <el-col :span="4"><span>Dịp chế biến</span></el-col>
        <el-col :span="20">
          <add-resource-button v-if="!showKeywordForm" @click="showKeywordForm = true" />
          <template v-else>
            <el-col :span="20">
              <remote-select
                :placeholder="remoteSelectPlaceholder"
                :value-path="remoteSelectValuePath"
                :set-value-command="remoteSelectSetValueCommand"
                :options="remoteSelectOptions"
                :allow-create="true"
                value-key="label"
                @search="remoteSelectSearch"
                @on-change="onChangeCookEvent"
              />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" plain style="margin-left:8px;" @click="showKeywordForm = false">Huỷ</el-button>
            </el-col>
          </template>
        </el-col>
      </el-col>
      <el-col :span="24" style="margin-top:20px;">
        <el-tag v-for="event in events" :key="event.id" style="margin-right:8px;" closable @close="removeEvent(event.id)">
          {{ event.name }}
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
      containerLoading: (state: any) => state.recipeCookEvent.ui.containerLoading,
      events: (state: any) => state.recipeCookEvent.list.items
    })
  }
})
export default class List extends Vue {
  remoteSelectPlaceholder = 'Nhập tên dịp'

  remoteSelectValuePath = 'recipeCookEvent.form.cookEventName'

  remoteSelectSetValueCommand = 'recipeCookEvent/SET_FORM_COOK_EVENT_NAME'

  get remoteSelectOptions() {
    return this.$store.state.cookEvent.list.items.map((i: any) => ({ label: i.name, key: i.id, value: i.name }))
  }

  remoteSelectSearch(value) {
    this.$store.commit('cookEvent/SET_LIST_QUERY_PAGE', 1)
    this.$store.commit('cookEvent/SET_LIST_QUERY_LIMIT', 20)
    this.$store.commit('cookEvent/SET_LIST_QUERY_SEARCH_KEYWORD', value)
    this.$store.dispatch('cookEvent/getAllItem')
  }

  showKeywordForm = false

  get recipeId() { return this.$route.params.recipeId }

  async created() { await this.resetFilterAndGetAll() }

  getAllItem() {
    this.$store.commit('recipeCookEvent/SET_LIST_QUERY_RECIPE_ID', this.recipeId)
    this.$store.commit('recipeCookEvent/SET_UI_CONTAINER_LOADING', true)
    this.$store.dispatch('recipeCookEvent/getAllItem').finally(() => {
      setTimeout(() => {
        this.$store.commit('recipeCookEvent/SET_UI_CONTAINER_LOADING', false)
      }, 1000)
    })
  }

  resetFilterAndGetAll() {
    this.$store.commit('recipeCookEvent/RESET_LIST_QUERY')
    this.getAllItem()
  }

  async removeEvent(id) {
    await this.$store.dispatch('recipeCookEvent/delete', id)
    await this.getAllItem()
  }

  async onChangeCookEvent(value) {
    await this.$store.dispatch('recipeCookEvent/upsert', { recipeId: this.recipeId, cookEventName: value })
    await this.getAllItem()
  }
}
</script>
<style lang="scss"></style>
