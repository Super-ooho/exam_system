<template>
  <div>
    <el-menu :unique-opened="true" :default-openeds="activeIndex">
      <!-- 一般信息 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>学籍信息</span>
        </template>
        <!-- <el-menu-item-group> -->
        <router-link :to="{name:'Sadd'}">
          <el-menu-item index="1-1">
            <i class="el-icon-circle-plus-outline"></i>添加
          </el-menu-item>
        </router-link>
        <!-- v-if="this.router.userInfo.job=1" -->
        <router-link :to="{name:'Sadm'}">
          <el-menu-item index="1-2">
            <i class="el-icon-s-operation"></i>管理
          </el-menu-item>
        </router-link>
        <router-link v-if="job=0" :to="{name:'Tadm'}">
          <el-menu-item index="1-2">
            <i class="el-icon-s-operation"></i>管理
          </el-menu-item>
        </router-link>
        <!-- </el-menu-item-group> -->
      </el-submenu>
      <!-- 现病史 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>管理员</span>
        </template>
        <!-- <el-menu-item-group> -->
        <router-link :to="{name:'SCadd'}">
          <el-menu-item index="2-1">
            <i class="el-icon-circle-plus-outline"></i>添加
          </el-menu-item>
        </router-link>
        <router-link :to="{name:'Tadm'}">
          <el-menu-item index="2-2">
            <i class="el-icon-s-operation"></i>管理
          </el-menu-item>
        </router-link>
        <!-- </el-menu-item-group> -->
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: true,
      activeIndex: ["1"]
    };
  },
  name: "NavMenu"
};
</script>
<style>
* {
  text-decoration-line: none;
}
</style>


