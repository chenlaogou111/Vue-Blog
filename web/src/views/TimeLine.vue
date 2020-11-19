<template>
  <div class="time_line">
    <el-timeline>
      <el-timeline-item
        v-for="item in data"
        :key="item._id"
        :timestamp="item.time"
        placement="top"
      >
        <el-card>
          <h4>{{ item.name }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  data() {
    return { data: {} };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/timeline");
      this.data = res.data;
      this.data = this.data.reverse();
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style>
.el-timeline {
  width: 70%;
  margin: 0 auto;
}
.el-timeline-item__tail,
.el-timeline-item__node {
  background-color: rgb(199, 198, 197);
}
.el-timeline .el-timeline-item__content .el-card__body h4 {
  font-size: 17px;
  margin-bottom: 10px;
  color: rgb(146, 31, 2);
}
</style>