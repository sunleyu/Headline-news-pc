<template>
  <div class='container-setting'>
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="saveInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传 -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="uploadPhoto"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
import local from '@/utils/store.js'
export default {
  data () {
    return {
      userInfo: {
        id: '',
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: null
      }
    }
  },
  created () {
    this.getSetting()
  },
  methods: {
    async getSetting () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userInfo = data
    },
    async saveInfo () {
      const { name, email, intro } = this.userInfo
      await this.$http.patch('user/profile', { name, email, intro })
      // 提示
      this.$message.success('保存成功')
      // 改home组件
      eventBus.$emit('B2A', this.userInfo)
      // 改本地存储
      const user = local.getUser()
      user.name = name
      local.setUser(user)
    },
    async uploadPhoto ({ file }) {
      // 通过FormData构造函数创建一个空对象
      const formData = new FormData()
      // 可以通过append()方法来追加数据
      formData.append('photo', file)
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      this.$message.success('上传成功')
      this.userInfo.photo = data.photo
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    }
  }
}
</script>

<style>

</style>
