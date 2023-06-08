<template>
  <div>
    <PageTitle>
      <BackToPrevious :text="backText" class="mb-18 d-inline-block" />
    </PageTitle>
    <card>
      <el-col :span="24">
        <el-col :span="24">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="Thông tin cơ bản" :name="RECIPE.INFO.NAME" />
            <el-tab-pane label="Thành phần" :name="RECIPE.INGREDIENT.NAME" />
            <el-tab-pane label="Hướng dẫn" :name="RECIPE.INSTRUCTION.NAME" />
            <el-tab-pane label="Từ khoá" :name="RECIPE.KEYWORD.NAME" />
            <el-tab-pane label="Quảng cáo" :name="RECIPE.AD.NAME" />
          </el-tabs>
        </el-col>
        <el-col>
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </el-col>
      </el-col>
    </card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BackToPrevious from '@/components/BackToPrevious/index.vue'
import PageTitle from '@/components/PageTitle/index.vue'
import { mapState } from 'vuex'
import Card from '@/components/Card/common.vue'
import { RECIPE } from '@/utils/constants/route'
@Component({
  components: {
    BackToPrevious,
    PageTitle,
    Card
  },
  computed: {
    ...mapState({
      detail: (state: any) => state.recipe.detail.item
    })
  }
})
export default class Detail extends Vue {
  RECIPE = RECIPE

  get recipeId() { return this.$route.params.recipeId }

  get backText() { return 'Chi tiết công thức' }

  get activeTab() { return this.$route.name }

  set activeTab(value) { this.$router.push({ name: value, params: { recipeId: this.recipeId }}) }
}
</script>
<style lang="scss"></style>
