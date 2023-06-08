<template>
  <main-section :title="title">
    <template #header>
      <el-row :gutter="20">
        <el-col :span="18">
          <search-input
            :value="searchKeyword"
            class="__search_input__"
            :max-length="500"
            :placeholder="searchPlaceholder"
            @input="onInputSearchKeyword"
            @submit="onSearchKeyword"
          />
        </el-col>
        <el-col :span="6">
          <add-resource-button
            :text="addBtnTitle"
            @click="openDialog"
          />
        </el-col>
      </el-row>
    </template>
    <template #main>
      <div v-loading="containerLoading">
        <empty-table v-if="!hasItem" style="margin-top: 100px;">
          <template #message>
            {{ emptyTableMessage }}
          </template>
        </empty-table>
        <template v-else>
          <table-comp />
          <pagination-comp />
        </template>
        <form-dialog @on-saved="resetFilterAndGetAll" />
        <delete-dialog v-if="item" @confirm="resetFilterAndGetAll" />
      </div>
    </template>
  </main-section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SearchInput from '@/components/SearchInput/index.vue'
import AddResourceButton from '@/components/CommonButtons/AddResourceButton.vue'
import EmptyTable from '@/components/EmptyTable/index.vue'
import MainSection from '@/components/Main/index.vue'
import TableComp from '@/views/nutrition/components/table.vue'
import PaginationComp from '@/views/nutrition/components/pagination.vue'
import FormDialog from '@/views/nutrition/components/form-dialog.vue'
import DeleteDialog from '@/views/nutrition/components/delete-dialog.vue'
import { mapState } from 'vuex'

@Component({
  components: {
    SearchInput,
    AddResourceButton,
    EmptyTable,
    MainSection,
    TableComp,
    PaginationComp,
    FormDialog,
    DeleteDialog
  },
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.nutrition.ui.containerLoading,
      listLoading: (state: any) => state.nutrition.ui.listLoading,
      items: (state: any) => state.nutrition.list.items,
      item: (state: any) => state.nutrition.detail.item,
      total: (state: any) => state.nutrition.list.total,
      searchKeyword: (state: any) => state.nutrition.list.query.searchKeyword
    })
  }
})
export default class List extends Vue {
  hasItem() {
    return (this as any).total > 0
  }

  get title() { return 'Dinh dưỡng' }

  get searchPlaceholder() { return 'Nhập tên tên chất dinh dưỡng' }

  get emptyTableMessage() { return 'Không có tên chất dinh dưỡng nào' }

  get addBtnTitle() { return 'Thêm' }

  async created() { await this.resetFilterAndGetAll() }

  async getAllItem() {
    await this.$store.commit('nutrition/SET_UI_CONTAINER_LOADING', true)
    await this.$store.dispatch('nutrition/getAllItem')
    await this.$store.commit('nutrition/SET_UI_CONTAINER_LOADING', false)
  }

  async onSearchKeyword() {
    await this.$store.commit('nutrition/SET_LIST_QUERY_PAGE', 1)
    await this.$store.commit('nutrition/SET_LIST_QUERY_LIMIT', 10)
    await this.getAllItem()
  }

  async resetFilterAndGetAll() {
    await this.$store.commit('nutrition/RESET_LIST_QUERY')
    await this.getAllItem()
  }

  async onInputSearchKeyword(value) {
    await this.$store.commit('nutrition/SET_LIST_QUERY_SEARCH_KEYWORD', value)
  }

  async openDialog() {
    await this.$store.commit('nutrition/RESET_FORM')
    await this.$store.commit('nutrition/SET_UI_VISIBLE_FORM_DIALOG', true)
  }
}
</script>
<style lang="scss"></style>
