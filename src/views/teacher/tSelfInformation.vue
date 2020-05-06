<template>
  <div> 
      <!-- 修改弹窗 -->
      <el-dialog :title="editName" :visible.sync="dialogFormVisible" :before-close="disagreeEdit">
        <el-form
          :model="editSelfInformation"
          label-position="right"
          label-width="160px"
          class="moveBox"
        >
          <el-form-item label="教师编号">
            <el-input v-model="editSelfInformation.tid" class="inputBox"></el-input>
          </el-form-item>
          <el-form-item label="教师姓名">
            <el-input v-model="editSelfInformation.tname"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="editSelfInformation.pwd"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input-number v-model="editSelfInformation.phone"></el-input-number>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editSelfInformation.email"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="disagreeEdit">取 消</el-button>
          <el-button type="primary" @click="agreeEdit">修 改</el-button>
        </div>
      </el-dialog>
      <!-- 表格卡片 -->
      <!-- <el-main> -->
        <el-card>
          <div slot="header" class="clearfix">
            <el-tag effect="dark" style="font-size:18px">个人信息管理</el-tag>
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
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column type="index" width="50" label="序号"></el-table-column>
              <el-table-column prop="name" label="教师姓名"></el-table-column>
              <el-table-column prop="sicknum" label="教师编号"></el-table-column>
              <el-table-column prop="six" label="密码"></el-table-column>
              <el-table-column prop="birthday" label="电话"></el-table-column>
              <el-table-column prop="date" label="操作">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleEdit(scope.$index, scope.row)"
                    >
                      <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                    >
                      <i class="el-icon-close"></i>
                    </el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <br />
        </el-card>
      <!-- </el-main> -->
  </div>
</template>
<script>
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
      //【搜索】相关数据
      dialogSearchVisible: false,
      search: {},
      searchModel: {
        tid: "",
        pwd: "",
        tname: "",
        phone: "",
        email: ""
      },
      //【修改】相关数据
      dialogFormVisible: false,
      editName: null,
      editId: null,
      editSelfInformation: {
        tid: "",
        pwd: "",
        tname: "",
        phone: "",
        email: ""
      }
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
      xmlhttp.open("POST", self.backendUrl + "/general/selectGeneral", true);
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
    /**
     * 修改操作
     */
    //点击修改按钮
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editSelfInformation = row;
      this.editId = row.id;
      this.editName = "修改" + this.editSelfInformation.name + "的信息";
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
      this.dialogFormVisible = false;
      let data = this.transformRequest(this.editSelfInformation);
      let xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        // eslint-disable-next-line no-undef
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      let self = this;
      // eslint-disable-next-line no-undef
      xmlhttp.open("POST", self.backendUrl + "/general/updateGeneral", true);
      xmlhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xmlhttp.send(data);
      xmlhttp.onreadystatechange = doResult; //设置回调函数
      function doResult() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          self.$notify({
            title: "修改成功",
            message: "本条记录已被成功修改",
            type: "success"
          });
        } else if (xmlhttp.status != 200) {
          self.$notify.error({
            title: "修改失败",
            message: "本条记录修改失败，请检查您的网络连接或联系管理员"
          });
        }
      }
      this.editName = null;
      this.editId = null;
    }
  }
};
</script>
<style scoped>
.month {
  margin-left: 8px;
}
</style>