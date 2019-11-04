<template>
  <div class="container">
    <el-card class="box-card">
      <img src="../../assets/logo_index.png" alt />
      <!-- 表单 -->
      <el-form ref="form" status-icon :model="loginForm" :rules="checkLogin">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            style="width:235px;margin-right:10px"
            placeholder="请输入验证码"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="submitForm">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/store'
export default {
  data () {
    // 自定义校验手机号
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        return callback()
      } else {
        return callback(new Error('手机号格式不正确'))
      }
    }
    // const checkCode = (rule, value, callback) => {
    //   if (/\d{6}/.test(value)) {
    //     return callback()
    //   } else {
    //     return callback(new Error('验证码不正确'))
    //   }
    // }
    return {
      loginForm: {
        mobile: '18845215569',
        code: '246810'
      },
      checkLogin: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }, // 基本校验
          { validator: checkMobile, trigger: 'blur' } // 自定义校验
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码不正确', trigger: 'blur' }
          // { validator: checkCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 校验整体表单
    submitForm () {
      // element-ui提供validate方法对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，
      this.$refs['form'].validate(async valid => {
        // if (valid) {
        //   this.$http.post('authorizations', this.loginForm).then((res) => {
        //     // 编程式导航
        //     // 保存用户信息 token
        //     local.setUser(res.data.data)
        //     this.$router.push('/')
        //   }).catch(() => {
        //     this.$message.error('手机或验证码错误')
        //   })
        // } else {
        //   console.log('err')
        // }
        if (valid) {
          try {
            // 登录验证
            const {
              data: { data }
            } = await this.$http.post('authorizations', this.loginForm)
            // 存储token
            local.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机或验证码错误')
          }
        }
      })
    }
  }
}
</script>
<style scoped lang='less'>
/* // 全屏容器 */
.container {
  width: 100%;
  height: 100%;
  // 背景尺寸 background-size 拆分写法
  // 组合写法 background:    / 背景尺寸(width,height) 简写 cover 铺面整个容器多余看不见  contain 等比例缩放完整的显示在容器内容
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;
}
// 饿了么组件 el-card 组件名称  解析成HTML  后组件根元素上默认生成一个类和组件的名称一致
.el-card {
  width: 400px;
  height: 340px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    display: block;
    margin: 0 auto 30px;
  }
}
</style>
