<template>
<!-- :value 只能接收value不可以修改 -->
  <el-select :value="value"  @change="fn"  clearable placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 获取素材
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    // fn (value) {
    fn (channelId) {
      // 把数据提交父组件
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    }
  }
}
</script>

<style>
</style>
