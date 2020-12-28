<template>
  <div class="tag">
    <div class="tags-top">
      <div class="tags-container">
        <el-badge v-for="tag in tags" :key="tag.tag" :value="tag.count">
          <el-button
            round
            @click="tagCategory(tag)"
            :class="{ active: tag.active }"
            >{{ tag.tag }}</el-button
          >
        </el-badge>
      </div>
      <el-image class="tags-background" :src="bannerURL"></el-image>
    </div>

    <div class="articles-list">
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
        <el-image :src="item.cover"></el-image>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allTag: [],
      tags: [],
      bannerURL:
        "https://cdn.pixabay.com/photo/2020/04/11/03/41/china-5028679_960_720.jpg",
      data: {},
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/home/categories`);
      for (const val of res.data) {
        this.allTag.push(val.tags);
      }
      this.allTag = this.allTag.toString().split(",");

      let result = [];
      for (let i = 0; i < this.allTag.length; i++) {
        let count = 0;
        if (result.indexOf(this.allTag[i]) === -1) {
          result.push(this.allTag[i]);
          this.tags.push({
            tag: this.allTag[i],
            count: ++count,
            active: false,
          });
        } else {
          for (let j = 0; j < this.tags.length; j++) {
            if (this.allTag[i] === this.tags[j].tag) {
              this.tags[j].count += 1;
            }
          }
        }
      }
    },
    async tagCategory(tag) {
      for (const val of this.tags) {
        val.active = false;
      }
      tag.active = true;

      const article = await this.$http.get(`/home/categories/tags/${tag.tag}`);
      this.data = article.data;
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
.tags-top {
  width: 100%;
  font-weight: 700;
  position: relative;
}
.tags-top .tags-container {
  position: absolute;
  z-index: 1000;
  width: 70%;
  top: 18%;
  left: 15%;
}
.tags-top .tags-background {
  width: 100%;
  height: 380px;
  -webkit-filter: brightness(85%);
  filter: brightness(85%);
}
.tags-top .tags-container .el-badge {
  margin: 0 13px 8px 0;
}
.tags-top .tags-container .el-badge .active {
  color: #fff;
  background-color: rgba(69, 94, 204, 0.747);
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
</style>