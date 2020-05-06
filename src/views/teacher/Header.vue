<template>
  <div class="header">
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">考试系统—教师界面</div>
            <div class="header-right">
            <div class="header-user-con">
                <!-- 用户头像 -->
                <div class="user-avator">
                    <!-- <img src="../assets/img/索罗.jpg" />s -->
                    <span class="username">管理员</span>
                    <span class="esc el-icon-switch-button" @click="quit"></span>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            collapse:false
        }
    },
    methods:{
        collapseChage() {
            this.collapse=!this.collapse,
            this.$store.commit("SET_COLLAPSE")
        },
        quit(){
            this.$router.push({path:'/'})
        }
    }
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background-color: #242f42;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    align-items:center;
    margin-top: 15px;
    font-size: 14px!important;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 15px;
}
.esc{
    margin-left: 15px;
    cursor: pointer;
    font-size: 20px;
}
</style>
