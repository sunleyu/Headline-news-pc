<template>
  <el-container class="container">
    <el-aside :width="isCollapse? '200px':'64px'">
      <div class="logo" :class="{smallLogo:!isCollapse}"></div>
      <el-menu
        default-active="/"
        background-color="#233346"
        text-color="#fff"
        :collapse="!isCollapse"
        :collapse-transition="false"
        active-text-color="#ffd04b"
        style="border-right:none"
      >
        <el-menu-item index="/" class="first-item">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold icon" @click="toggleMenu"></span>
        <span class="text">未来万里晴空</span>
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            <img class="headIcon" src="../../assets/avatar.jpg" alt />
            用户名称
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    toggleMenu () {
      // 切换左菜单 展开与收起
      this.isCollapse = !this.isCollapse
      console.log(this.isCollapse)
    }
  }
}
</script>

<style  scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  .icon {
    font-size: 30px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
    margin-left: 10px;
  }
  .dropdown {
    float: right;
  }
  .headIcon {
    vertical-align: middle;
    width: 30px;
    border-radius: 50%;
  }
}

.el-aside {
  background-color: #233346;
  color: rgb(253, 231, 231);
  text-align: center;
  line-height: 200px;
  .logo {
    width: 200px;
    height: 60px;
    background: url(../../assets/logo_admin.png) no-repeat center / 140px auto;
    margin-bottom: 20px;
  }
  .smallLogo {
    width: 64px;
    height: 60px;
    background-image: url(../../assets/logo_admin_01.png);
    background-size: 36px auto;
  }
  .first-item {
    margin-right: 28px;
  }
}

</style>
