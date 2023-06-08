<template>
  <main-section :title="title">
    <template #header>
      <el-row :gutter="20">
        <el-col :span="18">
          <search-input
            :value="searchKeyword"
            class="__search_input__"
            :max-length="MAX_LENGTH_WEBSITE"
            :placeholder="searchPlaceholder"
            @input="onInputSearchKeyword"
            @submit="onSearchKeyword"
          />
        </el-col>
        <el-col :span="6">
          <add-resource-button :text="addBtnTitle" @click="openDialog" />
        </el-col>
      </el-row>
    </template>
    <template #main>
      <div v-loading="containerLoading">
        <empty-table v-if="!hasItem" style="margin-top: 100px;">
          <template #message>{{ message }}</template>
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
import TableComp from '@/views/ad/customer/list/components/table.vue'
import PaginationComp from '@/views/ad/customer/list/components/pagination.vue'
import FormDialog from '@/views/ad/customer/list/components/form-dialog.vue'
import DeleteDialog from '@/views/ad/customer/list/components/delete-dialog.vue'
import { mapState } from 'vuex'
import { MAX_LENGTH_WEBSITE } from '@/utils/constants/constraint'

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
      containerLoading: (state: any) => state.adCustomer.ui.containerLoading,
      listLoading: (state: any) => state.adCustomer.ui.listLoading,
      items: (state: any) => state.adCustomer.list.items,
      item: (state: any) => state.adCustomer.detail.item,
      total: (state: any) => state.adCustomer.list.total,
      searchKeyword: (state: any) => state.adCustomer.list.query.searchKeyword
    })
  }
})
export default class List extends Vue {
  MAX_LENGTH_WEBSITE = MAX_LENGTH_WEBSITE

  hasItem() {
    return (this as any).total > 0
  }

  get title() { return 'Khách hàng' }

  get searchPlaceholder() { return 'Tìm kiếm khách hàng' }

  get emptyTableMessage() { return 'Không có khách hàng nào' }

  get addBtnTitle() { return 'Thêm' }

  async created() { await this.resetFilterAndGetAll() }

  async getAllItem() {
    const vm = this
    this.$store.commit('adCustomer/SET_UI_CONTAINER_LOADING', true)
    this.$store.dispatch('adCustomer/getAllItem').finally(() => {
      setTimeout(() => {
        vm.$store.commit('adCustomer/SET_UI_CONTAINER_LOADING', false)
        vm.$store.commit('adCustomer/SET_UI_LIST_LOADING', false)
      }, 1000)
    })
  }

  onSearchKeyword() {
    this.$store.commit('adCustomer/SET_LIST_QUERY_PAGE', 1)
    this.$store.commit('adCustomer/SET_LIST_QUERY_LIMIT', 10)
    this.getAllItem()
  }

  resetFilterAndGetAll() {
    this.$store.commit('adCustomer/RESET_LIST_QUERY')
    this.getAllItem()
  }

  onInputSearchKeyword(value) {
    this.$store.commit('adCustomer/SET_LIST_QUERY_SEARCH_KEYWORD', value)
  }

  openDialog() {
    this.$store.commit('adCustomer/RESET_FORM')
    this.$store.commit('adCustomer/SET_UI_VISIBLE_FORM_DIALOG', true)
  }
}
</script>
<style lang="scss"></style>
