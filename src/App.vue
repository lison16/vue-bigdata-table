<template>
	<div id="app">
		<div class="wraper">
			<bigdata-table
				ref="table"
				v-model="tableDataHandled"
				:row-num="20"
				:col-num="7"
				show-index
				start-edit-type="dblclick"
				fixed
				stripe
        :index-width="80"
				:col-width="200"
				:header-height="80"
				:can-edit="canEdit"
				:at-right-cell-posi="20"
				:at-left-cell-posi="40"
				:columns="columns"
				:index-render="indexRender"
				:index-render-params="indexRenderParams"
				:fixed-col="0"
				:sort-index="2"
				:default-sort="defaultSort"
				selectable
				paste
				:beforeSave="beforeSave"
				:disabled-hover="false"
				@on-success-save="handleSuccessEdit"
				@on-fail-save="handleFailEdit"
				@on-moving-on-header="handleMoving"
				@on-click-tr="handleClickTr"
				@on-click-td="handleClickTd"
        @on-index-change="handleClickIndex"
			></bigdata-table>
		</div>
    <p style="padding-left: 100px;">你可以点击序列号试试</p>
		<div style="padding-left: 100px">
			<button @click="scrollRowTo(2)">跳转到第3行</button>
			<button @click="scrollRowTo(8978)">跳转到第8979行</button>
			<button @click="scrollRowTo(299)">跳转到第300行</button>
			<button @click="scrollRowTo(8997)">跳转到第8998行</button>
			<button @click="scrollRowTo(scrollIndex)">跳转到第{{ scrollIndex + 1 }}行</button>
			<button @click="editCell">编辑第{{ editRow }}行第{{ editCol }}列</button>
			<button @click="changeData(100)">change data</button>
			<button @click="changeDefaultSort">change default sort</button>
		</div>
	</div>
</template>
<script>
// let wordsArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
import bigdataTable from './vue-bigdata-table';
import indexRender from './index-render.js';
export default {
  name: 'app',
  components: {
    bigdataTable
  },
	data () {
		return {
			tableData: [],
			columns: [],
			tableDataHandled: [], // 带有数据的表格数据
			emptyData: [], // 空的表格数据
			scrollIndex: 1,
			canEdit: true,
			editRow: 1,
			editCol: 1,
			defaultSort: {1: 'down'},
      indexRender,
      indexRenderParams: {
				index: -1
			}
		};
	},
	watch: {
		tableDataHandled (res) {
			// console.log(res)
		}
	},
	methods: {
		handleMoving (e) {
			// console.log(e.atGivenArea + '......' + e.colIndex)
		},
		scrollRowTo (index) {
			this.$refs.table.scrollToRow(index);
		},
		handleClickTr (index) {
			// console.log(index)
		},
		handleClickTd (params) {
			// console.log(params)
		},
		clickEditBtn () {
			this.canEdit = !this.canEdit;
		},
		beforeSave ({ row, col, value }) {
			return (row + 1) % 2;
		},
		handleSuccessEdit ({ row, col, value, initRowIndex }) {
			console.log(`第${row + 1}行第${col + 1}列改为${value}`);
		},
		handleFailEdit (res) {
			console.log('偶数行不能编辑');
		},
		editCell () {
			this.$refs.table.editCell(this.editRow - 1, this.editCol - 1);
		},
		changeData (rowLen) {
			let dataArr = [];
			for (let i = 0; i < rowLen; i++) {
				let arr = [
					i + '00',
					'count' + i,
					'23.4534534345',
					'0023' + i,
					'123.234534534534',
					'namenasdfsdfsdfsdfssdfsdfsdsdfsdfsf' + i,
					'2014年1月1日'
				];
				dataArr.push(arr);
			}
			this.tableDataHandled = dataArr;
		},
		changeDefaultSort () {
			this.defaultSort = {2: 'up'};
		},
    handleClickIndex (index) {
      this.indexRenderParams.index = index;
    }
	},
	mounted () {
		this.changeData(10000);
		let headers = ['这是数字', '这是字符1列', '这是纬度', '这是数字', '这是经度', '这是字符2列', '这是时间'];
		let columns = headers.map((title, col) => {
			return {
				title: title,
				// render: (h, col) => {
				// 	return h('div', {
				// 		'class': [
				// 			'header-title-wraper'
				// 		],
				// 		on: {
				// 			click: () => {
				// 				console.log(col)
				// 			}
				// 		}
				// 	}, [
				// 		h('div', {
				// 			'class': [
				// 				'mark-con'
				// 			]
				// 		}, wordsArr[col]),
				// 		h('div', {
				// 			'class': [
				// 				'title-con'
				// 			]
				// 		}, [])
				// 	]);
				// },
				align: 'center'
			};
		});
		// console.timeEnd('getColumns');
		this.columns = columns;
	}
};
</script>

<style lang="less">
.wraper{
  margin: 0px auto;
  padding: 40px;
  width: 1000px;
  height: 500px;
  overflow: auto;
}
.header-title-wraper{
	height: 100%;
	width: 100%;
	.mark-con{
		height: ~"calc(40% - 1px)";
		width: 100%;
		border-bottom: 1px solid #e9eaec;;
		text-align: center;
		line-height: 27px;
	}
	.title-con{
		height: 60%;
		width: 100%;
		text-align: center;
		line-height: 41px;
	}
}
.unormal-value{
	background: #FFA3A1 !important;
}
.unormal-row{
	background: #FFD8D3 !important;
}
.unormal-index{
	background: #FF4C5E !important;
	color: white;
	font-size: 14px;
	font-weight: 700;
	height: 100%;
	line-height: 48px;
}
.index-render-item-wrapper{
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  .index-slide-wrapper{
    width: 200%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: translateX(0);
    transition: all .2s ease;
    &.slide-to-left{
      transform: translateX(-50%);
      transition: all .2s ease;
    }
    div{
      float: left;
      width: 50%;
      height: 100%;
    }
    .index-render-tip-con{
      background: #FFD0D0;
      line-height: 46px;
      .is-paintting-tip{
        padding: 4px 10px;
      }
    }
    .index-render-num-con{
      & > span{
        display: inline-block;
        height: 100%;
        line-height: 46px;
      }
    }
  }
}
</style>
