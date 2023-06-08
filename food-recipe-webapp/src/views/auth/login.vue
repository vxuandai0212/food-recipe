<template>
  <div class="__login_container__">
    <div class="background">
      <div class="shape" />
      <div class="shape" />
    </div>
    <div class="form">
      <h3>Yummy</h3>

      <label for="email">Email</label>
      <input id="email" v-model="email" type="text" placeholder="Nhập địa chỉ Email">

      <label for="password">Mật khẩu</label>
      <input id="password" v-model="password" type="password" placeholder="Nhập mật khẩu" @keyup.enter="login()">

      <div class="other-btn-container">
        <glow-button v-if="authorizing" :css="loginCss" :label="'Đang xác thực'" />
        <glow-button v-else :css="loginCss" :label="'Đăng nhập'" @click.native="login()" />
        <!-- <glow-button :css="forgotPasswordCss" :label="'Quên mật khẩu'" />
        <glow-button :css="resetPasswordCss" :label="'Đặt lại mật khẩu'" /> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import GlowButton from '@/views/auth/components/glow-button.vue'
import AnimateInput from '@/views/auth/components/animate-input.vue'
import { mapState } from 'vuex'
@Component({
  components: { GlowButton, AnimateInput },
  computed: {
    ...mapState({
      authorizing: (state: any) => state.auth.authorizing
    })
  }
})
export default class LoginScreen extends Vue {
  emailInputCss = {
    '--primary-color': '#1a237e',
    '--dark-primary-color': '#0f1041',
    '--accent-color': '#2962ff',
    '--sub-yellow': '#ffca00'
  }

  passwordInputCss = {
    '--primary-color': '#1a237e',
    '--dark-primary-color': '#0f1041',
    '--accent-color': '#2962ff',
    '--sub-yellow': '#ffca00'
  }

  loginCss = {
    '--color': '#fb84fb'
  }

  forgotPasswordCss = {
    '--color': '#03e9f4'
  }

  resetPasswordCss = {
    '--color': '#79d403'
  }

  email = ''
  password = ''

  login() {
    this.$store.dispatch('auth/setAuthorizing', true)
    this.$store.dispatch('user/login', { email: this.email, password: this.password }).then(() => {
      setTimeout(() => {
        this.$store.dispatch('auth/setAuthorizing', false)
        const redirect: any = this.$route.query.redirect
        if (redirect) {
          this.$router.push({ path: redirect })
        } else {
          this.$router.push('/')
        }
      }, 3000)
    })
      .catch((err) => {
        console.log(err)
        setTimeout(() => {
          this.$store.dispatch('auth/setAuthorizing', false)
        }, 3000)
      })
      .finally(() => {
        setTimeout(() => {
          this.$store.dispatch('auth/setAuthorizing', false)
        }, 3000)
      })
  }
}
</script>
<style lang="scss" scoped>
.__login_container__ {
  width: 100%;
  height: 100%;
  background-color: #080710;
  *,
  *:before,
  *:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .btn {
    cursor: pointer;
  }

  .background {
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
  .background .shape {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  }
  .shape:first-child {
    background: linear-gradient(#1845ad, #23a2f6);
    left: -80px;
    top: -80px;
  }
  .shape:last-child {
    background: linear-gradient(to right, #ff512f, #f09819);
    right: -30px;
    bottom: -80px;
  }
  .form {
    height: 520px;
    width: 400px;
    background-color: rgba(255, 255, 255, 0.13);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
    * {
      color: #ffffff;
      letter-spacing: 0.5px;
      outline: none;
      border: none;
    }
    h3 {
      font-size: 32px;
      font-weight: 500;
      line-height: 42px;
      text-align: center;
    }
    button {
      margin-top: 50px;
      width: 100%;
      background-color: #ffffff;
      color: #080710;
      padding: 15px 0;
      font-size: 18px;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  label {
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }
  input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
  }
  ::placeholder {
    color: #e5e5e5;
  }
  .other-btn-container {
    margin-top: 30px;
  }
}
</style>
