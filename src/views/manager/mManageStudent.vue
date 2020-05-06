<template>
  <div>
    <!-- 搜索弹窗 -->
    <el-dialog title="搜索记录" :visible.sync="dialogSearchVisible" :before-close="disagreeSearch">
      <el-form :model="search" label-position="right" label-width="160px">
        
        <!-- <el-form-item label="序号">
          <el-input v-model="search.id" class="inputBox"></el-input>
        </el-form-item> -->

        <el-form-item label="学号">
          <el-input v-model="search.uid" class="inputBox"></el-input>
        </el-form-item>
       
        <el-form-item label="用户名">
          <el-input v-model="search.uname"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="search.pwd"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select v-model="search.sex" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="search.phone"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="search.email"></el-input>
        </el-form-item>

        <el-form-item label="专业">
          <el-input v-model="search.class"></el-input>
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
        :model="editeditHzhGeneral"
        label-position="right"
        label-width="160px"
        class="moveBox"
      >
        <!-- <el-form-item label="序号">
          <el-input v-model="editeditHzhGeneral.id" class="inputBox"></el-input>
        </el-form-item> -->

        <el-form-item label="学号">
          <el-input v-model="editeditHzhGeneral.uid" class="inputBox"></el-input>
        </el-form-item>
       
        <el-form-item label="用户名">
          <el-input v-model="editeditHzhGeneral.uname"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="editeditHzhGeneral.pwd"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select v-model="editeditHzhGeneral.sex" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="editeditHzhGeneral.phone"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="editeditHzhGeneral.email"></el-input>
        </el-form-item>

        <el-form-item label="专业">
          <el-input v-model="editeditHzhGeneral.class"></el-input>
        </el-form-item>
        
        <!-- </div> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disagreeEdit">取 消</el-button>
        <el-button type="primary" @click="agreeEdit">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 增加弹窗 -->
    <el-dialog :title="addTitle" :visible.sync="dialogAddVisible">
      <el-form
        :model="addModel"
        label-position="right"
        label-width="160px"
        class="moveBox"
      >
        <!-- <el-form-item label="序号">
          <el-input v-model="addModel.id" class="inputBox"></el-input>
        </el-form-item> -->

        <el-form-item label="学号">
          <el-input v-model="addModel.uid" class="inputBox"></el-input>
        </el-form-item>
       
        <el-form-item label="用户名">
          <el-input v-model="addModel.uname"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="addModel.pwd"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select v-model="addModel.sex" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="addModel.phone"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="addModel.email"></el-input>
        </el-form-item>

        <el-form-item label="专业">
          <el-input v-model="addModel.class"></el-input>
        </el-form-item>
        
        <!-- </div> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disagreeAdd">取 消</el-button>
        <el-button type="primary" @click="agreeAdd">增 加</el-button>
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
    <el-card>
      <div slot="header" class="clearfix">
        <el-tag effect="dark" style="font-size:18px">学生信息</el-tag>
        <el-button type="primary" style="margin-top: 20px; margin-left:100px" size="mini" @click="handleAdd">增加<i class="el-icon-upload el-icon--right"></i></el-button>
        <el-button icon="el-icon-search" circle style="float:right" @click="handleSearch"></el-button>
      </div>
      <div class="moveBox">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          style="width: 100%"
        >
          <!-- <el-table-column type="index" width="50" label="序号"></el-table-column> -->
          <el-table-column prop="uid" label="学号"></el-table-column>

          <el-table-column prop="uname" label="用户名"></el-table-column>
          <el-table-column prop="pwd" label="密码"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>

          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="class" label="专业"></el-table-column>

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
        <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]" 
              :page-size="pagesize"         
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length">
        </el-pagination>
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
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      // total: 0, //本次查询数据总数
      tableData: [
      
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
        {
        uid: "sd",
        uname: "sd",
        pwd: "sd",
        sex: "sd",
        phone: "sd",
        email: "sd",
        class: "sd"
        },
      ], //本次查询的数据总集

      //【删除】相关数据
      dialogVisible: false, //确定删除弹窗隐现的布尔值
      delId: null, //即将被删除的数据ID
      delIndex: null,
      //【增加】相关数据
      dialogAddVisible: false,
      addTitle: "",//增加弹窗标题
      firstForm:{
        uid: "",
        uname: "",
        pwd: "",
        sex: "",
        phone: "",
        email: "",
        class: ""
      },
      addModel: {
        uid: "",
        uname: "",
        pwd: "",
        sex: "",
        phone: "",
        email: "",
        class: ""
      },
      //【搜索】相关数据
      dialogSearchVisible: false,
      search: {
        uid: "",
        uname: "",
        pwd: "",
        sex: "",
        phone: "",
        email: "",
        class: ""
      },
      //【修改】相关数据
      dialogFormVisible: false,
      editName: null,//修改弹窗标题
      editeditHzhGeneral: {
        uid: "",
        uname: "",
        pwd: "",
        sex: "",
        phone: "",
        email: "",
        class: ""
      },
      backendUrl: ""
    };
  },
  methods: {
    handleSizeChange: function (size) {
            this.pagesize = size;
            // console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            // console.log(this.currentPage)  //点击第几页
    },
    //查询数据函数
    acceptData() {
      let self = this;
        axios({
            method: "get",
            url: self.backendUrl + "/...",
            // url: "http://192.144.227.168:8089/info/insert",
            // data:this.ruleForm
        }).then(res => {
            console.log(res);
            self.tableData = res.data.data;
            // self.total = self.tableData.length;
            console.log("发送服务器成功执行");
        })//发送服务器成功执行
            .catch(err => {
                console.log(err);
                console.log("发送服务器失败执行");
            });//发送服务器失败执行
        //res => console.log(res)
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
      // this.editeditHzhGeneral = row;
      this.addTitle = "增加学生信息";
    },
    // 确定增加方法
    agreeAdd(){
      let self = this;
      self.dialogAddVisible = false;
      axios({
            method: "get",
            url: self.backendUrl + "/...",
            // url: "http://192.144.227.168:8089/info/insert",
            data: self.addModel
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
                console.log(err);
                self.$notify.error({
                  title: '错误',
                  message: '信息更改失败！'
                });
                console.log("发送服务器失败执行,更改失败");
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
      // this.editName = null;
      // this.editId = null;
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
        }).then(res => {
            console.log(res);
            self.tableData = res.data.data;
            self.$notify({
              title: '成功',
              message: '搜索成功！',
              type: 'success'
            });
            console.log("发送服务器成功执行，搜索成功");
            self.acceptData();
        })//发送服务器成功执行
            .catch(err => {
                console.log(err);
                self.$notify.error({
                  title: '错误',
                  message: '搜索失败！'
                });
                console.log("发送服务器失败执行,搜索失败");
            });//发送服务器失败执行

        this.dialogSearchVisible = false;
        
      // let data = this.transformRequest(this.search);
      // let xmlhttp;
      // if (window.XMLHttpRequest) {
      //   xmlhttp = new XMLHttpRequest();
      // } else {
      //   // eslint-disable-next-line no-undef
      //   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      // }
      // let self = this;
      // // eslint-disable-next-line no-undef
      // xmlhttp.open("POST", self.backendUrl+"/general/selectGeneral", true);
      // xmlhttp.setRequestHeader(
      //   "Content-type",
      //   "application/x-www-form-urlencoded"
      // );
      // xmlhttp.send(data);
      // xmlhttp.onreadystatechange = doResult; //设置回调函数
      // function doResult() {
      //   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //     // eslint-disable-next-line no-console
      //     console.log(xmlhttp.responseText);
      //     self.tableData = JSON.parse(xmlhttp.responseText);
      //     self.total = self.tableData.length;
      //     // eslint-disable-next-line no-console
      //     console.log(self.tableData);
      //     self.$notify({
      //       title: "查询成功",
      //       message: "本页面数据已按条件刷新",
      //       type: "success"
      //     });
      //   } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
      //     self.$notify.error({
      //       title: "查询失败",
      //       message: "本次搜索查询失败，请检查您的网络连接或联系管理员"
      //     });
      //   }
      // }
      // this.search = this.searchModel;
    },
    /**
     * 修改操作
     */
    //点击修改按钮
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editeditHzhGeneral = row;
      // this.editeditHzhGeneral.id = row.id;
      // this.editId = row.id;
      this.editName = "修改" + this.editeditHzhGeneral.uname + "的信息";
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
            method: "get",
            url: self.backendUrl + "/...",
            // url: "http://192.144.227.168:8089/info/insert",
            data: self.editeditHzhGeneral
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
      // console.log("index" + index);
      // console.log(row.id);
      this.delIndex = index;
      this.delId = row.id;
      console.log(this.delId);
      this.dialogVisible = true;
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
      axios({
            method: "get",
            url: self.backendUrl + "/...",
            // url: "http://192.144.227.168:8089/info/insert",
            data:this.delId
        }).then(res => {
            console.log(res);
            this.$notify({
              title: '成功',
              message: '信息删除成功！',
              type: 'success'
            });
            console.log("发送服务器成功执行，删除成功");
            self.acceptData();
        })//发送服务器成功执行
            .catch(err => {
                console.log(err);
                this.$notify.error({
                  title: '错误',
                  message: '信息删除失败！'
                });
                console.log("发送服务器失败执行,删除失败");
            });//发送服务器失败执行
        //res => console.log(res)
      // let xmlhttp;
      // if (window.XMLHttpRequest) {
      //   xmlhttp = new XMLHttpRequest();
      // } else {
      //   // eslint-disable-next-line no-undef
      //   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      // }
      // let self = this;
      // // eslint-disable-next-line no-undef
      // xmlhttp.open("POST", self.backendUrl+"general/delGeneral?id=" + this.delId, true);
      // xmlhttp.setRequestHeader(
      //   "Content-type",
      //   "application/x-www-form-urlencoded"
      // );
      // xmlhttp.send(null);
      // xmlhttp.onreadystatechange = doResult; //设置回调函数
      // function doResult() {
      //   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //     // self.tableData.splice(self.delIndex, 1);
      //     // self.total = self.tableData.length;
      //     self.acceptData();
      //     self.$notify({
      //       title: "删除成功",
      //       message: "本条记录已被成功删除",
      //       type: "success"
      //     });
      //   } else if (xmlhttp.status != 200) {
      //     self.$notify.error({
      //       title: "删除失败",
      //       message: "本条记录删除失败，请检查您的网络连接或联系管理员"
      //     });
      //   }
      // }
      self.delIndex = null;
      self.delId = null;
    }
  }
};
</script>
<style scoped>
.month{
  margin-left: 8px;
}
</style>