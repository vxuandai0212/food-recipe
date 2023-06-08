<template>
  <main-section :title="title">
    <template #header>
      <el-row :gutter="20">
        <el-col :span="18">
          <search-input
            :value="searchKeyword"
            class="__search_input__"
            :max-length="MAX_LENGTH_FT_POST_TITLE"
            :placeholder="searchPlaceholder"
            @input="onInputSearchKeyword"
            @submit="onSearchKeyword"
          />
        </el-col>
        <el-col :span="6">
          <add-resource-button
            :text="addBtnTitle"
            @click="addPost"
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
import TableComp from '@/views/fancythings/post/list/components/table.vue'
import PaginationComp from '@/views/fancythings/post/list/components/pagination.vue'
import DeleteDialog from '@/views/fancythings/post/list/components/delete-dialog.vue'
import { mapState } from 'vuex'
import { MAX_LENGTH_FT_POST_TITLE } from '@/utils/constants/constraint'
import { FT_POST } from '@/utils/constants/route'
import { SAMPLE_DATA } from '@/views/fancythings/post/detail/components/editor-js/sample'
@Component({
  components: {
    SearchInput,
    AddResourceButton,
    EmptyTable,
    MainSection,
    TableComp,
    PaginationComp,
    DeleteDialog
  },
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.ftPost.ui.containerLoading,
      listLoading: (state: any) => state.ftPost.ui.listLoading,
      items: (state: any) => state.ftPost.list.items,
      item: (state: any) => state.ftPost.detail.item,
      total: (state: any) => state.ftPost.list.total,
      searchKeyword: (state: any) => state.ftPost.list.query.searchKeyword
    })
  }
})
export default class List extends Vue {
  MAX_LENGTH_FT_POST_TITLE = MAX_LENGTH_FT_POST_TITLE

  hasItem() { return (this as any).total > 0 }

  get title() { return 'Bài viết' }

  get searchPlaceholder() { return 'Nhập tên bài viết' }

  get emptyTableMessage() { return 'Không có bài viết nào' }

  get addBtnTitle() { return 'Thêm bài viết' }

  async created() { await this.resetFilterAndGetAll() }

  async getAllItem() {
    await this.$store.commit('ftPost/SET_UI_CONTAINER_LOADING', true)
    await this.$store.dispatch('ftPost/getAllItem')
    await this.$store.commit('ftPost/SET_UI_CONTAINER_LOADING', false)
  }

  async onSearchKeyword() {
    await this.$store.commit('ftPost/SET_LIST_QUERY_PAGE', 1)
    await this.$store.commit('ftPost/SET_LIST_QUERY_LIMIT', 10)
    await this.getAllItem()
  }

  async resetFilterAndGetAll() {
    await this.$store.commit('ftPost/RESET_LIST_QUERY')
    await this.getAllItem()
  }

  async onInputSearchKeyword(value) {
    await this.$store.commit('ftPost/SET_LIST_QUERY_SEARCH_KEYWORD', value)
  }

  async addPost() {
    await this.$store.dispatch('ftPost/upsert', { title: 'New Article', rawContent: JSON.stringify(SAMPLE_DATA) }).then(res => {
      if (res && res.data && res.data.id) {
        this.$router.push({ name: FT_POST.DETAIL.NAME, params: { postId: res.data.id }})
      }
    })
  }
}
</script>
<style lang="scss"></style>
