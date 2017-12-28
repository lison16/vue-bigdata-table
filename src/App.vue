<template>
  <div id="app">
    <bigdata-table v-model="tableData"></bigdata-table>
  </div>
</template>

<script>
import BigdataTable from './component/vue-bigdata-table';
export default {
  name: 'app',
  components: {
    BigdataTable
  },
  data () {
    return {
      tableData: []
    };
  },
  mounted () {
    let dataArr = [];
    for (let i = 0; i < 10000; i++) {
      dataArr.push({
        id: i,
        value: i + '00',
        count: 'count' + i
      });
    }
    this.tableData = dataArr;
  }
}
</script>

<style>
#app {
  position: absolute;
  top: 100px;
  right: 100px;
  bottom: 100px;
  left: 100px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
