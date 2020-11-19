<template>
  <el-container :class="{ moon: !$store.state.isFighting, container: true }">
    <el-header class="header">
      <div class="toggleStatus" @click="toggleState">
        <i class="icon el-icon-moon" v-show="$store.state.isFighting"></i>
        <i class="el-icon-sunny" v-show="!$store.state.isFighting"></i>
        <span v-show="$store.state.isFighting">Dream </span>
        <span v-show="!$store.state.isFighting">Fighting </span>
      </div>

      <nav>
        <router-link to="/home">首页 </router-link>
        <router-link to="/tag">标签 </router-link>
        <router-link to="/timeline">时间线 </router-link>
        <router-link to="/message">留言板 </router-link>
        <router-link to="/about">关于 </router-link>
      </nav>
    </el-header>
  </el-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toggleState() {
      this.$store.commit("toggleFighting");
    },
  },
};
</script>
<style>
.moon .toggleStatus,
.moon nav a {
  color: #eee;
}
.header {
  height: 160px !important;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.toggleStatus {
  cursor: pointer;
}
.toggleStatus i {
  font-size: 32px;
}
.toggleStatus span {
  font-size: 30px;
  display: inline-block;
  margin-left: 10px;
}
nav {
  font-size: 0;
}
nav a {
  text-decoration: none;
  display: inline-block;
  list-style: none;
  font-weight: 700;
  margin-right: 18px;
  font-size: 18px;
  color: #000;
}
.current {
  padding-bottom: 5px;
  border-bottom: 2px solid #a4b6df;
}
</style>