<template>
  <div class="detail">
    <div class="detail-banner">
      <div class="article-info">
        <h3>{{ data.name }}</h3>
        <div class="detail-tags">
          <el-tag v-for="tag in data.tags" :key="tag">{{ tag }}</el-tag>
        </div>
        <i class="el-icon-edit"></i>
        <span class="time">{{ data.time }}</span>
      </div>
      <el-image :src="data.cover"></el-image>
    </div>
    <div class="detail-container">
      <div class="edit-body" v-html="data.editor"></div>
      <div class="likebtn">
        <svg
          t="1605354215881"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1793"
          width="200"
          height="200"
        >
          <path
            d="M977.6128 374.1696c0-155.2384-121.856-281.6-271.36-281.6A265.5232 265.5232 0 0 0 512 178.7904a265.8816 265.8816 0 0 0-194.2528-86.2208c-149.6064 0-271.36 126.2592-271.36 281.6a122.88 122.88 0 0 0 0.9216 13.6704v3.84A239.5136 239.5136 0 0 0 66.9184 481.28c0.4096 1.1776 0.8192 2.304 1.3312 3.328C150.9376 683.1104 469.248 911.36 482.7648 921.6a46.6944 46.6944 0 0 0 57.1904-0.256c11.5712-9.0112 283.0848-204.4416 390.8608-389.12a191.6928 191.6928 0 0 0 9.8816-17.5104c0.8192-1.6896 1.5872-3.328 2.5088-5.12l0.3584-0.768a17.3056 17.3056 0 0 1 1.1776-1.8944 299.8784 299.8784 0 0 0 15.6672-35.84 223.7952 223.7952 0 0 0 16.64-79.7696v-5.12a113.0496 113.0496 0 0 0 0.5632-12.032z"
            fill="#d81e06"
            p-id="1794"
          ></path>
        </svg>
        <br />
        <span>喜欢这篇文章★~★</span>
      </div>
      <el-divider content-position="left">
        <i class="el-icon-collection"></i>
        <span>转载说明</span>
      </el-divider>
      <p class="statement">
        欢迎转载，请同时附上本文链接
        <a :href="href" style="text-decoration: none; color: blue">{{
          href
        }}</a>
        ，谢谢
      </p>

      <el-divider content-position="left">
        <i class="el-icon-edit"></i>
        <span>历史评论</span>
      </el-divider>

      <div class="comments">
        <el-form @submit.native.prevent="sendComment" class="add-comment">
          <el-form-item class="nickname">
            <el-input
              label-suffix="10"
              v-model.trim="comment.name"
              placeholder="请填入昵称（必填，最长10个字段）"
            ></el-input>
          </el-form-item>

          <el-form-item class="body">
            <el-input
              v-model.trim="comment.edit"
              type="textarea"
              placeholder="请输入评论（最长100个字段）"
            ></el-input>
          </el-form-item>

          <div class="btn-container">
            <el-button
              circle
              icon="el-icon-s-promotion"
              native-type="submit"
            ></el-button>
            <el-button
              @click="comment = {}"
              circle
              icon="el-icon-delete-solid"
            ></el-button>
          </div>
        </el-form>
        <div class="comment-list" v-for="item in commentItem" :key="item._id">
          <el-card shadow="never">
            <h5>{{ item.name }}</h5>
            <p>{{ item.edit }}</p>
            <p class="time">
              <span>{{ item.time }}</span>
            </p>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {},
      href: window.location.href,
      comment: {},
      commentItem: {},
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/detail/${this.$route.query.id}`);
      this.data = res.data;

      const comment = await this.$http.get(
        `/categories/comment/${this.$route.query.id}`
      );
      this.commentItem = comment.data.comment;
    },
    async sendComment() {
      const date = new Date();
      this.comment.time = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
      `;
      await this.$http.put(
        `/categories/comment/${this.$route.query.id}`,
        this.comment
      );
      this.fetch();
      this.comment = {};
    },
  },
  created() {
    this.fetch();
  },
  mounted() {
    this.$nextTick(() => {
      document.querySelector("#app").scrollTop = 0;
    });
  },
};
</script>
<style>
.detail .detail-banner {
  position: relative;
}
.detail .detail-banner .el-image {
  width: 100%;
  height: 380px;
  -webkit-filter: brightness(85%);
  filter: brightness(85%);
}
.detail .detail-banner .article-info {
  color: #fff;
  position: absolute;
  z-index: 1000;
  width: 60%;
  top: 25%;
  left: 20%;
}
.detail .detail-banner .article-info h3 {
  font-size: 35px;
  margin-bottom: 25px;
}
.detail .detail-banner .article-info .el-tag--light {
  background-color: #eee9e4;
  color: #000;
  border: none;
  border-radius: 8px;
  margin-right: 10px;
  margin-bottom: 25px;
  cursor: pointer;
}
.detail .detail-banner .article-info .el-icon-edit {
  display: inline-block;
  margin-right: 5px;
}
.detail .detail-banner .article-info span {
  font-size: 15px;
}

.detail .detail-container {
  border-radius: 8px;
  background-color: #fff;
  width: 75%;
  margin: 0 auto;
  position: relative;
  bottom: 70px;
  z-index: 1000;
}
.detail .detail-container .edit-body {
  padding: 40px 5%;
}
.detail .detail-container .likebtn {
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.detail .detail-container .likebtn svg {
  width: 35px;
  height: 35px;
}
.detail .detail-container .likebtn span {
  font-size: 15px;
}
.el-divider span {
  font-size: 18px;
  font-weight: 700;
}
.el-divider i {
  font-size: 18px;
  display: inline-block;
  margin-right: 5px;
}
.detail .detail-container .statement {
  width: 90%;
  margin: 40px auto 60px auto;
}
.comments {
  width: 75%;
  margin: 0 auto;
}
.comments .add-comment .nickname {
  width: 45%;
  margin: 20px 0 15px 0;
}
.comments .add-comment .body {
  width: 100%;
}
.comments .add-comment .btn-container {
  width: 100%;
  text-align: right;
}
.comments .add-comment .btn-container .el-button {
  margin: 10px 0 0 25px;
  font-size: 18px;
}
.comments .comment-list {
  margin-top: 10px;
}
.comments .comment-list .el-card h5 {
  -webkit-box-shadow: -4px 0 0 -1px #a4b6df;
  box-shadow: -4px 0 0 -1px #a4b6df;
  font-size: 17px;
}
.comments .comment-list .el-card p {
  font-size: 15px;
  margin: 15px 0 15px 0;
}
.comments .comment-list .el-card .time {
  text-align: right;
  margin: 0;
  font-size: 14px;
}
</style>