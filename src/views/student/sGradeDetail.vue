<template>
  <el-container>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>该考试已经结束，请查看成绩</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pushExamAnswer()">确 定</el-button>
      </span>
    </el-dialog>
    <el-header>
      <el-form :inline="true" v-model="texts" label-width="300px">
        <el-form-item label="试卷名称：" class="labeiSize">{{texts.pname}}</el-form-item>
        <el-form-item label="学生姓名：" class="labeiSize">{{texts.uid}}</el-form-item>
        <el-form-item label="测验限时：" class="labeiSize">{{texts.ptime}}min</el-form-item>
      </el-form>
    </el-header>
    <el-container>
      <el-aside width="300px">
        <div class="paper-left">
          <div class="paper-title">
            <h1>
              <i class="el-icon-s-grid"></i>答题卡
            </h1>
          </div>
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <h2>单选题</h2>
                <span>共{{texts.queNum}}题</span>
              </template>
              <el-button
                class="answer-button"
                circle
                size="small"
                v-show="typeof item.sanswer=='undefined'"
                v-for="(item,index) in exams"
                :key="index"
                @click.native="jump(index)"
              >{{index+1}}</el-button>
              <!-- <el-button
                class="answer-buttong"
                circle
                size="small"
                v-show="typeof item.sanswer!='undefined'"
                v-for="(item,index) in exams"
                :key="index"
                @click.native="jump(index)"
              >{{index+1}}</el-button>-->
              <!-- <el-button  class="answer-button" circle size="small" v-for="index of item.count" :id="'answer'+item.code+index"  @click.native="jump(item.code+index)">{{index}}</el-button> -->
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <h2>填空题</h2>
                <span>共{{texts.blankNum}}题</span>
              </template>
              <el-button
                class="answer-button"
                circle
                size="small"
                v-for="(item,index) in blank"
                :key="index"
              >{{index+1}}</el-button>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-aside>
      <el-main>
        <el-card class="box-card" ref="htmlHeight">
          <div slot="header" class="clearfix">
            <span>单选题</span>
          </div>
          <!-- v-bind:class="{ active: isActive }" -->
          <el-card v-for="(item,index) in examp " :key="index" class="text item" ref="examHeight">
            <div slot="header" class="clearfix">
              <span>{{index+1}}、{{item.content}}（5分）</span>
              <span class="trueOrWrong">{{item.true}}正确答案为 {{item.corrAns}}</span>
            </div>
            <el-radio-group v-model="item.sanswer" style="color:#0a0a0a">
              <el-radio
                disabled
                label="A"
                v-bind:class="{right:item.sanswerAR,wrong:item.sanswerAW} "
              >A、{{item.aoption}}</el-radio>
              <br />
              <el-radio
                disabled
                label="B"
                v-bind:class="{right:item.sanswerBR,wrong:item.sanswerBW}"
              >B、{{item.boption}}</el-radio>
              <br />
              <el-radio
                disabled
                label="C"
                v-bind:class="{right:item.sanswerCR,wrong:item.sanswerCW}"
              >C、{{item.coption}}</el-radio>
              <br />
              <el-radio
                disabled
                label="D"
                v-bind:class="{right:item.sanswerDR,wrong:item.sanswerDW}"
              >D、{{item.doption}}</el-radio>
            </el-radio-group>
          </el-card>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>填空题</span>
          </div>
          <el-card v-for="(item,index) in examb" :key="index" class="text item">
            <div slot="header" class="clearfix">
              <span>{{index+1}}、{{item.content}}（5分）</span>
              <span class="trueOrWrong">{{item.true}}正确答案为 {{item.corrAns}}</span>
            </div>
            <el-input
              v-model="item.sanswer"
              :disabled="true"
              v-bind:class="{right:item.sanswerR,wrong:item.sanswerW}"
            ></el-input>
          </el-card>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// import axios from "axios";
