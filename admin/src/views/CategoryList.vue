<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="name" label="标题" width="240"> </el-table-column>
      <el-table-column prop="time" label="时间"> </el-table-column>
      <el-table-column prop="summary" label="文章描述"> </el-table-column>
      <el-table-column prop="tags" label="标签"> </el-table-column>
      <el-table-column prop="comment.length" label="评论数"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
            type="info"
            size="mini"
          >
            编辑
          </el-button>
          <el-button
            type="warning"
            size="mini"
            @click="$router.push(`/categories/admincomment/${scope.row._id}`)"
            >管理评论</el-button
          >
          <el-button @click="remove(scope.row)" type="danger" size="mini">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fatch() {
      const res = await this.$http.get("categories");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定要删除分类  ${row.name}`, "提示", {
        confirmButtonText: "确定",
        canceButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.$http.delete(`/categories/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.fatch();
      });
    },
  },
  created() {
    this.fatch();
  },
};
</script>
<style>
table .el-button {
  margin-left: 0 !important;
  width: 100%;
}
table .el-button + .el-button {
  margin-top: 10px;
}
</style>