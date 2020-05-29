<template>
  <div>
    <el-tabs v-model="activeName">
        <el-tab-pane label="选择题" name="first">
            <chooseQuestion></chooseQuestion>
        </el-tab-pane>
        <el-tab-pane label="填空题" name="second">
            <blankQuestion></blankQuestion>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import axios from "axios";
import chooseQuestion from "../../components/chooseQuestion";
import blankQuestion from "../../components/blankQuestion";
export default {
  created() {
    
  },
  components: {
    chooseQuestion,
    blankQuestion
  },
  data() {
    return {
      activeName: 'first',
    };
  },
  methods: {
    
  }
};
</script>
<style scoped>

</style>