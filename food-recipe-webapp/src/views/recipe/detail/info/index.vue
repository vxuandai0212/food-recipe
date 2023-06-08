<template>
  <div v-if="!containerLoading">
    <el-col :span="24"><info /></el-col>
    <el-col :span="24"><cook-event /></el-col>
    <el-col :span="24"><el-divider /></el-col>
    <el-col :span="24"> <thumbnail /></el-col>
  </div>
  <div v-else :v-loading="true" />
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import Info from '@/views/recipe/detail/info/components/info.vue'
import CookEvent from '@/views/recipe/detail/info/components/cook-event.vue'
import Thumbnail from '@/views/recipe/detail/info/components/thumbnail.vue'
@Component({
  components: {
    Info,
    CookEvent,
    Thumbnail
  },
  computed: {
    ...mapState({
      detail: (state: any) => state.recipe.detail.item,
      containerLoading: (state: any) => state.recipe.ui.containerLoading
    })
  }
})
export default class Detail extends Vue {
  get recipeId() { return this.$route.params.recipeId }

  async created() {
    await this.getRecipe()
  }

  async getRecipe() {
    await this.$store.commit('recipe/SET_UI_CONTAINER_LOADING', true)
    await this.$store.dispatch('recipe/getDetailItem', this.recipeId)
    await this.$store.commit('recipe/SET_UI_CONTAINER_LOADING', false)
  }
}
</script>
<style lang="scss"></style>
