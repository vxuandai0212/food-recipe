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
import TableComp from '@/views/event/components/table.vue'
import PaginationComp from '@/views/event/components/pagination.vue'
import FormDialog from '@/views/event/components/form-dialog.vue'
import DeleteDialog from '@/views/event/components/delete-dialog.vue'
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
      containerLoading: (state: any) => state.cookEvent.ui.containerLoading,
      listLoading: (state: any) => state.cookEvent.ui.listLoading,
      items: (state: any) => state.cookEvent.list.items,
      item: (state: any) => state.cookEvent.detail.item,
      total: (state: any) => state.cookEvent.list.total,
      searchKeyword: (state: any) => state.cookEvent.list.query.searchKeyword
    })
  }
})
export default class List extends Vue {
  firstFetchTotal = 0

  hasItem() {
    return (this as any).total > 0
  }

  get title() { return 'Dịp' }

  get searchPlaceholder() { return 'Nhập tên dịp' }

  get emptyTableMessage() { return 'Không có dịp nấu ăn nào' }

  get addBtnTitle() { return 'Thêm dịp' }

  created() {
    this.resetFilterAndGetAll()
  }

  getAllItem() {
    this.$store.commit('cookEvent/SET_UI_CONTAINER_LOADING', true)
    this.$store.dispatch('cookEvent/getAllItem').finally(() => {
      setTimeout(() => {
        this.$store.commit('cookEvent/SET_UI_CONTAINER_LOADING', false)
      }, 1000)
    })
    this.firstFetchTotal++;
  }

  onSearchKeyword() {
    this.$store.commit('cookEvent/SET_LIST_QUERY_PAGE', 1)
    this.$store.commit('cookEvent/SET_LIST_QUERY_LIMIT', 10)
    this.getAllItem()
  }

  resetFilterAndGetAll() {
    this.$store.commit('cookEvent/RESET_LIST_QUERY')
    this.getAllItem()
  }

  onInputSearchKeyword(value) {
    this.$store.commit('cookEvent/SET_LIST_QUERY_SEARCH_KEYWORD', value)
  }

  openDialog() {
    this.$store.commit('cookEvent/RESET_FORM')
    this.$store.commit('cookEvent/SET_UI_VISIBLE_FORM_DIALOG', true)
  }
}
</script>
<style lang="scss"></style>
