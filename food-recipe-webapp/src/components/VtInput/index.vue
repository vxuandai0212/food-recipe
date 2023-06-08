<template>
  <div
    class="vt-input-wrapper"
    :class="inputWrapperClass"
    :style="{'height': height ? height + 'px' : '64px'}"
    @click="onWrapperFocus"
  >
    <label :style="{'width':showLength ? '100%' : 'auto', 'padding-right': showLength ?'45px' : 'auto'}" :class="labelClass">
      {{ label }}
      <span v-if="showLength" style="float: right">{{ maxLength }} ký tự</span>
      <slot name="label" />
    </label>
    <input
      ref="vtInput"
      :value="value"
      placeholder=""
      size="normal"
      :type="typeData"
      :maxlength="maxLength"
      :min="min"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput($event.target.value)"
      @keyup.enter="keyUpEnter"
      @change="onChange"
    >
    <span v-if="isShowPasswordControl" class="password-control">
      <svg-icon v-if="typeData !== 'password'" icon-class="password-show" @click="typeData = 'password'" />
      <svg-icon v-if="typeData === 'password'" icon-class="password-hide" @click="typeData = 'text'" />
    </span>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class VtInput extends Vue {
  @Prop() readonly value!: any;
  @Prop() readonly label: string | undefined;
  @Prop() readonly type: string | undefined;
  @Prop() readonly showLength: any | false;
  @Prop() readonly maxLength: number | undefined;
  @Prop() readonly min: number | undefined;
  @Prop() readonly height: number | undefined;

  typeData: string = 'text';

  created() {
    this.typeData = this.type || 'text';
  }

  isInputFocus = false;

  get isShowPasswordControl() {
    return this.type === 'password' && this.isLabelActive
  }

  get isLabelActive() {
    return this.isInputFocus || (this.value !== undefined && this.value !== null && this.value !== '')
  }

  get labelClass() {
    return { 'label-active': this.isLabelActive }
  }

  get inputWrapperClass() {
    return { 'input-focus': this.isInputFocus }
  }

  onFocus() {
    this.isInputFocus = true;
    this.$emit('focus')
  }

  onBlur() {
    this.isInputFocus = false
    this.$emit('blur')
  }

  keyUpEnter(value) {
    this.$emit('keyUpEnter', value);
    this.$emit('enter', value.target.value)
  }

  onInput(value) {
    this.$emit('input', value);
  }

  onWrapperFocus() {
    (this.$refs['vtInput'] as any).focus();
  }
  onChange(event) {
    this.$emit('change', event.target.value);
  }
}
</script>
<style lang="scss">
$-mat-form-border-radius: 10px;
$-mat-form-font-size: 16px;
.vt-input-wrapper {
  align-items: flex-start;
  display: flex;
  border: 1px solid #D7D9DB;
  font-size: 16px;
  letter-spacing: normal;
  max-width: 100%;
  text-align: left;
  height: 64px;
  border-radius: $-mat-form-border-radius;
  font-size: $-mat-form-font-size;
  padding: 0 36px 0 24px;
  position: relative;
  background: white;
  cursor: text;

  &.error {
    border: solid 1px #e77b7b;
  }

  label {
    position: absolute;
    top: 20px;
    transition: .3s cubic-bezier(.25,.8,.5,1);;
    font-weight: 400;
    color: #7A7A7A;;
  }

  input {
    border: none;
    outline: none;
    width: 100%;
    padding: 0 0 8px 0;
    line-height: 24px;
    margin-top: 26px;
  }
  .label-active {
    transform: translateY(-12px);
    font-size: 13px;

  }

}
.vt-input-wrapper.input-focus {
  border: 1px solid #5E81F4;
  background: #F5F5FA;
  label {
    color: #5E81F4;
  }
  * {
    background: initial;
  }
}
.password-control {
  position: absolute;
  right: 8px;
  top: 25px;
  cursor: pointer;
  .svg-icon {
    width: 24px;
    height: 24px;
  }

}
</style>
