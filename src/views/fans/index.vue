<template>
  <div class="container-fans">
<div slot="header">
    <my-bread>粉丝管理</my-bread>
</div>
<el-tabs type="card" value="fansList" style="margin-top:20px">
    <el-tab-pane label="用户管理" name="fansList" >
        <div class="fansLists" v-for='item in fans' :key='item.id.toString()' >
             <el-avatar :size="70" :src='item.photo'></el-avatar>
             <p style="text-align:center">{{item.name}}</p>
             <el-button type="primary" size='small'>+关注</el-button>

        </div>
         <!-- 分页 -->
      <!-- current-change事件 currentPage(当前页) 改变时会触发 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="fansPic">
        <div ref="dom" style="width: 600px;height:400px;"></div>
    </el-tab-pane>

  </el-tabs>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      fans: [],
      reqParams: {
        page: 1,
        per_paeg: 21
      },
      total: 0
    }
  },
  created () {
    this.getFans()
  },
  methods: {
    async getFans () {
      const { data: { data } } = await this.$http.get('followers', { params: this.reqParams })
      this.fans = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getFans()
    }

  },
  mounted () {
    // 注意：获取dom需要在dom渲染完毕后
    const dom = this.$refs.dom
    const myEcharts = echarts.init(dom)
    // 配置及数据
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }

    // 使用配置及数据
    myEcharts.setOption(option)
  }

}
</script>

<style scoped lang="less">
.fansLists{
    width: 120px;
    height: 200px;
    display: inline-block;
    text-align: center;
    border:1px dashed #ddd;
    padding:20px;
    box-sizing: border-box;
    margin-right: 20px;
    margin-bottom: 20px;
}
</style>
