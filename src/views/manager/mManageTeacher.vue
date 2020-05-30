<template>
  <div>
    <el-container>
    <!-- 增加弹窗 -->
    <el-dialog :title="addTitle" :visible.sync="dialogAddVisible">
      <el-form
        :model="addModel"
        label-position="right"
        label-width="160px"
        class="moveBox"
      >

        <el-form-item label="教师编号" prop="tid">
          <el-input v-model="addModel.tid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="addModel.pwd"></el-input>
        </el-form-item>
        <el-form-item label="教师用户名" prop="tname">
          <el-input v-model="addModel.tname"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addModel.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addModel.email"></el-input>
        </el-form-item>
        
        <!-- </div> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disagreeAdd">取 消</el-button>
        <el-button type="primary" @click="agreeAdd">增 加</el-button>
      </div>
    </el-dialog>
    <!-- 搜索弹窗 -->
    <el-dialog title="搜索记录" :visible.sync="dialogSearchVisible" :before-close="disagreeSearch">
      <el-form :model="search" label-position="right" label-width="160px">
        <el-form-item label="教师编号">
          <el-input v-model="search.tid" class="inputBox"></el-input>
        </el-form-item>
        <el-form-item label="教师姓名">
          <el-input v-model="search.tname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="search.pwd"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input-number v-model="search.phone"></el-input-number>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="search.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disagreeSearch">取 消</el-button>
        <el-button type="primary" @click="agreeSearch">搜 索</el-button>
      </div>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog :title="editName" :visible.sync="dialogFormVisible" :before-close="disagreeEdit">
      <el-form
        :model="editSInformation"
        label-position="right"
        label-width="160px"
        class="moveBox"
      >
        <el-form-item label="教师编号">
          <el-input v-model="editSInformation.tid" class="inputBox"></el-input>
        </el-form-item>
        <el-form-item label="教师姓名">
          <el-input v-model="editSInformation.tname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editSInformation.pwd"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input-number v-model="editSInformation.phone"></el-input-number>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editSInformation.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disagreeEdit">取 消</el-button>
        <el-button type="primary" @click="agreeEdit">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="谨慎" :visible.sync="dialogVisible" width="30%" :before-close="disagreeDel">
      <span>是否确定删除本条记录，此次操作不可撤销。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disagreeDel">取 消</el-button>
        <el-button type="danger" @click="agreeDel">删 除</el-button>
      </span>
    </el-dialog>
    <!-- 表格卡片 -->
    <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <el-tag effect="dark" style="font-size:18px">教师信息管理</el-tag>
        <el-button type="primary" style="margin-top: 20px; margin-left:100px" size="mini" @click="handleAdd">增加<i class="el-icon-upload el-icon--right"></i></el-button>

        <el-divider direction="vertical"></el-divider>
        <el-pagination
          hide-on-single-page
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          :page-size="pageSize"
          style="display:inline-block"
          @current-change="currentChange"
        ></el-pagination>
        <el-button icon="el-icon-search" circle style="float:right" @click="handleSearch"></el-button>
      </div>
      <div class="moveBox">
        <el-table
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          stripe
          style="width: 100%"
        >
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column prop="tname" label="教师用户名"></el-table-column>
          <el-table-column prop="tid" label="教师编号"></el-table-column>
          <el-table-column prop="pwd" label="密码"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="date" label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
                  <i class="el-icon-edit"></i>
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                  <i class="el-icon-close"></i>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
    </el-card>
    </el-main>
    </el-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    //页面被创建时执行一次查询函数
    this.acceptData();
    //初始化表单
    this.search = this.searchModel;
    // this.search.maxSurTime = this.getNowFormatDate(0);
    // this.search.minSurTime = this.getNowFormatDate(10);
  },
  data() {
    return {
      //【分页】相关数据
      total: 0, //本次查询数据总数
      tableData: [
        
      ], //本次查询的数据总集
      currentPage: 1, //当前页
      pageSize: 10, //每页显示多少条记录
      //【增加】相关数据
      dialogAddVisible: false,
      addTitle: "",//增加弹窗标题
      firstForm:{
        tid: "",
        pwd:"",
        tname: "",
        phone: "",
        email: "",
      },
      addModel: {
        tid: "",
        pwd:"",
        tname: "",
        phone: "",
        email: "",
      },
      //【删除】相关数据
      dialogVisible: false, //确定删除弹窗隐现的布尔值
      delId: null, //即将被删除的数据ID
      delIndex: null,
      //【搜索】相关数据
      dialogSearchVisible: false,
      search: {},
      searchModel: {
        tid: "",
        pwd:"",
        tname: "",
        phone: "",
        email: "",
      },
      //【修改】相关数据
      dialogFormVisible: false,
      editName: null,
      editId: null,
      editSInformation: {
        tid: "",
        pwd:"",
        tname: "",
        phone: "",
        email: "",
      },
    };
  },
  methods: {
    //查询数据函数
    acceptData() {
      let xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        // eslint-disable-next-line no-undef
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      let self = this;
      xmlhttp.open(
        "POST",
        "http://101.200.135.43:8888/user/listTea",
        true
      );
      xmlhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xmlhttp.send(null);
      xmlhttp.onreadystatechange = doResult; //设置回调函数
      function doResult() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          self.tableData = JSON.parse(xmlhttp.responseText);
          self.total = self.tableData.length;
        } else if (xmlhttp.status != 200) {
          console.log("XY:bye-bye");
        }
      }
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
     * 增加操作
     */
    //点击增加按钮
    handleAdd() {
      this.dialogAddVisible = true;
      this.addTitle = "增加教师信息";
      console.log("1111111111111111111111")
      console.log(this.firstForm)
      this.addModel = {
        tid: "",
        pwd:"",
        tname: "",
        phone: "",
        email: "",
      }
    },
    // 确定增加方法
    agreeAdd(){
      let self = this;
      self.dialogAddVisible = false;
      axios({
            method: "post",
            url: "http://101.200.135.43:8888/user/register",
            data: self.addModel
        }).then(res => {
            console.log(res);
            self.$notify({
              title: '成功',
              message: '增加成功！',
              type: 'success'
            });
            console.log("发送服务器成功执行，增加成功");
            console.log(self.addModel);
            self.acceptData();
        })//发送服务器成功执行
            .catch(err => {
                console.log(err);
                self.$notify.error({
                  title: '错误',
                  message: '增加失败！'
                });
                console.log(self.addModel);
                console.log("发送服务器失败执行,增加失败");
            });//发送服务器失败执行
    },
    //取消增加方法
    disagreeAdd() {
      this.dialogAddVisible = false;
      this.$notify.info({
        title: "已取消增加",
        message: "本条记录没有被操作"
      });
      console.log(this.addModel);
      this.addModel = this.firstForm;
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
      this.search = this.searchModel;
    },
    //确定搜索方法
    agreeSearch() {
      this.dialogSearchVisible = false;
      let data = this.transformRequest(this.search);
      let xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        // eslint-disable-next-line no-undef
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      let self = this;
      // eslint-disable-next-line no-undef
      xmlhttp.open("POST", self.backendUrl+"/general/selectGeneral", true);
      xmlhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xmlhttp.send(data);
      xmlhttp.onreadystatechange = doResult; //设置回调函数
      function doResult() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          // eslint-disable-next-line no-console
          console.log(xmlhttp.responseText);
          self.tableData = JSON.parse(xmlhttp.responseText);
          self.total = self.tableData.length;
          // eslint-disable-next-line no-console
          console.log(self.tableData);
          self.$notify({
            title: "查询成功",
            message: "本页面数据已按条件刷新",
            type: "success"
          });
        } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
          self.$notify.error({
            title: "查询失败",
            message: "本次搜索查询失败，请检查您的网络连接或联系管理员"
          });
        }
      }
      this.search = this.searchModel;
    },
    /**
     * 修改操作
     */
    //点击修改按钮
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editSInformation = row;
      this.editId = row.tid;
      this.editName = "修改" + this.editSInformation.name + "的信息";
    },
    //取消修改方法
    disagreeEdit() {
      this.dialogFormVisible = false;
      this.$notify.info({
        title: "已取消修改",
        message: "本条记录没有被操作"
      });
      this.editName = null;
      this.editId = null;
    },
    //同意修改方法
    agreeEdit() {
      let self = this;
      self.dialogFormVisible = false;
      axios({
            method: "post",
            url: "http://101.200.135.43:8888/user/updateTea",
            params: {
              updTId: self.editId
              },
            data: self.editSInformation
        }).then(res => {
            console.log(res);
            self.$notify({
              title: '成功',
              message: '信息更改成功！',
              type: 'success'
            });
            console.log("发送服务器成功执行，更改成功");
            self.acceptData();
        })//发送服务器成功执行 
            .catch(err => {
                console.log(self.editSInformation);
                console.log(self.editId);
                console.log(err);
                self.$notify.error({
                  title: '错误',
                  message: '信息更改失败！'
                });
                console.log("发送服务器失败执行,更改失败");
            });//发送服务器失败执行
    },
    /**
     * 删除操作
     */
    //点击删除按钮
    handleDelete(index, row) {
      this.delIndex = index;
      this.delId = row.tid;
      console.log(row.tid);
      this.dialogVisible = true;
      console.log(this.delId);
    },
    //取消删除方法
    disagreeDel() {
      this.dialogVisible = false;
      this.$notify.info({
        title: "已取消删除",
        message: "本条记录没有被操作"
      });
      this.delIndex = null;
      this.delId = null;
    },
    //同意删除方法
    agreeDel() {
      let self = this;
      self.dialogVisible = false;
      console.log(self.delId);
      axios({
            method: "get",
            url: "http://101.200.135.43:8888/user/delTea",
            params: {
              delTId: self.delId
            }
        }).then(res => {
            console.log(res);
            self.$notify({
              title: '成功',
              message: '信息删除成功！',
              type: 'success'
            });
            console.log("发送服务器成功执行，删除成功");
            self.acceptData();
        })//发送服务器成功执行
            .catch(err => {
                console.log(err);
                self.$notify.error({
                  title: '错误',
                  message: '信息删除失败！'
                });
                console.log(self.delId)
                console.log("发送服务器失败执行,删除失败");
            });//发送服务器失败执行
    }
  }
};
</script>
<style scoped>
.month{
  margin-left: 8px;
}
</style>