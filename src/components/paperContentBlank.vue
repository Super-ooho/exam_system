<template>
    <div>
        <!-- 增加弹窗 -->
        <el-dialog :title="addTitle" :visible.sync="dialogAddVisible">
            <el-form
                :model="addModel"
                label-position="right"
                label-width="160px"
                class="moveBox"
            >
                <el-form-item label="试题编号" prop="bid">
                <el-input v-model="addModel.bid"></el-input>
                </el-form-item>
                <el-form-item label="试题内容" prop="content">
                <el-input v-model="addModel.content"></el-input>
                </el-form-item>
                <el-form-item label="答案" prop="answer">
                <el-input v-model="addModel.answer"></el-input>
                </el-form-item>
                <el-form-item label="所属试卷" prop="pid">
                <el-input v-model="paperRow" :disabled="true"></el-input>
                </el-form-item>
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
        <!-- 修改弹窗 -->
        <el-dialog :title="editName" :visible.sync="dialogFormVisible" :before-close="disagreeEdit">
            <el-form
                :model="editeditHzhGeneral"
                label-position="right"
                label-width="160px"
                class="moveBox"
            >

                <el-form-item label="试题编号">
                <el-input v-model="editeditHzhGeneral.bid" class="inputBox"></el-input>
                </el-form-item>
            
                <el-form-item label="试题内容">
                <el-input v-model="editeditHzhGeneral.content"></el-input>
                </el-form-item>

                <el-form-item label="答案">
                <el-input v-model="editeditHzhGeneral.answer"></el-input>
                </el-form-item>

                <el-form-item label="所属试卷">
                <el-input v-model="editeditHzhGeneral.pid" :disabled="true"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="disagreeEdit">取 消</el-button>
                <el-button type="primary" @click="agreeEdit">修 改</el-button>
            </div>
        </el-dialog>
         <!-- 填空题 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>填空题</span>
                <el-button type="primary" style="float: right; margin-right: 46px;" size="mini" @click="handleAdd">增加填空题<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>
            <el-card v-for="(item, index) in blankList" :key="index" class="text item">
                <div slot="header" class="clearfix">
                    <span>{{index + 1}}、{{item.content}}</span>
                    <el-button-group style="float: right">
                        <el-button size="mini" type="primary" @click="handleEdit(item)">
                        <i class="el-icon-edit"></i>
                        </el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(item)">
                        <i class="el-icon-close"></i>
                        </el-button>
                    </el-button-group>
                </div>
                <div class="text item">
                    {{'答案：' + item.answer}}
                </div>
                <br>
            </el-card>
        </el-card>
    </div>
</template>

<script>
import axios from "axios";
export default {
created() {
    console.log("拿到数据");
    this.acceptData();
  },
  props:{
    paperRow: String
  },
  data() {
    return {

      blankList: [
        
      ],
      //【删除】相关数据
      dialogVisible: false, //确定删除弹窗隐现的布尔值
      delId: "", //即将被删除的数据ID
      delIndex: null,
      //【增加】相关数据
      dialogAddVisible: false,
      addTitle: "",//增加弹窗标题
      firstForm:{
        bid: "",
        content: "",
        answer: "",
        pid: ""
      },
      addModel: {
        bid: "",
        content: "",
        answer: "",
        pid: ""
      },
      //【搜索】相关数据
      searchInput: "",
      //【修改】相关数据
      dialogFormVisible: false,
      editName: null,//修改弹窗标题
      editId: "",
      editeditHzhGeneral: {
        bid: "",
        content: "",
        answer: "",
        pid: ""
      },
 
    };
  },
  methods: {
    //查询数据函数
    acceptData() {
      let self = this;
        axios({
            method: "get",
            url: "http://101.200.135.43:8888/paper/getBlanks",
            params:{
              getBId: self.paperRow
            }
        }).then(res => {
            console.log(res);
            self.blankList = res.data;
            console.log("发送服务器成功执行");
        })//发送服务器成功执行
            .catch(err => {
                console.log(err);
                console.log("发送服务器失败执行");
            });//发送服务器失败执行
    },
     /**
     * 增加操作
     */
    //点击增加按钮
    handleAdd() {
      this.dialogAddVisible = true;
      this.addTitle = "增加填空题";
      console.log("1111111111111111111111");
      console.log(this.firstForm);
      this.addModel = {
        bid: "",
        content: "",
        answer: "",
        pid: ""
      }
    },
    // 确定增加方法
    agreeAdd(){
      let self = this;
      self.dialogAddVisible = false;
      self.addModel.pid = self.paperRow;
      self.addModel.bid = self.paperRow + "1" + self.addModel.bid;
      axios({
            method: "post",
            url: "http://101.200.135.43:8888/subject/addBlank",
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
     * 修改操作
     */
    //点击修改按钮
    handleEdit(editItem){
        console.log(editItem);
        this.dialogFormVisible = true;
        this.editeditHzhGeneral = editItem;
        this.editId = editItem.bid;   
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
            url: "http://101.200.135.43:8888/subject/updateBlank?uBid="+self.editId,
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
    handleDelete(deleteItem) {
      // console.log("index" + index);
      // console.log(row.id);
      this.delId = deleteItem.bid;
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
            url: "http://101.200.135.43:8888/subject/delBlank",
            params: {
              dBid: this.delId
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
}
</script>

<style scoped>
.month {
  margin-left: 8px;
}
.el-header {
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background-color: #242f42;
}
.labeiSize > :first-child {
  font-size: 19px;
  color: #fff;
}
.paper-left {
  position: absolute;
  padding: 10px;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid #e4e4e4;
  border-top: none;
}
.paper-title {
  width: 98%;
  height: 45px;
  line-height: 45px;
  background: #f7f7f7;
}

.paper-title h1 {
  font-size: 20px;
  margin: 0;
}
.answer-button {
  padding: 0px;
  color: #0a0a0a;
  background-color: #ffffff;
  border-color: #e4e4e4;
  margin-left: 10px;
  width: 30px;
  height: 30px;
}
.answer-button:hover {
  background: #ecf1ef;
  border-color: #e4e4e4;
  color: #0a0a0a;
}
.answer-button-check {
  background: #13ce66;
  border-color: #30b08f;
}

.answer-radio {
  display: list-item;
  margin: 5px 0px;
}

.el-collapse-item h2 {
  width: 150px;
  font-size: 14px;
  display: inline-block;
}
.el-form--label-top >>> .el-form-item__label {
  float: none;
  display: inline-block;
  text-align: left;
  padding: 0px;
}

.el-card {
  margin: 10px;
}

.el-card >>> .el-card__header {
  background-color: #ffffff;
  padding: 0px 10px;
  line-height: 35px;
  font-size: 16px;
}
.el-card >>> .el-card__body {
  padding: 5px 20px;
}
.summit-button{
  position:fixed;
  right:5%;
  top: 80%;
}
</style>