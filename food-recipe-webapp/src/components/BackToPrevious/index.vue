<template>
  <div class="align-center d-inline-flex">
    <svg-icon
      icon-class="arrow-right"
      class="cursor-pointer"
      @click="onClick"
    />
    <h2 class="d-inline-block mr-24">{{ text }}</h2>
    <span class="last-route-name">{{ lastRouteName }}</span>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { RawLocation, Route } from 'vue-router';

@Component({
  components: { }
})
export default class BackToPrevious extends Vue {
@Prop(String) readonly text!: string;
@Prop({ default: null }) readonly to!: RawLocation;
@Prop({ default: '' }) readonly lastRouteName!: string;

get lastRoute(): Route {
  return this.$store.state.app.lastRoute;
}

onClick() {
  if (this.to) {
    this.$router.push(this.to);
  } else if (this.lastRoute) {
    this.$router.push({ ...this.lastRoute })
  } else {
    this.$router.go(-1);
  }
}
}
</script>
<style lang="scss" scoped>
svg {
  vertical-align: baseline;
  margin-right: 13px;
}
.last-route-name {
  color: #8181A5;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}
</style>
