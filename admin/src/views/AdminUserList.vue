<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
            type="info"
            size="mini"
          >
            编辑
          </el-button>
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
      const res = await this.$http.get("admin_users");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定要删除分类  ${row.username}`, "提示", {
        confirmButtonText: "确定",
        canceButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.$http.delete(`/admin_users/${row._id}`);
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