<template>
  <el-col style="height: 142px; border-radius: 20px; background: #FFFFFF; position: relative; width:18.72%">
    <el-col style="margin-left: 32px; margin-top: 21px; margin-right: 32px;">
      <el-col style="width:32px ;margin-right: 12px;padding: 3px 0 3px 0;">
        <svg-icon :icon-class="iconTitle" style="width:32px; height: 32px;" />
      </el-col>
      <el-col style="width: calc(100% - 32px - 12px - 32px - 32px);height: 40px; display: flex; justify-content: center; flex-direction: column;">
        <span style="font-style: normal; font-weight: bold; font-size: 14px; line-height: 17px; color: #000000;">{{ title }}</span>
      </el-col>
    </el-col>
    <el-col style="margin-left: 32px; margin-top: 15px">
      <span style="font-style: normal; font-weight: bold; font-size: 48px; line-height: 58px; color: #1C1D21;">{{ total }}</span>
    </el-col>
    <svg-icon :icon-class="icon" style="width:83.33px; height: 83.33px; position: absolute; bottom: 0; right: 0;color: rgb(245, 246, 250)" />
  </el-col>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: { }
})
export default class CardStatistical extends Vue {
  @Prop(String) readonly iconTitle!: String;
  @Prop(String) readonly icon!: String;
  @Prop(String) readonly title!: String;
  @Prop() readonly total!: any;
}
</script>
<style lang="scss">

</style>
