<template>
  <button class="vue-bigdata-table-button" @click="handleClick">
    <span v-if="type === 'confirm'" class="icon confirm-icon"><i class="line confirm-icon-line1 line1"></i><i class="line confirm-icon-line2 line2"></i></span>
    <span v-else class="icon cancel-icon"><i class="line cancel-icon-line1 line1"></i><i class="line cancel-icon-line2 line2"></i></span>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: {
    type: String
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e);
    }
  }
};
</script>
<style lang="less">
.vue-bigdata-table-button{
  padding: 2px 7px;
  width: 20px;
  background: transparent;
  border: none;
  vertical-align: middle;
  outline: none;
  transform: translateY(3px);
  cursor: pointer;
  &:hover{
    .line{
      background: #2d8cf0;
      transition: background .2s ease;
    }
  }
  .icon{
    position: relative;
    display: inline-block;
    width: 10px;
    height: 10px;
    i{
      display: inline-block;
      position: absolute;
      left: 0px;
      top: 0px;
      background: #000000;
      border-radius: 1px;
      height: 2px;
    }
  }
  .line{
    transition: background .2s ease;
  }
  .confirm-icon{
    &-line1{
      width: 7px;
        transform: rotateZ(45deg) translate(3px, 0px);
    }
    &-line2{
      width: 10px;
      transform: rotateZ(-45deg) translate(5px, 4px);
    }
  }
  .cancel-icon{
    &-line1{
      width: 12px;
      transform: rotateZ(45deg);
    }
    &-line2{
      width: 12px;
      transform: rotateZ(-45deg);
    }
  }
}
</style>
