<template>
  <div
    v-loading="loading"
    class="table-wrapper"
    :style="{'min-height': minHeight}"
  >
    <div v-show="!loading">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TableWrapper extends Vue {
  @Prop({ default: false }) readonly loading!: boolean;
  @Prop({ default: '400px' }) readonly minHeight!: string;
}
</script>
