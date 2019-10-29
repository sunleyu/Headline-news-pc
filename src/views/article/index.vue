<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
          <div class="block">
            <el-date-picker
              v-model="dateArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- //使用page组件 -->
    <page >
      <template v-slot:content="scope">{{allData.pn}}</template>
      <div slot="content" slot-scope='scope'>{{scope.pn+scope.test}}</div>
      <!-- <div slot="content" slot-scope='allData'>{{allData.test}}</div> -->
      <div slot="footer">456</div>
    </page>

  </div>
</template>

<script>
import Page from '@/test'
export default {
  // 一个组件在另一个组件中使用需要注册
  components: { Page },
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      options: [
        {
          value: '选项1',
          label: 'java'
        },
        {
          value: '选项2',
          label: 'web'
        }
      ],
      dateArr: []
    }
  }
}
</script>

<style>
</style>
