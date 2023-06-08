<template>
  <el-button type="info" class="font-14" @click="$emit('click')">
    <i class="el-icon-arrow-left" />Quay lại
  </el-button>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class BackButton extends Vue {

}
</script>
