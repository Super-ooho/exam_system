<template>
  <div>
    <el-page-header @back="back" content="详情页面">     
    </el-page-header>
    <el-card>

      <div class="moveBox">
        <el-table
          :data="scoreData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="uid" label="学号"></el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column prop="endTime" label="交卷时间"></el-table-column>
          <!-- <el-table-column prop="phone" label="出卷老师id"></el-table-column> -->
          <el-table-column prop="time" label="答题时长"></el-table-column>
          <el-table-column prop="score" label="得分"></el-table-column>
        </el-table>
        <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]" 
              :page-size="pagesize"         
              layout="total, sizes, prev, pager, next, jumper"
              :total="scoreData.length">
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
      this.acceptData();
  },
  components:{
      
  },
  props:{
      paperRow: String
  },
  data() {
    return {
      scoreData:[],
      //【分页】相关数据
      currentPage:1, //初始页
      pagesize:5,    //    每页的数据
    };
  },
  methods: {
    //查询数据函数
    acceptData() {
      let self = this;
        axios({
            method: "get",
            url: "http://101.200.135.43:8888/paper/getTests",
            params:{
              getTestsId: self.paperRow
            }
        }).then(res => {
            console.log(res);
            self.scoreData = res.data;
            console.log("发送服务器成功执行");
        })//发送服务器成功执行
            .catch(err => {
                console.log(err);
                console.log("发送服务器失败执行");
            });//发送服务器失败执行
    },
    handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },
    back(){
        this.$emit("back");
    },
    
  }
}
</script>

<style>

</style>