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
import TableComp from '@/views/storage/components/table.vue'
import PaginationComp from '@/views/storage/components/pagination.vue'
import FormDialog from '@/views/storage/components/form-dialog.vue'
import DeleteDialog from '@/views/storage/components/delete-dialog.vue'
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
      containerLoading: (state: any) => state.storage.ui.containerLoading,
      listLoading: (state: any) => state.storage.ui.listLoading,
      items: (state: any) => state.storage.list.items,
      item: (state: any) => state.storage.detail.item,
      total: (state: any) => state.storage.list.total,
      searchKeyword: (state: any) => state.storage.list.query.searchKeyword
    })
  }
})
export default class List extends Vue {
  firstFetchTotal = 0

  hasItem() {
    return (this as any).total > 0
  }

  get title() { return 'Lưu trữ' }

  get searchPlaceholder() { return 'Nhập tên cloud, api key hoặc api secret' }

  get emptyTableMessage() { return 'Không có nơi lưu trữ nào' }

  get addBtnTitle() { return 'Thêm' }

  created() {
    this.resetFilterAndGetAll()
  }

  getAllItem() {
    this.$store.commit('storage/SET_UI_CONTAINER_LOADING', true)
    this.$store.dispatch('storage/getAllItem').finally(() => {
      setTimeout(() => {
        this.$store.commit('storage/SET_UI_CONTAINER_LOADING', false)
      }, 1000)
    })
    this.firstFetchTotal++;
  }

  onSearchKeyword() {
    this.$store.commit('storage/SET_LIST_QUERY_PAGE', 1)
    this.$store.commit('storage/SET_LIST_QUERY_LIMIT', 10)
    this.getAllItem()
  }

  resetFilterAndGetAll() {
    this.$store.commit('storage/RESET_LIST_QUERY')
    this.getAllItem()
  }

  onInputSearchKeyword(value) {
    this.$store.commit('storage/SET_LIST_QUERY_SEARCH_KEYWORD', value)
  }

  openDialog() {
    this.$store.commit('storage/RESET_FORM')
    this.$store.commit('storage/SET_UI_VISIBLE_FORM_DIALOG', true)
  }
}
</script>
<style lang="scss"></style>
