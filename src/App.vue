<template>
  <div id="app">
    <div class="wraper">
      <bigdata-table show-index :cell-width="200" :header-height="80" fixed v-model="tableData" :columns="columns"></bigdata-table>
    </div>
  </div>
</template>

<script>
import BigdataTable from './component/vue-bigdata-table';
import tableHeader from './table-header.vue';
import { handleData } from './util.js';
let wordsArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
export default {
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
		let data = {};
		let dataArr = [];
		let dataNum = 1000;
		console.time('getData');
		for (let i = 0; i < dataNum; i++) {
			dataArr.push([
				i + '00',
				'count' + i,
				'23.4534534345',
				'0023' + i,
				'123.234534534534',
				'namenasdfsdfsdfsdfssdfsdfsdsdfsdfsf' + i,
				'2014年1月1日'
			]);
		}
		this.tableData = dataArr;
		let rows = [];
		let i = -1;
		while (i++ < dataNum) {
			for (let k in this.tableData[i]) {
				if (rows[k]) {
					rows[k].push(this.tableData[i][k]);
				} else {
					rows[k] = [this.tableData[i][k]];
				}
			}
		}
		console.timeEnd('getData');
		data = {
			rows: rows,
			headers: ['这是数字', '这是字符1列', '这是纬度', '这是数字', '这是经度', '这是字符2列', '这是时间']
		};
		console.time('handleData');
		let res = handleData(data, 50);
		console.timeEnd('handleData');

		console.time('getColumns');
		let columns = res.header.map((title, col) => {
			return {
				title: title,
				render: (h, col) => {
					return h('div', {
						'class': [
							'header-title-wraper'
						],
						on: {
							click: () => {
								console.log(col)
							}
						}
					}, [
						h('div', {
							'class': [
								'mark-con'
							]
						}, wordsArr[col]),
						h('div', {
							'class': [
								'title-con'
							]
						}, [
							h(tableHeader, {
								props: {
									title: title,
									col: col,
									type: res.type[col],
									noRepeatList: res.minList[col]
								},
								on: {
									onChangeType: (col, type) => {
										let header = this.columns.splice(col, 1);
										header[0].align = type;
										this.columns.splice(col, 0, ...header);
									}
								}
							})
						])
					]);
				},
				align: res.type[col] === 'number' ? 'right' : (res.type[col] === 'string' ? 'left' : 'center')
			};
		});
		columns.forEach((item, index) => {
			if (index === 2) {
				item.cellRender = (h, res) => {
					return h('Button', {
						on: {
							click () {
								console.log(res)
							}
						},
						props: {
							type: 'primary'
						}
					}, 'click');
				};
			}
		});
		console.timeEnd('getColumns');
		console.time('draw');
		this.columns = columns;
		this.tableData = res.data;
		console.timeEnd('drwa');
	}
};
</script>

<style>
#app {
  position: absolute;
  top: 0px;
  right: 100px;
  bottom: 0px;
  left: 100px;
}
.wraper{
  margin: 100px 100px 0;
  width: 500px;
  height: 300px;
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
