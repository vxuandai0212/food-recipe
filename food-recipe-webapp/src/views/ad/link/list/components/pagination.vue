<template>
  <pagination v-show="isShowPagination" :total="total" :page.sync="page" :limit.sync="limit" @pagination="getAll" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  components: { Pagination },
  computed: {
    ...mapState({
      total: (state: any) => Number(state.ad.list.total)
    })
  }
})
export default class PaginationComp extends Vue {
  get page() {
    return this.$store.state.ad.list.query.page
  }

  set page(value) {
    this.$store.commit('ad/SET_LIST_QUERY_PAGE', value)
  }

  get limit() {
    return this.$store.state.ad.list.query.limit
  }

  set limit(value) {
    this.$store.commit('ad/SET_LIST_QUERY_LIMIT', value)
  }

  get isShowPagination() {
    return (this as any).total > (this as any).limit
  }

  getAll() {
    this.$store.dispatch('ad/getAllItem')
  }
}
</script>
<style scoped></style>
