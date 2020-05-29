<template>
  <p class="al-list">
    <span class="al-list-label" :style="{'width':lableWidth}">{{label}}</span>
    <span :contenteditable="isEdit">{{text}}</span>
    <i :class="icon" class="al-list-icon"></i>
  </p>
</template>
<script>
export default {
  props: {
    label: String,
    text: String,
    icon: {
      type: String
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    lableWidth: {
      type: [String, Number],
      default: "40%"
    }
  },
  methods: {}
};
</script>
<style scoped>
.al-list {
  font-size: 20px;
  text-align: left;
  line-height: 30px;
}
.al-list:hover {
  background-color: #e4e7ed;
}
.al-list-label {
  float: left;
  text-align: right;
}
.al-list-icon {
  display: none;
  /* float: right; */
}
.al-list:hover .al-list-icon {
  display: inline-block;
  margin: 0 10px;
}
</style>