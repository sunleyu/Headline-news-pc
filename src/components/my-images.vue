<template>
<!--  -->
  <div class="my-image">
    <!-- 按钮 -->
    <div class="btn" @click="btn">
      <img :src="value||btnImage"/>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="素材库" name="image">
          <div style="margin-bottom:20px">
            <el-radio-group v-model="reqParams.collect" size="small" @change="toggleList">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div class="img_list">
            <div
              class="img_item"
              v-for="item in images"
              :key="item.id"
              :class="{selected: selectedImageUrl === item.url}"
                @click="selectedImage(item.url)"          >
              <img :src="item.url" />
            </div>
            <!-- 分页 -->
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              @current-change="pager"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传文件" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            name="image"
            :headers="headers"
            :on-success="handleSuccess"
            :show-file-list="false"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button >取 消</el-button>
        <el-button type="primary" @click="successBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/store'
import btnImage from '../assets/default.png'
export default {
  props: ['value'],
  data () {
    return {
      reqParams: {
        collect: false,
        // src: null
        page: 1,
        per_page: 8
      },
      images: [],
      total: null,
      dialogVisible: false,
      uploadImageUrl: null,
      btnImage: btnImage,
      selectedImageUrl: null,
      activeName: 'image',
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    successBtn () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) {
          return this.$message.warning('请选择图片')
        }
        // this.btnImage = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
        this.dialogVisible = false
      } else {
        if (!this.uploadImageUrl) {
          return this.$message.warning('请上传图片')
        }
        // this.btnImage = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
        this.dialogVisible = false
      }
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    btn () {
      this.dialogVisible = true
      this.uploadImageUrl = null
    },
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传成功')
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    selectedImage (url) {
      this.selectedImageUrl = url
    //   console.log(url)
    //   console.log(this.selectedImageUrl)
    }
  }
}
</script>

<style scoped lang="less">
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img_list {
  padding-top: 20px;
  .img_item {
    width: 140px;
    height: 140px;
    position: relative;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
      &.selected::after {
        content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center / 50px 50px;
    }
  }
}
.btn img{
  width: 140px;
  height: 140px;
}
</style>
