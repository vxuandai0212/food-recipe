<template>
  <div class="__wrap_loading__">
    <loading-option-1 v-if="type === 1" />
    <loading-option-2 v-else-if="type === 2" />
    <loading-option-3 v-else />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import LoadingOption1 from '@/components/Loading/loading-1.vue'
import LoadingOption2 from '@/components/Loading/loading-2.vue'
import LoadingOption3 from '@/components/Loading/loading-3.vue'
@Component({
  components: { LoadingOption1, LoadingOption2, LoadingOption3 }
})
export default class Loading extends Vue {
  @Prop({
    default: 1
  }) readonly type!: number
}
</script>
<style lang="scss" scoped>
$white: #fff;
.__wrap_loading__ {
  font-size: 1rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  min-height: 100vh;
  background: $white;
  overflow: hidden;
}
</style>
