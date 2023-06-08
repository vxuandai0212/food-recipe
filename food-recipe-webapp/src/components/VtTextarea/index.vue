<template>
  <div class="vt-textarea-wrapper" :class="inputWrapperClass" @click="onWrapperFocus">
    <label :class="labelClass">
      {{ label }}
      <slot name="label" />
    </label>
    <textarea
      ref="vtTextarea"
      v-autosize
      :value="value"
      placeholder=""
      size="normal"
      :rows="row ? row : 3"
      :maxlength="maxLength"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput($event.target.value)"
    />

  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class VtTextArea extends Vue {
  @Prop() readonly value!: any;
  @Prop() readonly row!: any;
  @Prop() readonly label: any;
  @Prop(Number) readonly maxLength: number | undefined;

  isInputFocus = false;

  get isLabelActive() {
    return this.isInputFocus || this.value
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
    this.$emit('blur');
  }

  onInput(value) {
    this.$emit('input', value);
  }

  onWrapperFocus() {
    (this.$refs['vtTextarea'] as any).focus();
  }
}
</script>
<style lang="scss">
$-mat-form-border-radius: 10px;
$-mat-form-padding-x: 24px;
$-mat-form-font-size: 16px;
.vt-textarea-wrapper {
  align-items: flex-start;
  display: flex;
  border: 1px solid #D7D9DB;
  font-size: 16px;
  letter-spacing: normal;
  max-width: 100%;
  text-align: left;
  height: auto;
  border-radius: $-mat-form-border-radius;
  font-size: $-mat-form-font-size;
  padding: 0 2px 2px $-mat-form-padding-x;
  position: relative;
  background: white;
  cursor: text;

  label {
    position: absolute;
    top: 20px;
    transition: .3s cubic-bezier(.25,.8,.5,1);
    font-weight: 400;
    color: #7A7A7A;;
  }

  textarea {
    border: none;
    outline: none;
    width: 100%;
    padding: 0 $-mat-form-padding-x 0 0;
    line-height: 24px;
    margin-top: 26px;
  }
  .label-active {
    transform: translateY(-12px);
    font-size: 13px;

  }

}
.vt-textarea-wrapper.input-focus {
  border: 1px solid #5E81F4;
  background: #F5F5FA;
  label {
    color: #5E81F4;
  }
  * {
    background: initial;
  }
}
</style>
