<template>
  <div id="app">
    <el-container v-if="isShow">
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside>
          <NavMenu />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <router-view v-else-if="!isShow"></router-view>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import NavMenu from "@/components/NavMenu.vue";
export default {
  components: {
    Header,
    NavMenu
  },
  computed: {
    //  不能使用箭头函数！
    //  But Why?
    // isShow: () => store.state.isLogined
    isShow() {
      return this.$store.getters.getIsLogined;
    }
  },
  created() {
    // this.$store.dispatch("synchronousAction");
  }
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
}
/* ::-webkit-scrollbar {
  /*隐藏滚轮*/
  /* display: none; */
/* } */ */
.moveBox {
  height: 85vh;
  overflow-y: auto;
}
.moveBox .el-form-item__content {
  width: 300px;
}

/* .el-input__inner,
.el-input {
  width: 300px;
} */
.el-header {
  background-color: #409eff;
  color: #ffffff;
}

.label {
  text-align: right;
  vertical-align: middle;
  /* float: left; */
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
