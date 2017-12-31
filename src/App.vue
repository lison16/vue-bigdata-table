<template>
  <div id="app">
    <div class="wraper">
      <bigdata-table :cell-width="200" :header-height="80" fixed v-model="tableData" :columns="columns"></bigdata-table>
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
        value: i + '00',
        count: 'count' + i,
        name: 'namenasdfsdfsdfsdfssdfsdfsdsdfsdfsdfsf' + i,
        sd: 'namenasdfsdfsdfsdfssdfsdfsdsdfsdfsf' + i,
        sdd: 'namenasdfsdfsdfsdfssdfsdfsdsdfsdfsdfsf' + i,
        sds: 'namenasdfsdfsdfsdfssdfsdfsdsdfsdfsf' + i,
        sdds: 'namenasdfsdfsdfsdfssdfsdfsdsdfsdfsdfsf' + i,
        sdsss: 'namenasdfsdfsdfsdfssdfsdfsdsdfsdfsf' + i,
        time: '2014年1月1日'
      });
    }
    this.tableData = dataArr;
    this.columns = [
      {
        title: 'id',
        // key: 'id',
        width: 100,
        // align: 'center',
        cellRender: (h) => {
          // return h
        },
        type: 'index'
      },
      {
        title: 'value',
        // key: 'value',
        render: (h, index) => {
          return h('button', {
            style: {
              width: '100%',
              height: '50px'
            },
            on: {
              click () {
                console.log(index)
              }
            }
          }, 'haha')
        },
        // align: 'left'
      },
      {
        title: 'count',
        // key: 'count',
        // align: 'right'
      },
      {
        title: 'name',
        // key: 'name'
      },
      {
        title: 'count',
        // key: 'sd'
      },
      {
        title: 'name',
        // key: 'sdd'
      },
      {
        title: 'count',
        // key: 'sds'
      },
      {
        title: 'name',
        // key: 'sdds'
      },
      {
        title: 'count',
        // key: 'sdsss'
      },
      {
        title: 'time',
        // key: 'sddsss'
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
  width: 500px;
  height: 700px;
  overflow: auto;
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
