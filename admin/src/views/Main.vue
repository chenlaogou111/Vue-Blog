<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-active="$route.path" unique-opened>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>
            内容管理
          </template>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/categories/list">文章列表</el-menu-item>
            <el-menu-item index="/categories/create">新建文章</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>
            全局管理
          </template>
          <el-menu-item-group>
            <template slot="title">管理</template>
            <el-menu-item index="/categories/comment">留言管理</el-menu-item>
            <el-menu-item index="/categories/timeline">时间线管理</el-menu-item>
            <el-menu-item index="/categories/timelinelist"
              >时间线管理-列表</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>
            管理员管理
          </template>
          <el-menu-item-group>
            <template slot="title">管理</template>
            <el-menu-item index="/admin_users/creat">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item> -->
            <el-dropdown-item command="outLogin">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>LSH</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {},
  methods: {
    handleCommand(command) {
      if (command === "outLogin") {
        sessionStorage.clear();
        this.$router.push("/");
      }
    },
  },
};
</script>