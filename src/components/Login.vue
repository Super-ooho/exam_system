<template>
  <div id="box">
    <div id="star app">
      <vue-particles
        color="#409EFF"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#409EFF"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      ></vue-particles>
    </div>
    <!-- 卡片正面 -->
    <transition name="el-zoom-in-center">
      <el-card class="box-card" v-show="show">
        <div slot="header" class="clearfix">
          <h1 @click="show = !show" class="titleH1">在线考试系统</h1>
        </div>
        <el-form :model="userInfo">
          <el-form-item>
            <el-input placeholder="用户名" v-model="userInfo.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="密码" type="password" v-model="userInfo.pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-radio v-model="userInfo.jur" label="3">学生</el-radio>
            <el-radio v-model="userInfo.jur" label="2">老师</el-radio>
            <el-radio v-model="userInfo.jur" label="1">管理员</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="clickLogin(userInfo)">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </transition>
    <!-- 卡片背面 -->
    <transition name="el-zoom-in-center">
      <el-card class="box-card" v-show="!show">
        <div slot="header" class="clearfix">
          <h1>注册</h1>
        </div>
        <el-form
          :model="student"
          :rules="rules"
          ref="student"
          label-position="right"
          label-width="100px"
          class="moveBox"
          size="mini"
        >
          <el-form-item label="学号" prop="uid">
            <el-input v-model="student.uid"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="student.pwd"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="uname">
            <el-input v-model="student.uname"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="student.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="student.email"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="uclass">
            <el-select v-model="student.uclass" placeholder="请选择专业">
              <el-option label="软件工程" value="软件工程"></el-option>
              <el-option label="教育技术" value="教育技术"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('student')">立即创建</el-button>
          </el-form-item>
        </el-form>
        <br />
        <el-link type="primary" @click="show=!show">已有帐号 去登陆</el-link>
      </el-card>
    </transition>
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    this.pageShowOnly();
  },
  name: "Login",
  data() {
    return {
      show: true,
      userInfo: {
        username: "",
        pwd: "",
        jur: ""
      },
      student: {
        uid: "",
        uname: "",
        pwd: "",
        phone: "",
        email: "",
        uclass: ""
      },
      rememberID: true,
      rememberPassword: false,
      loading: false,
      rules: {
        uid: [{ required: true, message: "请填写学号", trigger: "blur" }],
        uname: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        pwd: [{ required: true, message: "请设置密码", trigger: "blur" }],
        email: [{ email: true,message:"请输入正确的邮箱格式" }]
      }
    };
  },
  methods: {
    pageShowOnly() {
      this.$store.dispatch("removeAllAction");
    },
    clickLogin() {
      //发送网络请求
      let xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        // eslint-disable-next-line no-undef
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      let self = this;
      // eslint-disable-next-line no-console
      xmlhttp.open(
        "POST",
        "http://101.200.135.43:8888/user/login?username=" +
          this.userInfo.username +
          "&pwd=" +
          this.userInfo.pwd +
          "&jur=" +
          this.userInfo.jur,
        true
      );
      xmlhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xmlhttp.send(null);
      xmlhttp.onreadystatechange = doResult; //设置回调函数
      // eslint-disable-next-line no-unused-vars
      function doResult(data) {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          let data = xmlhttp.responseText;
          if (data == true && this.userInfo.jur == "1") {
            //将登录状态写入store.state
            self.$store.dispatch("loginAction", {
              loginInfo: self.userInfo
            });
            // 提示登录成功的信息
            //跳转到管理员界面
            self.$router.push({ path: '/manager' });
          } else if (data == true && this.userInfo.jur == "2") {
            //跳转到老师界面
            self.$router.push({ path: '/teacher' });
          } else if (data == true && this.userInfo.jur == "3") {
            //跳转到学生界面
            self.$router.push({ path: '/student' });
          } else if (data == false) {
            self.$notify.error({
              title: "登录失败",
              message: "没有此用户或密码错误"
            });
          }
        } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
          //提示登录失败的信息
          self.$notify.error({
            title: "登录失败",
            message: "请检查网络"
          });
          return false;
        }
      }
    },
    submitSuccess() {
      this.$notify({
        title: "成功",
        message: "成功注册",
        type: "success"
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    transformRequest(obj) {
      var str = [];
      for (var p in obj) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
      return str.join("&");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //如果表单验证成功
          console.log(JSON.stringify(this.student));
          axios({
            method: "post",
            url: "http://101.200.135.43:8888/user/register",
            data: this.student
          })
            .then(res => {
              console.log(res);
              console.log("发送服务器成功执行");
              this.submitSuccess();
            }) //发送服务器成功执行
            .catch(err => {
              console.log(err);
              console.log("发送服务器失败执行");
              this.submitError();
            }); //发送服务器失败执行
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitError() {
      this.$notify.error({
        title: "失败",
        message: "注册失败",
        type: "error"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#box {
  /* display: flex;
  display: -webkit-flex; */
  height: 100vh;
  width: 100vw;
  /* align-items: center;
  justify-content: center; */
}
#star {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -100;
}
#particles-js,
.particles-js-canvas-el {
  width: 100%;
  height: 100%;
}
.box-card {
  position: fixed;
  z-index: 100;
  width: 35vw;
  top: 25%;
  left: 32.5vw;
  text-align: center;
}
.titleH1 {
  transition-duration: 300ms;
}
.titleH1:hover {
  transition-duration: 300ms;
  color: #409eff;
}
</style>
