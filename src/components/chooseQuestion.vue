<template>
  <div> 
    <!-- 删除弹窗 -->
    <el-dialog title="谨慎" :visible.sync="dialogVisible" width="30%" :before-close="disagreeDel">
        <span>是否确定删除本条记录，此次操作不可撤销。</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="disagreeDel">取 消</el-button>
            <el-button type="danger" @click="agreeDel">删 除</el-button>
        </span>
    </el-dialog>
    <!-- 增加弹窗 -->
    <el-dialog :title="addTitle" :visible.sync="dialogAddVisible">
        <el-form
            :model="addModel"
            label-position="right"
            label-width="160px"
            class="moveBox"
        >
            <el-form-item label="试题编号" prop="qid">
            <el-input v-model="addModel.qid"></el-input>
            </el-form-item>
            <el-form-item label="试题内容" prop="content">
            <el-input v-model="addModel.content"></el-input>
            </el-form-item>
            <el-form-item label="选项A" prop="aoption">
            <el-input v-model="addModel.aoption"></el-input>
            </el-form-item>
            <el-form-item label="选项B" prop="boption">
            <el-input v-model="addModel.boption"></el-input>
            </el-form-item>
            <el-form-item label="选项C" prop="coption">
            <el-input v-model="addModel.coption"></el-input>
            </el-form-item>
            <el-form-item label="选项D" prop="doption">
            <el-input v-model="addModel.doption"></el-input>
            </el-form-item>
            <el-form-item label="答案" prop="answer">
                <el-radio-group v-model="addModel.answer" style="width: 400px">
                    <el-radio label="A">选项A</el-radio>
                    <el-radio label="B">选项B</el-radio>
                    <el-radio label="C">选项C</el-radio>
                    <el-radio label="D">选项D</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="所属试卷" prop="pid">
            <el-input v-model="addModel.pid"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="doption">
                <el-select v-model="addModel.uclass" placeholder="请选择专业">
                    <el-option label="软件工程" value="软件工程"></el-option>
                    <el-option label="教育技术" value="教育技术"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="disagreeAdd">取 消</el-button>
            <el-button type="primary" @click="agreeAdd">增 加</el-button>
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

            <el-form-item label="试题编号">
            <el-input v-model="editeditHzhGeneral.qid" class="inputBox"></el-input>
            </el-form-item>
        
            <el-form-item label="试题内容">
            <el-input v-model="editeditHzhGeneral.content"></el-input>
            </el-form-item>

            <el-form-item label="选项A">
            <el-input v-model="editeditHzhGeneral.aoption"></el-input>
            </el-form-item>

            <el-form-item label="选项B">
            <el-input v-model="editeditHzhGeneral.boption"></el-input>
            </el-form-item>

            <el-form-item label="选项C">
            <el-input v-model="editeditHzhGeneral.coption"></el-input>
            </el-form-item>

            <el-form-item label="选项D">
            <el-input v-model="editeditHzhGeneral.doption"></el-input>
            </el-form-item>

            <el-form-item label="答案">
                <el-radio-group v-model="editeditHzhGeneral.answer" style="width: 400px">
                    <el-radio label="A">选项A</el-radio>
                    <el-radio label="B">选项B</el-radio>
                    <el-radio label="C">选项C</el-radio>
                    <el-radio label="D">选项D</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="所属试卷">
            <el-input v-model="editeditHzhGeneral.pid"></el-input>
            </el-form-item>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="disagreeEdit">取 消</el-button>
            <el-button type="primary" @click="agreeEdit">修 改</el-button>
        </div>
    </el-dialog>
    <!-- 表格信息 -->
    <el-card>
        <div slot="header" class="clearfix">
            <!-- <el-button type="primary" style="margin-top: 20px; margin-left:10px" size="mini" @click="handleAdd">增加<i class="el-icon-upload el-icon--right"></i></el-button> -->
            
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
            >
            <el-table-column prop="qid" label="试题编号"></el-table-column>

            <el-table-column prop="content" label="试题内容"></el-table-column>
            <el-table-column prop="aoption" label="选项A"></el-table-column>
            <el-table-column prop="boption" label="选项B"></el-table-column>

            <el-table-column prop="coption" label="选项C"></el-table-column>
            <el-table-column prop="doption" label="选项D"></el-table-column>
            <el-table-column prop="answer" label="答案"></el-table-column>
            <el-table-column prop="pid" label="所属试卷"></el-table-column>

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
  },
  data() {
    return {
      //【分页】相关数据
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      // total: 0, //本次查询数据总数
      tableData: [
      
      ], //本次查询的数据总集

      //【删除】相关数据
      dialogVisible: false, //确定删除弹窗隐现的布尔值
      delId: "", //即将被删除的数据ID
      delIndex: null,
      //【增加】相关数据
      dialogAddVisible: false,
      addTitle: "",//增加弹窗标题
      firstForm:{
        qid: "",
        content: "",
        aoption: "",
        boption: "",
        coption: "",
        doption: "",
        answer: "",
        pid: ""
      },
      addModel: {
        qid: "",
        content: "",
        aoption: "",
        boption: "",
        coption: "",
        doption: "",
        answer: "A",
        pid: ""
      },
      //【搜索】相关数据
      searchInput: "",
      //【修改】相关数据
      dialogFormVisible: false,
      editName: null,//修改弹窗标题
      editId: "",
      editeditHzhGeneral: {
        qid: "",
        content: "",
        aoption: "",
        boption: "",
        coption: "",
        doption: "",
        answer: "",
        pid: ""
      },
      backendUrl: "",
      rules: {
        // uid: [{ required: true, message: "请填写学号", trigger: "blur" }],
        // uname: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        // pwd: [{ required: true, message: "请设置密码", trigger: "blur" }],
        // email: [{ email: true,message:"请输入正确的邮箱格式" }]
      }
    };
  },
  methods: {
    handleSizeChange: function (size) {
            this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
    },
    //查询数据函数
    acceptData() {
      let self = this;
        axios({
            method: "get",
            url: "http://101.200.135.43:8888/subject/listQues",
        }).then(res => {
            console.log(res);
            self.tableData = res.data;
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
      this.addTitle = "增加选择题";
      console.log("1111111111111111111111");
      console.log(this.firstForm);
      this.addModel = {
        qid: "",
        content: "",
        aoption: "",
        boption: "",
        coption: "",
        doption: "",
        answer: "",
        pid: ""
      }
    },
    // 确定增加方法
    agreeAdd(){
      let self = this;
      self.dialogAddVisible = false;
      axios({
            method: "post",
            url: "http://101.200.135.43:8888/subject/addQues",
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
    //确定搜索方法
    agreeSearch() {
      let self = this;
      self.dialogSearchVisible = false;
      axios({
            method: "get",
            url: "http://101.200.135.43:8888/subject/searchQues",
            params: {
              qContain: self.searchInput
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
      this.editId = row.qid;
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
            method: "post",
            url: "http://101.200.135.43:8888/subject/updateQues",
            params: {
              uQid: self.editId
              },
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
    },
    /**
     * 删除操作
     */
    //点击删除按钮
    handleDelete(index, row) {
      // console.log("index" + index);
      // console.log(row.id);
      this.delIndex = index;
      this.delId = row.qid;
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
            url: "http://101.200.135.43:8888/subject/deleteQues",
            params: {
              dQid: this.delId
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