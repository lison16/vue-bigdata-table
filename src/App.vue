<template>
  <div id="app">
    <div class="wraper">
      <bigdata-table fixed v-model="tableData" :columns="columns"></bigdata-table>
    </div>
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
      tableData: [],
      columns: []
    };
  },
  mounted () {
    let dataArr = [];
    for (let i = 0; i < 10000; i++) {
      dataArr.push({
        id: i,
        value: i + '00',
        count: 'count' + i,
        name: 'namenasdfsdfsdfsdfssdfsdfsdsdfsdfsdfsf' + i
      });
    }
    this.tableData = dataArr;
    this.columns = [
      {
        title: 'id',
        key: 'id',
        width: 100
      },
      {
        title: 'value',
        key: 'value'
      },
      {
        title: 'count',
        key: 'count'
      },
      {
        title: 'name',
        key: 'name'
      }
    ];
  }
}
</script>

<style>
#app {
  position: absolute;
  top: 0px;
  right: 100px;
  bottom: 100px;
  left: 100px;
}
.wraper{
  margin: 100px 100px;
  width: 1000px;
  height: 700px;
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
