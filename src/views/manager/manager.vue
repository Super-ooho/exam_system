<template>
  <div>
    <!-- 搜索弹窗 -->
    <el-dialog title="搜索记录" :visible.sync="dialogSearchVisible" :before-close="disagreeSearch">
      <el-form :model="search" label-position="right" label-width="160px">
        <el-form-item label="患者编号">
          <el-input v-model="search.sicknum" class="inputBox"></el-input>
        </el-form-item>
        <el-form-item label="负责医生">
          <el-input v-model="search.doctor"></el-input>
        </el-form-item>
        <el-form-item label="调查日期">
          <el-date-picker
            v-model="search.minSurTime"
            align="right"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="住院号">
          <el-input v-model="search.livenum"></el-input>
        </el-form-item>
        <el-form-item label="儿童姓名">
          <el-input v-model="search.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="search.six" placeholder="请选择">
            <el-option
              v-for="item in sex_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="search.birthday"
            align="right"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            :clearable="false"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-cascader
            :options="areaSelectData"
            :change-on-select="true"
            :clearable="true"
            :filterable="true"
            class="full-width"
            size="medium"
            v-model="search.pct"
          />
        </el-form-item>
        <el-form-item label="居住地址">
          <el-select v-model="search.adder" placeholder="请选择">
            <el-option
              v-for="item in adder_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通讯地址">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-select v-model="search.nation" filterable placeholder="请选择">
            <el-option
              v-for="item in nation_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="答卷人">
          <el-input v-model="search.sfname"></el-input>
        </el-form-item>
        <el-form-item label="与患者关系">
          <el-select v-model="search.relation" filterable allow-create placeholder="请选择或输入">
            <el-option
              v-for="item in relation_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="search.mobile"></el-input>
        </el-form-item>
        <el-form-item label="母孕年龄">
          <el-input v-model="search.mather"></el-input>
        </el-form-item>
        <el-form-item label="父孕年龄">
          <el-input v-model="search.father"></el-input>
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
        <el-form-item label="患者编号">
          <el-input v-model="editeditHzhGeneral.sicknum" class="inputBox"></el-input>
        </el-form-item>
        <el-form-item label="负责医生">
          <el-input v-model="editeditHzhGeneral.doctor"></el-input>
        </el-form-item>
        <el-form-item label="调查日期">
          <el-date-picker
            v-model="editeditHzhGeneral.surveyTime"
            align="right"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :clearable="false"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="住院号">
          <el-input-number v-model="editeditHzhGeneral.livenum"></el-input-number>
        </el-form-item>
        <el-form-item label="儿童姓名">
          <el-input v-model="editeditHzhGeneral.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editeditHzhGeneral.six" placeholder="请选择">
            <el-option
              v-for="item in sex_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="editeditHzhGeneral.birthday"
            align="right"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :clearable="false"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-cascader
            :options="areaSelectData"
            :change-on-select="true"
            :clearable="true"
            :filterable="true"
            class="full-width"
            size="medium"
            v-model="editeditHzhGeneral.pct"
          />
        </el-form-item>
        <el-form-item label="居住地址">
          <el-select v-model="editeditHzhGeneral.adder" placeholder="请选择">
            <el-option
              v-for="item in adder_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通讯地址">
          <el-input v-model="editeditHzhGeneral.address"></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-select v-model="editeditHzhGeneral.nation" filterable placeholder="请选择">
            <el-option
              v-for="item in nation_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="答卷人">
          <el-input v-model="editeditHzhGeneral.sfname"></el-input>
        </el-form-item>
        <el-form-item label="与患者关系">
          <el-select
            v-model="editeditHzhGeneral.relation"
            filterable
            allow-create
            placeholder="请选择或输入"
          >
            <el-option
              v-for="item in relation_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editeditHzhGeneral.mobile"></el-input>
        </el-form-item>
        <el-form-item label="母孕年龄">
          <el-input v-model="editeditHzhGeneral.mather"></el-input>
        </el-form-item>
        <el-form-item label="父孕年龄">
          <el-input v-model="editeditHzhGeneral.father"></el-input>
        </el-form-item>
        <el-form-item label="出生信息" class="myItem">
          <el-input v-model="editeditHzhGeneral.tais">
            <span slot="prepend">第</span>
            <span slot="append">胎</span>
          </el-input>
          <el-input v-model="editeditHzhGeneral.chan">
            <span slot="prepend">第</span>
            <span slot="append">产</span>
          </el-input>
          <el-input v-model="editeditHzhGeneral.zhou">
            <span slot="prepend">孕</span>
            <span slot="append">周</span>
          </el-input>
        </el-form-item>
        <el-form-item label="产子方式">
          <el-select v-model="editeditHzhGeneral.ctype" placeholder="请选择">
            <el-option
              v-for="item in birth_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生体重">
          <el-input v-model="editeditHzhGeneral.kg"></el-input>
        </el-form-item>
        <el-form-item label="母孕期病史">
          <el-switch active-value="1" inactive-value="0" v-model="editeditHzhGeneral.myqbs"></el-switch>
          <el-input
            v-model="editeditHzhGeneral.myqbses"
            v-if="editeditHzhGeneral.myqbs==1"
            placeholder="请输入病史"
          ></el-input>
        </el-form-item>
        <el-form-item label="生后病史">
          <el-input v-model="editeditHzhGeneral.shbs"></el-input>
        </el-form-item>
        <el-form-item label="语言发育迟缓" class="lau">
          <el-switch active-value="1" inactive-value="0" v-model="editeditHzhGeneral.lau"></el-switch>
          <el-input
            v-if="editeditHzhGeneral.lau==1"
            v-model="editeditHzhGeneral.laus"
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="发育迟缓">
          <el-switch active-value="1" inactive-value="0" v-model="editeditHzhGeneral.fych"></el-switch>
        </el-form-item>
        <el-form-item label="运动迟缓" v-if="editeditHzhGeneral.fych==1">
          <el-switch active-value="1" inactive-value="0" v-model="editeditHzhGeneral.action"></el-switch>
          <el-input
            v-if="editeditHzhGeneral.action==1"
            v-model="editeditHzhGeneral.actions"
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="editeditHzhGeneral.fych==1">
          <el-input v-model="editeditHzhGeneral.tai">
            <template slot="append">月抬头</template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="editeditHzhGeneral.fych==1">
          <el-input v-model="editeditHzhGeneral.fan">
            <template slot="append">月翻身</template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="editeditHzhGeneral.fych==1">
          <el-input v-model="editeditHzhGeneral.dz">
            <template slot="append">月独坐</template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="editeditHzhGeneral.fych==1">
          <el-input v-model="editeditHzhGeneral.pa">
            <template slot="append">月爬行</template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="editeditHzhGeneral.fych==1">
          <el-input v-model="editeditHzhGeneral.zou">
            <template slot="append">月独走</template>
          </el-input>
        </el-form-item>
        <!-- </div> -->
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
    <el-card>
      <div slot="header" class="clearfix">
        <el-tag effect="dark" style="font-size:18px">一般信息管理</el-tag>
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
          <el-table-column prop="name" label="儿童姓名"></el-table-column>
          <el-table-column prop="sicknum" label="患者编号"></el-table-column>
          <el-table-column prop="six" label="性别"></el-table-column>
          <el-table-column prop="birthday" label="出生日期"></el-table-column>
          <el-table-column prop="nation" label="民族"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="age" label="受访人姓名"></el-table-column>
          <el-table-column prop="relation" label="与患者关系"></el-table-column>
          <el-table-column prop="phone" label="通信地址"></el-table-column>
          <el-table-column prop="mobile" label="电话"></el-table-column>
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
  </div>
