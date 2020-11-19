<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "创建" }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="文章标题">
        <el-input v-model="model.name"> </el-input>
      </el-form-item>

      <el-form-item label="文章描述">
        <el-input v-model="model.summary"> </el-input>
      </el-form-item>

      <el-form-item label="封面图片">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.cover" :src="model.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="分类">
        <new-btn @new-tag="newTag"></new-btn>
      </el-form-item>

      <el-form-item label="写点什么吧">
        <vue-editor
          v-model="model.editor"
          class="editor"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import NewBtn from "../components/NewBtn";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    NewBtn,
    VueEditor,
  },
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, "cover", res.url);
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      const date = new Date();
      this.model.time = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      let res, contxt;
      if (this.id) {
        res = await this.$http.put(`/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/categories", this.model);
      }

      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`/categories/edit/${this.id}`);
      this.model = res.data;
    },

    newTag(tag) {
      this.model.tags = tag;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>