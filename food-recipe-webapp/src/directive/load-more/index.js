
export default {}.install = (Vue = {}) => {
  Vue.directive('loadmore', {
    inserted(el, binding) {
      // Get the element-ui defined scroll box
      const SELECTDOWN_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
      SELECTDOWN_DOM.addEventListener('scroll', function() {
        const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
        if (CONDITION) {
          binding.value()
        }
      })
    }
  })
}
