<template>
  <div :style="css" class="__glow_btn_container__">
    <span v-for="index in 4" :key="index" />
    {{ label }}
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class GlowButton extends Vue {
  @Prop(String) readonly label!: string
  @Prop(Object) readonly css!: Object
}
</script>
<style lang="scss" scoped>
.__glow_btn_container__ {
  text-align: center;
  position: relative;
  cursor: pointer;
  padding: 12px 30px!important;
  margin: 15px 0!important;
  color: var(--color)!important;
  text-decoration: none;
  text-transform: uppercase;
  transition: 0.5s!important;
  letter-spacing: 4px!important;
  overflow: hidden;
  margin-right: 50px;
  &:hover{
    background: var(--color)!important;
    color: #050801!important;
    box-shadow: 0 0 5px var(--color),
                0 0 25px var(--color),
                0 0 50px var(--color),
                0 0 200px var(--color);
    -webkit-box-reflect:below 1px linear-gradient(transparent, #0005);
  }
  span {
    position: absolute;
    display: block;
    &:nth-child(1) {
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg,transparent,var(--color));
      animation: animate1 1s linear infinite;
    }
    &:nth-child(2) {
      top: -100%;
      right: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg,transparent,var(--color));
      animation: animate2 1s linear infinite;
      animation-delay: 0.25s;
    }
    &:nth-child(3) {
      bottom: 0;
      right: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(270deg,transparent,var(--color));
      animation: animate3 1s linear infinite;
      animation-delay: 0.50s;
    }
    &:nth-child(4) {
      bottom: -100%;
      left: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(360deg,transparent,var(--color));
      animation: animate4 1s linear infinite;
      animation-delay: 0.75s;
    }
  }

  @keyframes animate1 {
    0%{
      left: -100%;
    }
    50%,100%{
      left: 100%;
    }
  }

  @keyframes animate2 {
    0%{
      top: -100%;
    }
    50%,100%{
      top: 100%;
    }
  }

  @keyframes animate3 {
    0%{
      right: -100%;
    }
    50%,100%{
      right: 100%;
    }
  }

  @keyframes animate4 {
    0%{
      bottom: -100%;
    }
    50%,100%{
      bottom: 100%;
    }
  }
}
</style>
