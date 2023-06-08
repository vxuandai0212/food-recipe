<template>
  <div :style="css" class="__animate_input_container__">
    <label class="input">
      <input class="input__field" :type="type" placeholder=" ">
      <span class="input__label">{{ label }}</span>
    </label>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class AnimateInput extends Vue {
  @Prop(String) readonly label!: string
  @Prop(String) readonly type!: string
  @Prop(Object) readonly css!: Object
}
</script>
<style lang="scss" scoped>
.__animate_input_container__ {
  --color-light: white;
  --color-dark: #212121;
  --color-signal: #fab700;

  --color-background: var(--color-light);
  --color-text: var(--color-dark);
  --color-accent: var(--color-signal);

  --size-bezel: .5rem;
  --size-radius: 4px;

  position: relative;
  background: #e0e0e0;
  font-size:14px;
  .input {
    position: relative;
    &__label {
      position: absolute;
      left: 0;
      top: 0;
      padding: calc(var(--size-bezel) * 0.75) calc(var(--size-bezel) * .5);
      margin: calc(var(--size-bezel) * 0.75 + 3px) calc(var(--size-bezel) * .5);
      background: pink;
      white-space: nowrap;
      transform: translate(0, 0);
      transform-origin: 0 0;
      background: var(--color-background);
      transition: transform 120ms ease-in;
      font-weight: bold;
      line-height: 1.2;
    }
    &__field {
      box-sizing: border-box;
      display: block;
      width: 100%;
      border: 3px solid currentColor;
      padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
      color: currentColor;
      background: transparent;
      border-radius: var(--size-radius);

      &:focus,
      &:not(:placeholder-shown) {
        & + .input__label {
          transform: translate(.25rem, -65%) scale(.8);
          color: var(--color-accent);
        }
      }
    }
  }
}
</style>
