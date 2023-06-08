<template>
  <div :key="componentKey">
    <div v-if="!isSidebarCollapse" class="user-info">
      <div class="avatar-wrapper">
        <el-avatar shape="square" :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        <svg-icon class="status" icon-class="circle" />
      </div>
      <span class="user-name truncate">{{ userName }}</span>
      <el-popover
        v-model="popoverVisible"
        placement="right-end"
        width="220"
        trigger="click"
        popper-class="user-popover"
      >
        <el-button slot="reference" type="primary" size="mini" class="btn-icon" plain>
          <svg-icon icon-class="arrow-right-1" />
        </el-button>
        <div>
          <div v-if="visibleRedirectAdmin" class="action" @click="onAdminPageClick">
            <svg-icon icon-class="admin-page" />
            Trang quản lý
          </div>
          <div v-if="visibleSwitchApplication" class="action" @click="onChangeAppClick">
            <svg-icon icon-class="change-app" />
            Chuyển ứng dụng
          </div>
          <div class="action" @click="onLogoutClick">
            <svg-icon icon-class="logout" />
            Đăng xuất
          </div>
        </div>
      </el-popover>
    </div>
    <div v-if="isSidebarCollapse" class="user-info">
      <el-popover
        v-model="popoverVisible"
        placement="right-end"
        width="220"
        trigger="hover"
        popper-class="user-popover"
      >
        <div slot="reference" class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="30"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
          <svg-icon class="status" icon-class="circle" />
        </div>
        <div>
          <div v-if="visibleRedirectAdmin" class="action" @click="onAdminPageClick">
            <svg-icon icon-class="admin-page" />
            Trang quản lý
          </div>
          <div v-if="visibleSwitchApplication" class="action" @click="onChangeAppClick">
            <svg-icon icon-class="change-app" />
            Chuyển ứng dụng
          </div>
          <div class="action" @click="onLogoutClick">
            <svg-icon icon-class="logout" />
            Đăng xuất
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { ROLE } from '@/utils/constant'
@Component({
  components: {}
})
export default class UserInfo extends Vue {
  popoverVisible: boolean = false

  componentKey = 0

  get currentModule() {
    return this.$route.meta && this.$route.meta.module
  }

  get role() {
    return this.$store.state.user.role
  }

  get isCustomerView() {
    return ['CustomerDashboard', 'Bank', 'Card', 'Pos', 'Client', 'Transaction', 'ApplicationInfo', 'Profile']
      .includes(this.currentModule)
  }

  get userName(): string {
    return this.$store.state.user.name
  }

  get visibleRedirectAdmin(): boolean {
    return this.role === ROLE.ADMIN && this.isCustomerView
  }

  get visibleSwitchApplication(): boolean {
    return this.role === ROLE.MULTIPLE && this.isCustomerView
  }

  get isSidebarCollapse(): boolean {
    return !this.$store.getters.sidebar.opened;
  }

  @Watch('isSidebarCollapse')
  onIsSidebarCollapseChanged() {
    this.componentKey++;
    this.popoverVisible = false;
  }

  onAdminPageClick() {
    this.$router.push({ name: 'AdminDashboard' });
    this.popoverVisible = false;
  }

  async onLogoutClick() {
    await this.$store.dispatch('user/logout');
    this.$router.push({ path: '/' })
    this.popoverVisible = false;
  }

  onChangeAppClick() {
    this.$router.push({ name: 'ApplicationMenu' })
  }
}
</script>
<style lang="scss">
.user-popover {
  padding: 0;
  border-radius: 10px;

  .action {
    font-size: 16px;
    line-height: 24px;
    padding: 12px 16px;
    cursor: pointer;
    color: #2f3330;
    display: flex;
    align-items: center;

    .svg-icon {
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }

    &:not(:first-child) {
      border-top: solid 1px #ececee;
    }

    &:hover {
      background: rgba(94, 129, 244, 0.1);
      color: #5e81f4;
    }
  }
}

.avatar-wrapper {
  position: relative;

  .status.svg-icon {
    display: block;
    width: 11px;
    height: 11px;
    position: absolute;
    left: 23px;
    top: 23px;
    border: solid 2px white;
    border-radius: 50%;
    color: #8AF1B9;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
