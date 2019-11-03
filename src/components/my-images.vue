<template>
  <div class="my-image">
    <!-- 按钮 -->
    <div class="btn" @click="btn">
      <img src="../assets/default.png" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <el-tabs type="border-card">
        <el-tab-pane label="素材库">
          <div style="margin-bottom:20px">
            <el-radio-group v-model="reqParams.collect" size="small" @change="toggleList">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div class="img_list">
            <div class="img_item" v-for="item in images" :key="item.id">
              <img :src="item.url" alt />
              <div class="footer" v-if="!reqParams.collect">
                <span
                  class="el-icon-star-off"
                  :class="{red:item.is_collected}"
                ></span>

                <span class="el-icon-delete"></span>
              </div>
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
        <el-tab-pane label="上传文件">
            <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          name="image"
          :headers="headers"
          :on-success="handleSuccess"
          :show-file-list="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/store'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        // src: null
        page: 1,
        per_page: 10
      },
      images: [],
      total: null,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    btn () {
      this.dialogVisible = true
    },
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    },
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
      }, 2000)
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    }
  }

}
</script>

<style scoped lang="less">
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
    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      text-align: center;
      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
