<template>
  <div class="d-inline-block">
    <el-tag
      v-for="(tag, index) in tags"
      :key="index"
      style="margin: 2px 2px"
      :type="type"
      size="medium"
      :effect="effect"
    >
      <el-tooltip
        :open-delay="300"
        class="item"
        effect="dark"
        :content="tag.name"
        placement="top-start"
      >
        <span class="tagName">{{ tag.name }}</span>
      </el-tooltip>
    </el-tag>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Tag } from '@/types/tag';

@Component
export default class TagList extends Vue {
  @Prop(Array) readonly tags!: Tag[];
  @Prop({ default: 'dark' }) readonly effect!: string;
  @Prop({ default: 'success' }) readonly type!: string;
}
</script>
