<template>
  <div> 
    <!-- 试题 -->
    <el-page-header @back="back" content="详情页面">     
    </el-page-header> 
    <!-- {{paperRow}} -->
    <paperContentChoose :paperRow="paperRow + ''"></paperContentChoose>
    <paperContentBlank :paperRow="paperRow + ''"></paperContentBlank>
  </div>
</template>
<script>
// import axios from "axios";
import paperContentChoose from "./paperContentChoose";
import paperContentBlank from "./paperContentBlank";
export default {
  created() {

  },
  components:{
      paperContentChoose,
      paperContentBlank
  },
  props:{
      paperRow: String
  },
  data() {
    return {
      
    };
  },
  methods: {
    back(){
        this.$emit("back");
    },
    
  }
};
</script>
<style scoped>
.summit-button{
  position:fixed;
  right:5%;
  top: 80%;
}
</style>