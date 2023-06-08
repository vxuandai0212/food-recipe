<template>
  <div v-if="!containerLoading">
    <info />
    <el-divider />
    <thumbnail />
  </div>
  <div v-else :v-loading="true" />
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BackToPrevious from '@/components/BackToPrevious/index.vue'
import PageTitle from '@/components/PageTitle/index.vue'
import { mapState } from 'vuex'
import Card from '@/components/Card/common.vue'
import Info from '@/views/ingredient/detail/info/components/info.vue'
import Thumbnail from '@/views/ingredient/detail/info/components/thumbnail.vue'
@Component({
  components: {
    BackToPrevious,
    PageTitle,
    Card,
    Info,
    Thumbnail
  },
  computed: {
    ...mapState({
      detail: (state: any) => state.ingredient.detail.item,
      containerLoading: (state: any) => state.ingredient.ui.containerLoading
    })
  }
})
export default class Detail extends Vue {
  get ingredientId() { return this.$route.params.ingredientId }

  async created() {
    await this.getIngredient()
  }

  getIngredient() {
    this.$store.commit('ingredient/SET_UI_CONTAINER_LOADING', true)
    this.$store.dispatch('ingredient/getDetailItem', this.ingredientId).finally(() => {
      setTimeout(() => {
        this.$store.commit('ingredient/SET_UI_CONTAINER_LOADING', false)
      }, 1000)
    })
  }
}
</script>
<style lang="scss"></style>
