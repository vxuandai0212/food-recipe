<template>
  <main-section :title="title">
    <template #header>
      <el-row :gutter="20">
        <el-col :span="24">
          <search-input
            :value="searchKeyword"
            class="__search_input__"
            :max-length="MAX_LENGTH_LINK"
            :placeholder="searchPlaceholder"
            @input="onInputSearchKeyword"
            @submit="onSearchKeyword"
          />
        </el-col>
      </el-row>
    </template>
    <template #main>
      <div v-loading="containerLoading">
        <table-comp />
        <pagination-comp />
      </div>
      <form-dialog @on-saved="resetFilterAndGetAll" />
      <delete-dialog v-if="item" @confirm="resetFilterAndGetAll" />
    </template>
  </main-section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SearchInput from '@/components/SearchInput/index.vue'
import MainSection from '@/components/Main/index.vue'
import TableComp from '@/views/ad/link/list/components/table.vue'
import PaginationComp from '@/views/ad/link/list/components/pagination.vue'
import FormDialog from '@/views/ad/link/list/components/form-dialog.vue'
import DeleteDialog from '@/views/ad/link/list/components/delete-dialog.vue'
import { mapState } from 'vuex'
import { MAX_LENGTH_LINK } from '@/utils/constants/constraint'

@Component({
  components: {
    SearchInput,
    MainSection,
    TableComp,
    PaginationComp,
    FormDialog,
    DeleteDialog
  },
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.ad.ui.containerLoading,
      items: (state: any) => state.ad.list.items,
      item: (state: any) => state.ad.detail.item,
      total: (state: any) => state.ad.list.total,
      searchKeyword: (state: any) => state.ad.list.query.searchKeyword
    })
  }
})
export default class List extends Vue {
  MAX_LENGTH_LINK = MAX_LENGTH_LINK

  get title() { return 'Quảng cáo' }

  get searchPlaceholder() { return 'Tìm kiếm quảng cáo' }

  async created() { await this.resetFilterAndGetAll() }

  async getAllItem() {
    await this.$store.commit('ad/SET_UI_CONTAINER_LOADING', true)
    await this.$store.dispatch('ad/getAllItem')
    await this.$store.commit('ad/SET_UI_CONTAINER_LOADING', false)
  }

  async onSearchKeyword() {
    await this.$store.commit('ad/SET_LIST_QUERY_PAGE', 1)
    await this.$store.commit('ad/SET_LIST_QUERY_LIMIT', 10)
    await this.getAllItem()
  }

  async resetFilterAndGetAll() {
    await this.$store.commit('ad/RESET_LIST_QUERY')
    await this.getAllItem()
  }

  async onInputSearchKeyword(value) {
    await this.$store.commit('ad/SET_LIST_QUERY_SEARCH_KEYWORD', value)
  }
}
</script>
<style lang="scss"></style>