</template>
<script>
export default {
  created() {
    //页面被创建时执行一次查询函数
    this.acceptData();
    //初始化表单
    this.search = this.searchModel;
    this.search.maxSurTime = this.getNowFormatDate(0);
    this.search.minSurTime = this.getNowFormatDate(10);
  },
  data() {
    return {
      //【分页】相关数据
      total: 0, //本次查询数据总数
      tableData: [], //本次查询的数据总集
      currentPage: 1, //当前页
      pageSize: 10, //每页显示多少条记录
      //【删除】相关数据
      dialogVisible: false, //确定删除弹窗隐现的布尔值
      delId: null, //即将被删除的数据ID
      delIndex: null,
      //【搜索】相关数据
      dialogSearchVisible: false,
      search: {},
      searchModel: {
        id: "",
        name: "",
        birthday: "",
        age: "",
        province: "",
        city: "",
        town: "",
        nation: "",
        sfname: "",
        relation: "",
        address: "",
        mobile: "",
        //患者编号
        sicknum: "",
        //负责医生
        doctor: "",
        //调查日期
        surveyTime: "",
        //住院号
        livenum: "",
        //性别
        six: "",
        //居住城市
        citys: "",
        //乡镇
        xz: "",
        //农村
        nc: "",
        //详细地址
        ne: "",
        //母孕龄
        mather: "",
        //父孕龄
        father: "",
        //胎
        tais: "",
        //产
        chan: "",
        //周
        zhou: "",
        //产子方式
        ctype: "",
        //kg
        kg: "",
        //母孕期病史
        myqbs: "",
        //母孕期病史介绍
        myqbses: "",
        //生后病史
        shbs: "",
        //发育迟缓
        fych: "",
        //运动迟缓
        action: "",
        //运动迟缓介绍
        actions: "",
        //抬头
        tai: "",
        //翻身
        fan: "",
        //独坐
        dz: "",
        //爬行
        pa: "",
        //独走
        zou: "",
        //语言发育迟缓
        lau: "",
        //语言发育迟缓介绍
        laus: ""
      },
      //【修改】相关数据
      dialogFormVisible: false,
      editName: null,
      editId: null,
      editeditHzhGeneral: {
        id: "",
        name: "",
        birthday: "",
        age: "",
        province: "",
        city: "",
        town: "",
        nation: "",
        sfname: "",
        relation: "",
        address: "",
        mobile: "",
        //患者编号
        sicknum: "",
        //负责医生
        doctor: "",
        //调查日期
        surveyTime: "",
        //住院号
        livenum: "",
        //性别
        six: "",
        //居住城市
        citys: "",
        //乡镇
        xz: "",
        //农村
        nc: "",
        //详细地址
        ne: "",
        //母孕龄
        mather: "",
        //父孕龄
        father: "",
        //胎
        tais: "",
        //产
        chan: "",
        //周
        zhou: "",
        //产子方式
        ctype: "",
        //kg
        kg: "",
        //母孕期病史
        myqbs: "",
        //母孕期病史介绍
        myqbses: "",
        //生后病史
        shbs: "",
        //发育迟缓
        fych: "",
        //运动迟缓
        action: "",
        //运动迟缓介绍
        actions: "",
        //抬头
        tai: "",
        //翻身
        fan: "",
        //独坐
        dz: "",
        //爬行
        pa: "",
        //独走
        zou: "",
        //语言发育迟缓
        lau: "",
        //语言发育迟缓介绍
        laus: ""
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
        self.backendUrl+"/general/selectGeneral",
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
          // eslint-disable-next-line no-console
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
      this.editeditHzhGeneral = row;
      this.editId = row.id;
      this.editName = "修改" + this.editeditHzhGeneral.name + "的信息";
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
      let data = this.transformRequest(this.editeditHzhGeneral);
      let xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        // eslint-disable-next-line no-undef
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      let self = this;
      // eslint-disable-next-line no-undef
      xmlhttp.open("POST", self.backendUrl+"/general/updateGeneral", true);
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
    },
    /**
     * 删除操作
     */
    //点击删除按钮
    handleDelete(index, row) {
      this.delIndex = index;
      this.delId = row.id;
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
      this.dialogVisible = false;
      let xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        // eslint-disable-next-line no-undef
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      let self = this;
      // eslint-disable-next-line no-undef
      xmlhttp.open("POST", self.backendUrl+"general/delGeneral?id=" + this.delId, true);
      xmlhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xmlhttp.send(null);
      xmlhttp.onreadystatechange = doResult; //设置回调函数
      function doResult() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          // self.tableData.splice(self.delIndex, 1);
          // self.total = self.tableData.length;
          self.acceptData();
          self.$notify({
            title: "删除成功",
            message: "本条记录已被成功删除",
            type: "success"
          });
        } else if (xmlhttp.status != 200) {
          self.$notify.error({
            title: "删除失败",
            message: "本条记录删除失败，请检查您的网络连接或联系管理员"
          });
        }
      }
      this.delIndex = null;
      this.delId = null;
    }
  }
};
</script>
<style scoped>
.month{
  margin-left: 8px;
}
</style>