<template>
  <div class="container-pubish">
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form label-width="80px">
        <el-form-item label="标题:">
          <el-input style="width:400px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <!-- options配置 -->
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <template>
            <el-radio-group v-model="articleForm.cover.type">
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="1">一张</el-radio>
              <el-radio :label="3">三张</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <div>
              <my-image></my-image>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 0
        },
        channel_id: null
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      }
    }
  }
}
</script>

<style>
</style>
