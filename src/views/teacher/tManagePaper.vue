<template>
  <div>
    <!-- 修改弹窗 -->
    <el-dialog :title="editName" :visible.sync="dialogFormVisible" :before-close="disagreeEdit">
      <el-form
        :model="editeditHzhGeneral"
        label-position="right"
        label-width="160px"
        class="moveBox"
        :rules="rules"
        ref="editeditHzhGeneral"
      >

        <el-form-item label="试卷编号" prop="pid">
          <el-input v-model.number="editeditHzhGeneral.pid" class="inputBox"></el-input>
        </el-form-item>
       
        <el-form-item label="试卷名称">
          <el-input v-model="editeditHzhGeneral.pname"></el-input>
        </el-form-item>

        <el-form-item label="答题时长" prop="ptime">
          <el-input v-model.number="editeditHzhGeneral.ptime"></el-input>
        </el-form-item>

        <el-form-item label="截止时间">
          <el-date-picker
            v-model="editeditHzhGeneral.deadline"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="23:59:59">
          </el-date-picker>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disagreeEdit">取 消</el-button>
        <el-button type="primary" @click="agreeEdit('editeditHzhGeneral')">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 增加弹窗 -->
    <el-dialog :title="addTitle" :visible.sync="dialogAddVisible">
      <el-form
        :model="addModel"
        label-position="right"
        label-width="160px"
        class="moveBox"
        value-format="yyyy-MM-dd HH:mm:ss"
        :rules="rules"
        ref="addModel"
      >

        <el-form-item label="试卷编号" prop="pid">
          <el-input v-model.number="addModel.pid" class="inputBox"></el-input>
        </el-form-item>
       
        <el-form-item label="试卷名称">
          <el-input v-model="addModel.pname"></el-input>
        </el-form-item>

        <el-form-item label="答题时长" prop="ptime">
          <el-input v-model.number="addModel.ptime"></el-input>
        </el-form-item>

        <el-form-item label="截止时间">
           <el-date-picker
            v-model="addModel.deadline"
            type="datetime"
            placeholder="选择日期时间"
            default-time="23:59:59">
          </el-date-picker>
        </el-form-item>
        
        <!-- </div> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disagreeAdd">取 消</el-button>
        <el-button type="primary" @click="agreeAdd('addModel')">增 加</el-button>
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
    <scorePage v-if="page === 'score'" @back="back" :paperRow="paperRow + ''"></scorePage>
    <paperContent v-else-if="page === 'content'" @back="back" :paperRow="paperRow + ''"></paperContent>  
    <el-card v-else>
      <div slot="header" class="clearfix">
        <el-button type="primary" style="margin-top: 20px; margin-left:10px" size="mini" @click="handleAdd">增加<i class="el-icon-upload el-icon--right"></i></el-button>
        
        <el-button icon="el-icon-search" circle style="float:right" @click="agreeSearch"></el-button>
        <el-input
          placeholder="请输入搜索学号"
          v-model="searchInput"
          clearable
          style="width: 200px; float:right">
        </el-input>
      </div>
      <div class="moveBox">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          style="width: 100%"
          height="350"
        >
          <el-table-column prop="pid" label="试卷编号" width="100px"></el-table-column>
          <el-table-column prop="pname" label="试卷名称" width="200px"></el-table-column>
          <el-table-column prop="ptime" label="答题时长" width="200px"></el-table-column>
          <!-- <el-table-column prop="phone" label="出卷老师id"></el-table-column> -->
          <el-table-column prop="deadline" label="截止时间" width="300px"></el-table-column>
          <el-table-column label="学生成绩" width="200px">
            <template slot-scope="scope">
              <el-button size="mini" type="info" @click="scorePage(scope.row)">学生成绩</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="操作" width="250px">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" style="margin-right: 10px" @click="handleEdit(scope.$index, scope.row)">
                  <i class="el-icon-edit"></i>
                </el-button>
                <el-button size="mini" type="danger" style="margin-right: 10px" @click="handleDelete(scope.$index, scope.row)">
                  <i class="el-icon-close"></i>
                </el-button>
                <el-button size="mini" type="info" @click="paperShow(scope.row)">查看试卷</el-button>
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
import paperContent from "../../components/paperContent";
import scorePage from "../../components/scorePage";
export default {
  created() {
    //页面被创建时执行一次查询函数
    this.acceptData();
  },
  components:{
    paperContent,
    scorePage
  },
  data() {
    return {
      //试卷内容展示
      page: "home",
      paperRow: "",
      //成绩页面显示
      //【分页】相关数据
      currentPage:1, //初始页
      pagesize:5,    //    每页的数据
      // total: 0, //本次查询数据总数
      tableData: [], //本次查询的数据总集
      rules: {
          pid: [
            { required: true, message: '试卷编号不能为空'},
            { type: 'number', message: '试卷编号必须为数字值'}
          ],
          ptime: [
            { required: true, message: '请设置考试时长'},
            { type: 'number', message: '考试时长必须为数字值'}
          ]
        },
      //【删除】相关数据
      dialogVisible: false, //确定删除弹窗隐现的布尔值
      delId: "", //即将被删除的数据ID
      delIndex: null,
      //【增加】相关数据
      dialogAddVisible: false,
      addTitle: "",//增加弹窗标题
      firstForm:{
        pid: "",
        pname: "",
        ptime: "",
        tid: "",
        deadline: ""
      },
      addModel: {
        pid: "",
        pname: "",
        ptime: "",
        tid: "",
        deadline: ""
      },
      //【搜索】相关数据
      searchInput: "",
      //【修改】相关数据
      dialogFormVisible: false,
      editName: null,//修改弹窗标题
      editId: "",
      editeditHzhGeneral: {
        pid: "",
        pname: "",
        ptime: "",
        tid: "",
        deadline: ""
      },
      backendUrl: "",
    };
  },
  methods: {
    //跳转学生成绩页面
    scorePage(row){
      this.page = "score";
      this.paperRow = row.pid;
    },
    // 显示试卷内容
    paperShow(row){
      this.page = "content";
      this.paperRow = row.pid;
      console.log(row.pid);
    },
    back(){
      this.page = "home";
    },
    handleSizeChange: function (size) {
            this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
    },
    //时间转换
    resolvingDate(date){
    //date是传入的时间
      let d = new Date(date);

      let month = (d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1) : (d.getMonth() + 1);
      let day = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
      let hours = d.getHours()<10 ? '0'+d.getHours() : d.getHours();
      let min = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
      let sec = d.getSeconds()<10 ? '0'+d.getSeconds() : d.getSeconds();

      let times=d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;
      return times
    },

    //查询数据函数
    acceptData() {
      let self = this;
        axios({
            method: "get",
            url: "http://101.200.135.43:8888/paper/listPaper",
        }).then(res => {
            console.log(res);
            self.tableData = res.data;
            //改变时间格式
            for (let i=0; i<self.tableData.length; i++){
              self.tableData[i].deadline = self.resolvingDate(self.tableData[i].deadline);
              console.log(i,self.tableData[i]);
            }
            console.log("发送服务器成功执行");
        })//发送服务器成功执行
            .catch(err => {
                console.log(err);
                console.log("发送服务器失败执行");
            });//发送服务器失败执行
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
      this.addTitle = "增加学生信息";
      console.log("1111111111111111111111")
      console.log(this.firstForm)
      this.addModel = {
        pid: "",
        pname: "",
        ptime: "",
        tid: "",
        deadline: ""
      }
    },
    // 确定增加方法
    agreeAdd(addModel){
      this.$refs[addModel].validate((valid) => {
          if (valid) {
            let self = this;
            self.dialogAddVisible = false;
            axios({
                  method: "post",
                  url: "http://101.200.135.43:8888/paper/addPaper",
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
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
    //确定搜索方法
    agreeSearch() {
      let self = this;
      self.dialogSearchVisible = false;
      axios({
            method: "get",
            url: "http://101.200.135.43:8888/paper/getPaper",
            params: {
              getPId: self.searchInput
            }
        }).then(res => {
            console.log(res);
            self.tableData = res.data;
            self.$notify({
              title: '成功',
              message: '搜索成功！',
              type: 'success'
            });
            console.log("发送服务器成功执行，搜索成功");
            // self.acceptData();
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
    },
    /**
     * 修改操作
     */
    //点击修改按钮
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editeditHzhGeneral = row;
      // this.editeditHzhGeneral.id = row.id;
      this.editId = row.pid;
      this.editName = "修改" + this.editeditHzhGeneral.pname + "的信息";
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
    agreeEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let self = this;
          self.dialogFormVisible = false;
          axios({
                method: "post",
                url: "http://101.200.135.43:8888/paper/updatePaper?uPid=" + self.editId,
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
                    console.log(self.editeditHzhGeneral);
                    console.log(self.editId);
                    console.log(err);
                    self.$notify.error({
                      title: '错误',
                      message: '信息更改失败！'
                    });
                    console.log("发送服务器失败执行,更改失败");
                });//发送服务器失败执行
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      
    },
    /**
     * 删除操作
     */
    //点击删除按钮
    handleDelete(index, row) {
      // console.log("index" + index);
      // console.log(row.id);
      this.delIndex = index;
      this.delId = row.pid;
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
      console.log(self.delId);
      axios({
            method: "get",
            url: "http://101.200.135.43:8888/paper/deletePaper",
            params: {
              dPid: this.delId
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