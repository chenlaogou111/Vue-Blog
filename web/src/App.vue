<template>
  <div id="app" :class="{ moon: !$store.state.isFighting }">
    <nav-bar></nav-bar>

    <transition name="fade" mode="in-out">
      <keep-alive include="Home">
        <router-view></router-view>
      </keep-alive>
    </transition>

    <foot></foot>
  </div>
</template>

<script>
import NavBar from "./components/Head";
import Foot from "./components/Foot";
export default {
  name: "App",
  components: { NavBar, Foot },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  overflow: auto;
  background-color: #eeeded;
  scroll-behavior: smooth;
}
.fade-enter {
  opacity: 0;
}
.fade-leave {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 0.3s;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.3s;
}
</style>
