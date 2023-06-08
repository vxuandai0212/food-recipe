<template>
  <main-section :title="title">
    <template #main>
      <el-row><stat-section /></el-row>
      <el-row style="margin-bottom:20px"><view-recipe /></el-row>
      <el-row style="margin-bottom:20px"><view-keyword /></el-row>
      <el-row style="margin-bottom:20px"><view-native-ad /></el-row>
      <el-row style="margin-bottom:20px"><view-admob /></el-row>
    </template>
  </main-section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MainSection from '@/components/Main/index.vue'
import StatSection from '@/views/dashboard/stat/index.vue'
import ViewRecipe from '@/views/dashboard/view-recipe/index.vue'
import ViewKeyword from '@/views/dashboard/view-keyword/index.vue'
import ViewNativeAd from '@/views/dashboard/view-native-ad/index.vue'
import ViewAdmob from '@/views/dashboard/view-admob/index.vue'
@Component({
  components: {
    MainSection,
    StatSection,
    ViewRecipe,
    ViewKeyword,
    ViewNativeAd,
    ViewAdmob
  }
})
export default class AdminDashboard extends Vue {
  get title() { return 'Dashboard' }
}
</script>
<style lang="scss"></style>
