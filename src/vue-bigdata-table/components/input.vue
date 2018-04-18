<template>
  <input class="vue-bigdata-table-input" :value="value" @input="handleInput" />
</template>
<script>
export default {
  name: 'Input',
  props: {
    value: [String, Number]
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value);
    }
  }
}
</script>
<style lang="less">
.vue-bigdata-table-input{
  //
}
</style>

