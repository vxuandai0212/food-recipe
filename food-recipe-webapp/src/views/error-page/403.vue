<template>
  <div class="text-center">
    <p class="bold" style="font-size: 4rem; margin-top: 15rem;">Forbidden!</p>
    <p class="bold" style="font-size: 2rem;">Code 403</p>
    <el-button type="primary" @click="backToLogin">Back to login</el-button>
  </div>
</template>
<script>

export default {
  methods: {
    async backToLogin() {
      await this.$store.dispatch('user/logout')
    }
  }
}
</script>
