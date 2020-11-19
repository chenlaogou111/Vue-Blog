<template>
  <div class="article">
    <div
      class="articles-listitem"
      @click="gotoDetail(item)"
      v-for="item in data"
      :key="item.name"
    >
      <div class="article-info">
        <h3>{{ item.name }}</h3>
        <div class="tags">
          <el-tag v-for="tag in item.tags" :key="tag">{{ tag }}</el-tag>
        </div>
        <p>{{ item.summary }}</p>
        <div class="info-footer">
          <span class="time">{{ item.time }}</span>
        </div>
      </div>
      <el-image></el-image>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  components: {},
  methods: {
    async fetch() {
      const res = await this.$http.get(`categories`);
      this.data = res.data;
    },
    gotoDetail(item) {
      this.$router.push({ path: "/detail", query: { id: item._id } });
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style>
.articles-listitem {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 250px;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  -webkit-transition: 0.8s;
  transition: 0.8s;
}
.articles-listitem:hover {
  -webkit-transition: 0.8s;
  transition: 0.8s;
  -webkit-box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.2);
  box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.2);
}
.articles-listitem .article-info {
  -webkit-box-flex: 1.3;
  -ms-flex: 1.3;
  flex: 1.3;
  padding: 25px 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.articles-listitem .article-info h3 {
  font-size: 25px;
}
.articles-listitem .el-image {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  border-radius: 8px;
  -webkit-transition: 0.8s;
  transition: 0.8s;
}
.articles-listitem .info-footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 13px;
}
</style>