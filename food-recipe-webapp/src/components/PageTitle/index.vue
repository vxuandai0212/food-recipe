<template>
  <div>
    <el-row style="display: flex;">
      <el-col :span="titleWidth">
        <div class="sidebar-toggle-button" @click="toggleSideBar">
          <svg-icon icon-class="sidebar-toggle" />
        </div>
        <h2 v-if="title" class="mb-18 d-inline-block">{{ title }}</h2>
      </el-col>
      <el-col :span="18">
        <slot />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class PageTitle extends Vue {
  @Prop(String) readonly title!: string;
  toggleSideBar() {
    this.$store.dispatch('app/toggleSideBar')
  }

  get titleWidth() {
    return this.title ? 6 : 1
  }
}
</script>
<style lang="scss">
.sidebar-toggle-button {
  width: 36px;
  height: 36px;
  background: #DCDCDF;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
</style>
