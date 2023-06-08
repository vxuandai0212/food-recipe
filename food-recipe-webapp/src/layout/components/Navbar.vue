<template>
  <div class="navbar">
    <div class="navbar-left">
      <div class="logo">
        IRIS
      </div>
      <el-button-group v-if="isShowQuickNavBtnGroup" class="quick-nav-btn-group">
        <el-button :class="{'active': isCampaignModuleActive}" @click="onCampaignClick">Campaign</el-button>
        <el-button :class="{'active': isTemplateModuleActive}" @click="onTemplateClick">Template</el-button>
        <el-button :class="{'active': isAudienceModuleActive}" @click="onAudienceClick">Audience</el-button>
      </el-button-group>
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>
              {{ $t('navbar.profile') }}
            </el-dropdown-item>
          </router-link>
          <router-link v-if="isUserWithMultiApp" to="/choose-application">
            <el-dropdown-item>
              Thay đổi ứng dụng
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      isCampaignModuleActive: false,
      isTemplateModuleActive: false,
      isAudienceModuleActive: false,
      isShowQuickNavBtnGroup: false
    }
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'isAdminRole',
      'isUserWithMultiApp'
    ])
  },
  watch: {
    '$route.meta.module': {
      immediate: true,
      handler(val) {
        switch (val) {
          case 'Campaign':
            this.isCampaignModuleActive = true
            this.isTemplateModuleActive = false
            this.isAudienceModuleActive = false
            break
          case 'Template':
            this.isCampaignModuleActive = false
            this.isTemplateModuleActive = true
            this.isAudienceModuleActive = false
            break
          case 'Audience':
            this.isCampaignModuleActive = false
            this.isTemplateModuleActive = false
            this.isAudienceModuleActive = true
            break
          default:
            this.isCampaignModuleActive = false
            this.isTemplateModuleActive = false
            this.isAudienceModuleActive = false
        }
      }
    }
  },
  created() {

  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      window.location = process.env.VUE_APP_SSO_ENDPOINT_LOGOUT
    },
    onCampaignClick() {
      this.$router.push({ name: 'CampaignList' })
    },
    onTemplateClick() {
      this.$router.push({ name: 'TemplateList' })
    },
    onAudienceClick() {
      this.$router.push({ name: 'AudienceList' })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  display: flex;
  justify-content: space-between;
  margin-top: 25px;

  .navbar-left {
    display: flex;
    align-items: center;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  .quick-nav-btn-group {
    height: 40px;
    display: inline-flex;
    .el-button {
      border: none;
      border-radius: 20px;
      color: #000000;
      font-weight: bold;
      font-size: 16px;
      font-family: 'Playfair Display';
      padding: 10px 32px;

      &:hover {
        background-color: #FFBFBF;
      }
      &:active {
        background-color: white;
      }
    }
    .el-button.active {
     background-color: #FFBFBF;
    }
  }

  .logo {
    font-family: 'Oswald';
    font-size: 40px;
    line-height: 50px;
    color: #13113A;
    font-weight: 300;
    display: inline-block;
    margin-right: 66px;
    margin-left: 35px;
  }
}
</style>
