<template>
  <div class="container-page">
    <p>头</p>
    <p>
      <slot name="content" :pn='pageName' test='test'>身子</slot>
    </p>
    <p>
      <slot name="footer">脚</slot>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: '组件内部数据'
    }
  }
}
</script>

<style>
</style>
