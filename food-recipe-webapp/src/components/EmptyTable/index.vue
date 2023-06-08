<template>
  <div class="text-center">
    <img src="@/assets/no_application.png" width="250px" height="250px" class="">
    <div v-if="!onlyMessage" style="margin-top: 10px;">
      <slot name="message" />
      <a style="margin-left: 10px;" @click="reload"><svg-icon class="pointer" icon-class="reload" /></a>
    </div>
    <div v-if="onlyMessage">
      <p class="message">Không có bản ghi nào</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class EmptyTable extends Vue {
  @Prop({ default: false }) readonly onlyMessage!: boolean;
  onLinkClick() {
    this.$emit('onClickLink')
  }

  reload() {
    this.$emit('reload')
  }
}
</script>
<style lang="scss" scoped>
img {
  margin-top: 32px;
}
.message {
  color: #8181A5;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}
a{
  text-decoration: underline;
  color: #5E81F4;
}
</style>
