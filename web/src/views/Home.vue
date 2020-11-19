<template>
  <div :class="{ moon: !$store.state.isFighting }">
    <el-carousel indicator-position="none" height="380px">
      <el-carousel-item v-for="item in carouselItem" :key="item.name">
        <el-image :src="item.cover"> </el-image>
        <div class="article_carousel">
          <h3>{{ item.name }}</h3>
          <div>
            <el-tag v-for="tag in item.tags" :key="tag">{{ tag }}</el-tag>
          </div>
          <p>{{ item.time }}</p>
        </div>
      </el-carousel-item>
    </el-carousel>

    <div class="articles-list" :class="{ moon: !$store.state.isFighting }">
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
            <span class="info-detail">
              <i
                ><svg
                  t="1605609999116"
                  class="icon"
                  viewBox="0 0 1025 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3032"
                  width="17"
                  height="17"
                >
                  <path
                    d="M840.656 192.119c30.637 0 55.523 24.938 55.523 55.562v391.25c0 30.561-24.885 55.374-55.523 55.374h-136.68c-35.39 0-64.026 28.626-64.026 63.938v15.249c-39.891-32.375-79.783-64.811-79.783-64.811-11.38-9.314-25.635-14.376-40.392-14.376H183.327c-30.575 0-55.46-24.813-55.46-55.374V247.68c0-30.625 24.885-55.562 55.46-55.562h657.329m0-64.001H183.328c-65.964 0-119.486 53.562-119.486 119.562v391.25c0 65.875 53.522 119.375 119.486 119.375h336.448s139.182 113.25 158.065 128c8.878 6.875 15.256 9.812 19.508 9.812 4.753 0 6.878-3.75 6.753-9.812-0.188-11.375-0.125-128-0.125-128h136.68c66.09 0 119.55-53.5 119.55-119.374V247.68c-0.003-66-53.462-119.563-119.551-119.563z"
                    p-id="3033"
                    fill="#2c2c2c"
                  ></path>
                  <path
                    d="M752.12 448.118c0 26.562-21.571 48-48.02 48-26.51 0-48.02-21.438-48.02-48 0-26.563 21.51-48 48.02-48 26.449 0 48.02 21.438 48.02 48zM560.042 448.118c0 26.562-21.57 48-48.018 48-26.543 0-48.02-21.438-48.02-48 0-26.563 21.477-48 48.02-48 26.446 0 48.018 21.438 48.018 48zM367.965 448.118c0 26.562-21.572 48-48.02 48-26.542 0-48.019-21.438-48.019-48 0-26.563 21.477-48 48.019-48 26.448 0 48.02 21.438 48.02 48z"
                    p-id="3034"
                    fill="#2c2c2c"
                  ></path></svg
              ></i>
              {{ item.comment.length }}
            </span>
          </div>
        </div>
        <el-image :src="item.cover"></el-image>
      </div>
    </div>

    <el-pagination
      background
      layout="total, prev, pager, next"
      :page-size="pageSize"
      :total="pageTotal"
      @current-change="changePage"
      @size-change="changeSize"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carouselItem: [],
      data: [],
      pageSize: 10,
      pageTotal: 0,
      paragraph: {
        from: 0,
        to: this.pageSize,
      },
    };
  },
  components: {},
  methods: {
    async fetch() {
      const res = await this.$http.get(`categories`);
      this.data = res.data;
      this.pageTotal = res.data.length;
      this.data = this.data.slice(0, this.pageSize);
      this.carouselItem = this.data.slice(0, 4);
    },
    gotoDetail(item) {
      this.$router.push({ path: "/detail", query: { id: item._id } });
    },
    changeSize() {},
    async changePage(val) {
      console.log(val);
      const res = await this.$http.get(`categories/${val}`);
      this.data = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style>
.moon .el-carousel {
  color: #eee;
}

.articles-list.moon {
  background-color: #3b3a3a !important;
}

.el-carousel__item {
  display: flex;
}
.el-image {
  width: 53%;
  border-top-right-radius: 8px;
  height: 100%;
}
.el-carousel__item .article_carousel {
  width: 30%;
  height: 50%;
  margin: auto;
  position: relative;
  bottom: 35px;
  z-index: 999999;
}
.el-carousel__item .article_carousel h3 {
  font-size: 35px;
  margin-bottom: 10px;
}

.articles-list {
  border-radius: 8px;
  background-color: #fff;
  width: 75%;
  margin: 0 auto;
  position: relative;
  bottom: 70px;
  z-index: 1500;
}
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

.articles-listitem .info-footer span i {
  /* line-height: 21px; */
  display: block;
  float: left;
  margin-right: 5px;
}

.el-tag--light {
  margin: 0 10px 5px 0;
  color: #000;
  background-color: #eee9e4;
  border: 0;
}
.el-pagination {
  text-align: center;
}
</style>