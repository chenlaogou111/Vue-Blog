<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "创建" }}时间线</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="时间线标题">
        <el-input v-model="model.name"> </el-input>
      </el-form-item>

      <el-form-item label="时间线内容">
        <el-input type="textarea" v-model="model.content"> </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async save() {
      const date = new Date();
      this.model.time = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      let res, contxt;
      res = await this.$http.post("/timeline", this.model);

      this.$message({
        type: "success",
        message: "保存成功",
      });

      this.$router.push("/categories/timelinelist");
    },
  },
};
</script>