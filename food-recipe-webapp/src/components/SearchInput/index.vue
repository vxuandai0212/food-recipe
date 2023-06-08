<template>
  <el-form style="width: 100%;" class="search-input-wrapper" @submit.native.prevent="onSubmit">
    <el-input
      ref="searchInput"
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxLength"
      class="search-input"
      clearable
      @input="onInput"
      @clear="onSubmit"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
    <svg-icon icon-class="search" class="search-icon" />
  </el-form>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SearchInput extends Vue {
  @Prop({ type: String, default: '' }) readonly placeholder!: string;
  @Prop({ type: Number, default: 500 }) readonly maxLength!: number;
  @Prop() readonly value!: any;

  onSubmit() {
    this.$emit('submit');
  }
  onInput(value) {
    this.$emit('input', value);
  }
}
</script>
<style lang="scss">

</style>
