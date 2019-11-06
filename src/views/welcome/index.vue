<template>
  <div class="container-welcome">
    <!-- <img src="../../assets/welcome.jpg" alt /> -->
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1" >
        <template slot="title"  ref="show">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles').then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // select (index) {
    //   if (index) {
    //     console.log(this.$refs.show)
    //     this.$refs.show.class = 'show'
    //   }
    // },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped lang='less'>
img {
  display: block;
  margin: 0 auto;
}
.show{
  border-left: 2px solid blue
}
</style>