export default {
  created() {
    // 页面被创建时执行一次查询函数
    this.acceptExam();
    this.acceptExamQuestion();
    this.acceptExamBlank();
    this.acceptExamAnswer();
    // this.exams=this.hhh;
    // console.log("hhhhhh"+JSON.stringify(this.exams));
    // this.pushExamAnswer();
    //初始化表单
    // this.search = this.searchModel;
    // this.search.maxSurTime = this.getNowFormatDate(0);
    // this.search.minSurTime = this.getNowFormatDate(10);
  },
  data() {
    return {
      dialogVisible: true,
      keepTime: "",
      limittime: 90,
      settime: "",
      flag: false,
      score: "",
      sanswerR: true,
      sanswerW: false,
      //对错css样式
      // sanswerAR:false,
      // sanswerBR:false,
      // sanswerCR:false,
      // sanswerDR:false,
      // sanswerAW:false,
      // sanswerBW:false,
      // sanswerCW:false,
      // sanswerDW:false,
      texts: {
        uid: "",
        pid: "",
        startime: "",
        endtime: "",
        time: "",
        ptime: "",
        score: "",
        name: "",
        pname: ""
      },
      exam: [],
      examp: [],
      examb: [],
      // exams: [],
      exams: {
        aoption: "",
        boption: "",
        coption: "",
        doption: "",
        answer: "",
        sanswer: "",
        content: ""
      },
      answerstu: null,
      blank: {
        bid: "",
        content: "",
        answer: "",
        pid: ""
      }
    };
  },
  methods: {
    acceptExam() {
      let id = this.$route.params.index;
      // 从后端获取考试的详细信息，渲染到考试详情里
      this.$axios
        .get("http://101.200.135.43:8888/paper/getPaper?getPId=" + id, {})
        .then(res => {
          this.texts = res.data;
          this.limittime = res.data.ptime;
          console.log("texts" + this.limittime);
        })
        .catch(err => {
          console.log(err);
        });
    },
    acceptExamQuestion() {
      let id = this.$route.params.index;
      this.$axios
        .get("http://101.200.135.43:8888/paper/getQuestions?getQId=" + id)
        .then(res => {
          this.exams = res.data;
          console.log("exam" + this.exams);
        })
        .catch(err => {
          console.log(err);
        });
    },
    acceptExamBlank() {
      let id = this.$route.params.index;
      this.$axios
        .get("http://101.200.135.43:8888/paper/getBlanks?getBId=" + id)
        .then(res => {
          this.blank = res.data;
          console.log(this.blank);
        })
        .catch(err => {
          console.log(err);
        });
    },
    acceptExamAnswer() {
      let id = this.$route.params.index;
      this.$axios
        .get("http://101.200.135.43:8888/subject/getAnswerStu?getAnsId=" + id)
        .then(res => {
          this.answer = res.data;
          console.log("answer" + this.answer);
        })
        .catch(err => {
          console.log(err);
        });
    },
    pushExamAnswer() {
      this.dialogVisible = false;
      let i, j;
      let lene = this.exams.length;
      let lenb = this.blank.length;
      let len = lene + lenb;
      // let l = this.texts.queNum;
      this.examp = this.exams;
      for (i = 0; i < lene; i++) {
        this.$set(this.examp[i], "corrAns", this.answer[i].corrAns);
        this.$set(this.examp[i], "aoption", this.exams[i].aoption);
        this.$set(this.examp[i], "boption", this.exams[i].boption);
        this.$set(this.examp[i], "coption", this.exams[i].coption);
        this.$set(this.examp[i], "doption", this.exams[i].doption);
        this.$set(this.examp[i], "content", this.exams[i].content);
        this.$set(this.examp[i], "sanswerAR", false);
        this.$set(this.examp[i], "sanswerBR", false);
        this.$set(this.examp[i], "sanswerCR", false);
        this.$set(this.examp[i], "sanswerDR", false);
        this.$set(this.examp[i], "sanswerAW", false);
        this.$set(this.examp[i], "sanswerBW", false);
        this.$set(this.examp[i], "sanswerCW", false);
        this.$set(this.examp[i], "sanswerDW", false);
        this.$set(this.examp[i], "true");
        delete this.examp[i].sanswer;
        this.$set(this.examp[i], "sanswer", this.answer[i].sanswer);
        this.$set(this.examp[i], "statement", this.answer[i].statement);
        if (this.examp[i].corrAns == true) {
          this.examp[i].true=="正确";
          if (this.examp[i].sanswer == "A") {
            this.examp[i].sanswerAR = true;
          } else if (this.examp[i].sanswer == "B") {
            this.examp[i].sanswerBR = true;
          } else if (this.examp[i].sanswer == "C") {
            this.examp[i].sanswerCR = true;
          } else if (this.examp[i].sanswer == "D") {
            this.examp[i].sanswerDR = true;
          }
        } else if(this.examp[i].corrAns == false){
          this.examp[i].true=="错误";
          if (this.examp[i].sanswer == "A") {
            this.examp[i].sanswerAW = false;
          } else if (this.examp[i].sanswer == "B") {
            this.examp[i].sanswerBW = false;
          } else if (this.examp[i].sanswer == "C") {
            this.examp[i].sanswerCW = false;
          } else if (this.examp[i].sanswer == "D") {
            this.examp[i].sanswerDW = false;
          }
        }
      }
      console.log("hhhh" + JSON.stringify(this.examp));

      this.examb = this.blank;
      for (j = 0, i = lene; j < lenb, i < len; j++, i++) {
        this.$set(this.examb[j], "sanswer", this.answer[i].sanswer);
        this.$set(this.examb[j], "statement", this.answer[i].statement);
        this.$set(this.examb[j], "corrAns", this.answer[i].corrAns);
      }
    },
    jump(index) {
      // let jump = this.$refs.exams("#" + postion);
      // // 获取需要滚动的距离
      // // let total = jump[0].offsetTop;
      // //实现form锚点定位
      // this.$refs.exams.scrollTop = jump[0].offsetTop;
      let h = this.$refs.examHeight[index].$el.offsetTop;
      this.$refs.htmlHeight.$el.scrollTop = h;
      console.log(this.$refs.htmlHeight.$el.scrollTop);
    }
  }
};
</script>
<style scoped>
.el-radio__input.is-checked .el-radio__inner {
  border-color: red;
  background: red;
}
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
.answer-buttong {
  background: #13ce66;
  padding: 0px;
  color: #0a0a0a;
  border-color: #30b08f;
  margin-left: 10px;
  width: 30px;
  height: 30px;
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
.summit-button {
  position: fixed;
  right: 5%;
  top: 80%;
}
.right {
  background-color: rgba(103, 194, 58, 0.721);
}
.wrong {
  background-color: #f56c6c;
}
</style>
<style>
.el-radio__input.is-disabled + span.el-radio__label {
  color: #0a0a0a !important;
}
.el-input.is-disabled .el-input__inner {
  color: #0a0a0a !important;
}
.detail .el-input__inner .right {
  background-color: rgba(103, 194, 58, 0.721) !important;
}
.wrong {
  background-color: #f56c6c !important;
}
.trueOrWrong {
  float: right;
}
</style>