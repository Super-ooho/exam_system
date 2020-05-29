<template>
  <div id="body">
    <!-- 点击提示按钮后弹出层 -->
    <el-dialog title="使用提示" :visible.sync="dialogVisible" width="60%">
      <ul>
        <li>
          <el-link
            type="primary"
            href="https://www.google.cn/intl/zh-CN/chrome/"
            target="blank"
          >推荐使用谷歌Chrome浏览器</el-link>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击用户按钮后拉出抽屉 -->
    <el-drawer size="20%" :show-close="false" :visible.sync="drawer">
      <div id="drawerBox">
        <el-avatar>{{userInfo.name}}</el-avatar>
        <h1>{{userInfo.name}}</h1>
        <!-- <el-divider></el-divider> -->
        <br />
        <el-collapse>
          <el-collapse-item title="个人信息" name="1">
            <div>个人信息</div>
          </el-collapse-item>
          <el-collapse-item title="安全" name="2">
            <div>修改密码</div>
          </el-collapse-item>
          <el-collapse-item title="系统设置" name="3">
            <div>系统设置</div>
          </el-collapse-item>
          <el-collapse-item title="新建用户" name="4">
            <div>新建用户</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-drawer>

    <span id="title">学生信息档案系统</span>
    <div class="inlineBox" id="rightBox">
      <div class="inlineBox" id="rightInsideBox">
        <!-- 提示按钮 -->
        <el-button
          type="primary"
          icon="el-icon-s-opportunity"
          circle
          @click="dialogVisible=!dialogVisible"
        ></el-button>
        <!-- 用户按钮组 -->
        <el-button-group>
          <el-button type="primary" plain round @click="drawer=!drawer">
            {{userInfo.name}}
            <i class="el-icon-user-solid"></i>
          </el-button>
          <el-button type="primary" icon="el-icon-error" plain circle @click="logout()"></el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      drawer: false,
      dialogVisible: false,
      userInfo: {
        username: "admin",
        name: "学生",
        email: "shunhanghu@qq.com",
        tel: "17833110803",
        job: "老师"
      }
    };
  },
  methods: {
    //退出登陆
    logout() {
      this.$confirm("此操作将退出登录, 是否继续?", "退出登录", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$store.dispatch("logoutAction");
          this.$router.push({ name: "Login" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录"
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#body {
  background-color: #409eff;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#title {
  font-size: 40px;
  line-height: 60px;
}
.inlineBox {
  display: inline-block;
}
#rightBox {
  float: right;
  height: 60px;
  line-height: 60px;
  text-align: right;
}
#rightInsideBox {
  height: 60px;
  line-height: 60px;
}
ul {
  margin-left: 20px;
}
#drawerBox {
  text-align: center;
  width: 100%;
  padding: 0 5%;
}
.itemText {
  text-align: left;
}
.itemText:hover {
  background-color: #e4e7ed;
}
.itemText:hover i {
  display: inline;
}
.itemText i {
  line-height: 40px;
  float: right;
  margin: 0 5px 0 0;
  display: none;
}
</style>