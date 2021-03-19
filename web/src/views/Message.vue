<template>
  <div class="message">
    <el-divider content-position="left">
      <i class="el-icon-edit"></i>
      <span>历史留言</span>
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
</template>
<script>
export default {
  data() {
    return {
      comment: {},
      commentItem: [],
    };
  },
  methods: {
    async sendComment() {
      if (
        !this.comment.edit ||
        !this.comment.name ||
        this.comment.name.length > 10 ||
        this.comment.edit.length > 100
      ) {
        this.$message({
          type: "error",
          message: "请输入正确！",
        });
        return false;
      }

      const date = new Date();
      this.comment.time = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      const res = await this.$http.post("/comment", this.comment);

      this.fetch();
      this.comment = {};
    },
    async fetch() {
      const res = await this.$http.get("/comment");
      this.commentItem = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style>
.message {
  margin-top: 20px;
}
.message .el-divider {
  width: 75%;
  margin: 0 auto 60px auto;
}
.message .el-divider .is-left {
  background-color: #eeeded;
}
.message .el-divider i {
  font-size: 18px;
}
.message .el-divider span {
  font-size: 18px;
  font-weight: 700;
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