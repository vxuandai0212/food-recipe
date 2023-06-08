<template>
  <el-button :disabled="disabled" class="font-14" type="primary" @click="$emit('click')">
    Tiếp theo <i class="el-icon-arrow-right" />
  </el-button>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class NextButton extends Vue {
  @Prop({ default: false }) readonly disabled!: boolean;
}
</script>
