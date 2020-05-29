<template>
  <div>
    <!-- 搜索弹窗 -->
    <el-dialog title="搜索记录" :visible.sync="dialogSearchVisible" :before-close="disagreeSearch">
      <el-form :model="search" label-position="right" label-width="160px">
        <el-form-item label="试卷名称">
          <el-input v-model="search.pname" class="inputBox"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disagreeSearch">取 消</el-button>
        <el-button type="primary" @click="agreeSearch">搜 索</el-button>
      </div>
    </el-dialog>
    <!-- 表格卡片 -->
    <el-card>
      <div slot="header" class="clearfix">
        <el-tag effect="dark" style="font-size:18px">考试列表</el-tag>
        <el-button icon="el-icon-search" circle style="float:right" @click="handleSearch"></el-button>
      </div>
      <div class="moveBox">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          style="width: 100%"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="pname" label="试卷名称"></el-table-column>
          <el-table-column prop="pid" label="试卷编号"></el-table-column>
          <el-table-column prop="ptime" label="答题时长"></el-table-column>
          <el-table-column prop="tid" label="截止时间"></el-table-column>
          <el-table-column prop="date" label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <!-- <el-button v-show="tableData.tid>0" size="mini" type="text" @click="handleExam(scope.$index)">开始考试</el-button> -->
                <el-button size="mini" type="text" @click="handleExam(scope.row.pid)">查看考试详情</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
      <br />
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    //页面被创建时执行一次查询函数
    this.acceptData();
    //初始化表单
    // this.search = this.searchModel;
    // this.search.maxSurTime = this.getNowFormatDate(0);
    // this.search.minSurTime = this.getNowFormatDate(10);
  },
  data() {
    return {
      //【分页】相关数据
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      // total: 0, //本次查询数据总数
      tableData: [],
      //本次查询的数据总集
      //【搜索】相关数据
      dialogSearchVisible: false,
      search: {
        ptime: "",
        tid: "",
        deadtime: ""
      },
      backendUrl: ""
    };
  },
  methods: {
    handleSizeChange: function(size) {
      this.pagesize = size;
      // console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      // console.log(this.currentPage)  //点击第几页
    },
    //查询数据函数
    acceptData() {
      let self = this;
      axios({
        method: "get",
        url: "http://101.200.135.43:8888/paper/listPaper"
      })
        .then(res => {
          console.log(res);
          self.tableData = res.data;
          // self.total = self.tableData.length;
          console.log("发送服务器成功执行");
          console.log(res.data);
        }) //发送服务器成功执行
        .catch(err => {
          console.log(err);
          console.log("发送服务器失败执行");
        }); //发送服务器失败执行
    },
    transformRequest(obj) {
      let str = [];
      for (let p in obj) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
      return str.join("&");
    },
    //翻页函数
    currentChange(currentPage) {
      this.currentPage = currentPage;
    },
    /**
     * 查看考试详情
     */
    handleExam(index) {
      console.log(index);
      const routeUrl = this.$router.resolve({
        path: `/exam/${index}`
      });
      window.open(routeUrl.href, "_blank");
    },
    /**
     * 搜索操作
     */
    //点击搜索按钮
    handleSearch() {
      this.dialogSearchVisible = true;
    },
    //取消搜索方法
    disagreeSearch() {
      this.dialogSearchVisible = false;
      this.search = this.firstForm;
      // this.search = this.searchModel;
    },
    //确定搜索方法
    agreeSearch() {
      let self = this;
      self.dialogSearchVisible = false;
      axios({
        method: "get",
        url: self.backendUrl + "/...",
        // url: "http://192.144.227.168:8089/info/insert",
        data: self.search
      })
        .then(res => {
          console.log(res);
          self.tableData = res.data.data;
          self.$notify({
            title: "成功",
            message: "搜索成功！",
            type: "success"
          });
          console.log("发送服务器成功执行，搜索成功");
          self.acceptData();
        }) //发送服务器成功执行
        .catch(err => {
          console.log(err);
          self.$notify.error({
            title: "错误",
            message: "搜索失败！"
          });
          console.log("发送服务器失败执行,搜索失败");
        }); //发送服务器失败执行

      this.dialogSearchVisible = false;
    }
  }
};
</script>
<style scoped>
.month {
  margin-left: 8px;
}
</style>