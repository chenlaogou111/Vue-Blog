<template>
  <el-footer>
    <div class="info-container">
      <div class="toggleStatus" @click="toggleState">
        <i class="icon el-icon-moon" v-show="$store.state.isFighting"></i>
        <i class="el-icon-sunny" v-show="!$store.state.isFighting"></i>
        <span v-show="$store.state.isFighting">Dream </span>
        <span v-show="!$store.state.isFighting">Fighting </span>
      </div>
      <a
        href="https://github.com/chenlaogou111?tab=repositories"
        target="_blank"
      >
        <i v-show="$store.state.isFighting"
          ><svg
            t="1605334086800"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1788"
            width="200"
            height="200"
          >
            <path
              d="M960 512a435.2 435.2 0 0 1-85.76 263.36 440 440 0 0 1-220.48 161.92 26.88 26.88 0 0 1-23.04-4.16 22.72 22.72 0 0 1-7.04-17.6v-122.88a104.64 104.64 0 0 0-30.4-82.88 416 416 0 0 0 59.52-10.24 218.24 218.24 0 0 0 54.72-23.04 164.8 164.8 0 0 0 47.04-38.4 184 184 0 0 0 32-61.44 293.76 293.76 0 0 0 12.16-88 168.64 168.64 0 0 0-46.4-120 154.88 154.88 0 0 0-4.48-119.04 76.48 76.48 0 0 0-47.04 6.4 300.48 300.48 0 0 0-53.76 25.6l-22.08 13.76a416 416 0 0 0-224 0c-6.4-4.48-14.4-9.28-24.64-15.68A326.08 326.08 0 0 0 326.4 256a82.88 82.88 0 0 0-50.24-8 156.8 156.8 0 0 0-4.16 120 173.76 173.76 0 0 0-46.08 120.64A288 288 0 0 0 238.08 576a196.48 196.48 0 0 0 32 61.44 152 152 0 0 0 47.04 39.04 267.84 267.84 0 0 0 54.72 23.04 414.08 414.08 0 0 0 59.84 10.24 92.48 92.48 0 0 0-28.8 60.16 99.2 99.2 0 0 1-26.56 8.32 167.36 167.36 0 0 1-32 2.88A69.12 69.12 0 0 1 303.36 768a109.44 109.44 0 0 1-32-36.48 96 96 0 0 0-28.16-30.4 80.64 80.64 0 0 0-28.8-14.08h-11.52a41.6 41.6 0 0 0-16.96 2.56q-4.8 2.88-2.88 6.72a44.16 44.16 0 0 0 5.44 8 55.36 55.36 0 0 0 7.68 7.36l4.16 2.56a78.08 78.08 0 0 1 25.6 22.08 157.76 157.76 0 0 1 18.24 29.44l5.76 13.44a72.32 72.32 0 0 0 25.6 36.16 96 96 0 0 0 38.72 16.64 196.16 196.16 0 0 0 40.32 4.16 182.08 182.08 0 0 0 32-2.24l13.44-2.24v83.84a23.04 23.04 0 0 1-7.68 17.6 27.84 27.84 0 0 1-23.36 4.16 438.08 438.08 0 0 1-219.2-162.88A427.84 427.84 0 0 1 64 512a437.44 437.44 0 0 1 60.16-224A443.52 443.52 0 0 1 288 124.16 437.44 437.44 0 0 1 512 64a437.44 437.44 0 0 1 224 60.16A443.52 443.52 0 0 1 899.84 288 436.8 436.8 0 0 1 960 512z"
              p-id="1789"
            ></path></svg
        ></i>
        <i v-show="!$store.state.isFighting">
          <svg
            t="1605334086800"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1788"
            width="200"
            height="200"
          >
            <path
              d="M960 512a435.2 435.2 0 0 1-85.76 263.36 440 440 0 0 1-220.48 161.92 26.88 26.88 0 0 1-23.04-4.16 22.72 22.72 0 0 1-7.04-17.6v-122.88a104.64 104.64 0 0 0-30.4-82.88 416 416 0 0 0 59.52-10.24 218.24 218.24 0 0 0 54.72-23.04 164.8 164.8 0 0 0 47.04-38.4 184 184 0 0 0 32-61.44 293.76 293.76 0 0 0 12.16-88 168.64 168.64 0 0 0-46.4-120 154.88 154.88 0 0 0-4.48-119.04 76.48 76.48 0 0 0-47.04 6.4 300.48 300.48 0 0 0-53.76 25.6l-22.08 13.76a416 416 0 0 0-224 0c-6.4-4.48-14.4-9.28-24.64-15.68A326.08 326.08 0 0 0 326.4 256a82.88 82.88 0 0 0-50.24-8 156.8 156.8 0 0 0-4.16 120 173.76 173.76 0 0 0-46.08 120.64A288 288 0 0 0 238.08 576a196.48 196.48 0 0 0 32 61.44 152 152 0 0 0 47.04 39.04 267.84 267.84 0 0 0 54.72 23.04 414.08 414.08 0 0 0 59.84 10.24 92.48 92.48 0 0 0-28.8 60.16 99.2 99.2 0 0 1-26.56 8.32 167.36 167.36 0 0 1-32 2.88A69.12 69.12 0 0 1 303.36 768a109.44 109.44 0 0 1-32-36.48 96 96 0 0 0-28.16-30.4 80.64 80.64 0 0 0-28.8-14.08h-11.52a41.6 41.6 0 0 0-16.96 2.56q-4.8 2.88-2.88 6.72a44.16 44.16 0 0 0 5.44 8 55.36 55.36 0 0 0 7.68 7.36l4.16 2.56a78.08 78.08 0 0 1 25.6 22.08 157.76 157.76 0 0 1 18.24 29.44l5.76 13.44a72.32 72.32 0 0 0 25.6 36.16 96 96 0 0 0 38.72 16.64 196.16 196.16 0 0 0 40.32 4.16 182.08 182.08 0 0 0 32-2.24l13.44-2.24v83.84a23.04 23.04 0 0 1-7.68 17.6 27.84 27.84 0 0 1-23.36 4.16 438.08 438.08 0 0 1-219.2-162.88A427.84 427.84 0 0 1 64 512a437.44 437.44 0 0 1 60.16-224A443.52 443.52 0 0 1 288 124.16 437.44 437.44 0 0 1 512 64a437.44 437.44 0 0 1 224 60.16A443.52 443.52 0 0 1 899.84 288 436.8 436.8 0 0 1 960 512z"
              p-id="1789"
              fill="#ffffff"
            ></path>
          </svg>
        </i>
      </a>
    </div>
    <p>
      友链：
      <el-link
        type="info"
        :underline="false"
        target="_blank"
        href="https://blog.zhangxc.cn/"
        >Zhangxc_Blog</el-link
      >
      <el-link
        type="info"
        :underline="false"
        target="_blank"
        href="http://www.wdhhh.cn/"
        >小王博客</el-link
      >
      <el-link
        type="info"
        :underline="false"
        target="_blank"
        href="http://www.hejunyes.top/"
        >jun</el-link
      >
      <el-link
        type="info"
        :underline="false"
        target="_blank"
        href="http://www.ycblog.top/"
        >ycBlog</el-link
      >
    </p>
    <p>&copy;2020 LSH.All rights reserved.</p>
    <el-link
      type="info"
      target="_blank"
      :underline="false"
      href="http://icp.chinaz.com/home/info?host=lshblog.top"
      >冀ICP备2020029330号-1</el-link
    >
  </el-footer>
</template>
<script>
export default {
  methods: {
    toggleState() {
      this.$store.commit("toggleFighting");
    },
  },
};
</script>
<style>
.el-footer {
  margin-top: 20px;
  text-align: center;
  color: #858483;
  font-size: 14px;
  padding: 10px 0;
}
.el-footer p {
  margin: 8px 0;
}
.el-footer a {
  font-size: 13px;
  margin-right: 15px;
  text-decoration: none;
}
.info-container {
  width: 23%;
  margin: 0 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  position: relative;
  right: 1.5%;
  color: #000;
}
.info-container .toggleStatus i {
  font-size: 25px;
}
.info-container .toggleStatus span {
  font-size: 20px;
  margin-left: 5px;
}
.info-container a svg {
  width: 25px;
  height: 25px;
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
</style>