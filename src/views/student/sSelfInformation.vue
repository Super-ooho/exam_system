<template>
  <div> 
      <template>
        <el-carousel :interval="4000" type="card" height="250px" style="width:1000px; margin:0 auto;">
          <el-carousel-item v-for="item in img" :key="item">
            <img :src="item" class="image">
          </el-carousel-item>
        </el-carousel>
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>考试安排</span>
            </div>
            <div class="block">
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in tableData"
                  :key="index"
                  :color="domcolor"
                  :timestamp="activity.deadline">
                  {{activity.pname}}
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
          <el-card class="box-card card2" >
            <div slot="header" class="clearfix">
              <span>快速导航</span>
            </div>
            <div v-for="goal in goals" :key="goal.add" class="text item">
              <a :href="goal.add" class="a" target="_blank">{{goal.content}}</a>
            </div>
          </el-card>
        </div>
        
        
      </template>
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    this.acceptData();
  },
  data() {
    return {
      tableData: [], //本次查询的数据总集
      domcolor: "#0bbd87",
      img:[
        "http://www.nenu.edu.cn/__local/8/FE/21/FD73743BCF84BEFB92662A03C64_F7DFDEF4_C9EB.jpg",
        "http://www.nenu.edu.cn/__local/F/6B/A6/1A4E5183C912C13CE599CD75520_A2D573BF_80825.jpg",
        "http://www.nenu.edu.cn/__local/0/9F/DC/82DFDDF33BE1CE745A57DEB1B71_5DE7CBD5_5A0C5.jpg",
        "http://www.nenu.edu.cn/__local/1/DB/91/C38DFD7C2AD392BD79FC8EC8EC4_A5836862_71D6B.jpg",
        "http://www.nenu.edu.cn/__local/5/28/8B/F8B9D5F3BD55929162A1093485B_C0C72AA5_39E9C.jpg",
        "http://www.nenu.edu.cn/__local/2/AF/59/00D9944963270FE555AF68A1163_A93506E1_1FD19.jpg"
      ],
        goals:[
        {
          add:"http://www.nenu.edu.cn/",
          content:"东北师范大学官方网站"
        },
        {
          add:"https://webvpn.nenu.edu.cn/users/sign_in",
          content:"东北师范大学WebVPN"
        },
        {
          add:"https://www.icourse163.org/",
          content:"中国大学MOOC(慕课)"
        },
        {
          add:"https://www.zhihuishu.com/",
          content:"智慧树在线教育"
        },
      ],
    };
  },
  methods: {
    //查询数据函数
    acceptData() {
      let self = this;
        axios({
            method: "get",
            url: "http://101.200.135.43:8888/paper/listPaper",
        }).then(res => {
            console.log(res);
            self.tableData = res.data;
            console.log("上面是试卷集");
        })//发送服务器成功执行
            .catch(err => {
                console.log(err);
                console.log("发送服务器失败执行");
            });//发送服务器失败执行
    },
  }
};
</script>
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .image{
    width: 500px;
    height: 250px;
  }


  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    float: left;
    margin-left: 150px;
  }
  .card2{
    margin-left: 40px;
  }
  .a{
    color: black;
    text-decoration: none;
  }
</style>