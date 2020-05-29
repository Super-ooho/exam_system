<template>
  <div> 
      <template>
        <el-carousel :interval="4000" type="card" height="250px" style="width:1000px; margin:0 auto;">
          <el-carousel-item v-for="item in img" :key="item">
            <img :src="item" class="image">
          </el-carousel-item>
        </el-carousel>
      </template>
  </div>
</template>
<script>
export default {
  created() {
    
  },
  data() {
    return {
      img:[
        "http://www.nenu.edu.cn/__local/8/FE/21/FD73743BCF84BEFB92662A03C64_F7DFDEF4_C9EB.jpg",
        "http://www.nenu.edu.cn/__local/F/6B/A6/1A4E5183C912C13CE599CD75520_A2D573BF_80825.jpg",
        "http://www.nenu.edu.cn/__local/0/9F/DC/82DFDDF33BE1CE745A57DEB1B71_5DE7CBD5_5A0C5.jpg",
        "http://www.nenu.edu.cn/__local/1/DB/91/C38DFD7C2AD392BD79FC8EC8EC4_A5836862_71D6B.jpg",
        "http://www.nenu.edu.cn/__local/5/28/8B/F8B9D5F3BD55929162A1093485B_C0C72AA5_39E9C.jpg",
        "http://www.nenu.edu.cn/__local/2/AF/59/00D9944963270FE555AF68A1163_A93506E1_1FD19.jpg"
      ]
    };
  },
  methods: {
    
  }
};
</script>
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .image{
    width: 500px;
    height: 250px;
  }
</style>