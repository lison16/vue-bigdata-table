import ItemTable from '../components/item-table.vue';
export default {
	data () {
		return {
			times0: 0, // 当前是第几轮
			times1: 0,
			times2: -1,
			table1Data: [],
			table2Data: [],
			table3Data: [],
			currentIndex: 1, // 当前展示的表格是第几个
			itemNum: 0, // 一块数据显示的数据条数
			timer: null,
			scrollLeft: 0
		};
	},
	computed: {
		cellNum () { // 表格列数
			return this.columnsHandled.length;
		},
		columnsHandled () {
			let columns = [...this.columns];
			if (this.showIndex) {
				columns.unshift({
					title: 'No',
					align: 'center',
					width: this.indexWidth
				});
			}
			return columns;
		}
	},
	methods: {
		handleScroll (e) {
			let ele = e.srcElement;
			let { scrollTop, scrollLeft } = ele;
			this.scrollLeft = scrollLeft;
			// let direction = (scrollTop - this.scrollTop) > 0 ? 1 : ((scrollTop - this.scrollTop) < 0 ? -1 : 0); // 1 => down  -1 => up  0 => stop
			this.currentIndex = parseInt(((scrollTop + this.moduleHeight) % (this.moduleHeight * 3)) / this.moduleHeight);
			this.scrollTop = scrollTop;
		},
		setTableData () {
			let count1 = this.times0 * this.itemNum * 3;
			this.table1Data = this.value.slice(count1, count1 + this.itemNum);
			let count2 = this.times1 * this.itemNum * 3;
			this.table2Data = this.value.slice(count2 + this.itemNum, count2 + this.itemNum * 2);
			let count3 = this.times2 * this.itemNum * 3;
			this.table3Data = this.value.slice(count3 + this.itemNum * 2, count3 + this.itemNum * 3);
		},
		getTables (h) {
			let table1 = this.getItemTable(h, this.table1Data, 1);
			let table2 = this.getItemTable(h, this.table2Data, 2);
			let table3 = this.getItemTable(h, this.table3Data, 3);
			if (this.currentIndex === 1) {
				return [table3, table1, table2];
			} else if (this.currentIndex === 2) {
				return [table1, table2, table3];
			} else {
				return [table2, table3, table1];
			}
		},
		getItemTable (h, data, index) {
			return h(ItemTable, {
				props: {
					times: this['times' + (index - 1)],
					tableIndex: index,
					itemData: data,
					itemNum: this.itemNum,
					rowStyles: this.rowStyles,
					widthArr: this.widthArr,
					columns: this.columnsHandled,
					showIndex: this.showIndex,
					indexRender: this.indexRender,
					stripe: this.stripe,
					fixedCell: this.fixedCell,
					currentScrollToRowIndex: this.currentScrollToRowIndex,
					canEdit: this.canEdit,
					edittingTd: this.edittingTd,
					startEditType: this.startEditType,
					showFixedBoxShadow: this.showFixedBoxShadow,
					editCellRender: this.editCellRender,
					beforeSave: this.beforeSave
				},
				on: {
					'on-click-tr': (index) => {
						this.$emit('on-click-tr', index);
					},
					'on-click-td': (params) => {
						this.$emit('on-click-td', params);
					},
					'on-edit-cell': (row, col) => {
						this.edittingTd = `${row}-${col}`;
					},
					'on-success-save': ({ row, col, value }) => {
						let data = [...this.value];
						data[row][col] = value;
						this.$emit('input', data);
						this.$emit('on-success-save', { row, col, value });
						this.edittingTd = '';
					},
					'on-fail-save': ({ row, col, value }) => {
						this.$emit('on-fail-save', { row, col, value });
					},
					'on-cancel-edit': () => {
						this.edittingTd = '';
					}
				},
				key: 'table-item-key' + index,
				ref: 'itemTable' + index
			});
		},
		_scrollToIndexRow (index) {
			index = parseInt(index);
			if (isNaN(index) || index >= this.value.length || index < 0) return;
			let scrollTop = index * this.itemRowHeight;
			this.scrollTop = scrollTop;
			this.currentIndex = parseInt(((scrollTop + this.moduleHeight) % (this.moduleHeight * 3)) / this.moduleHeight);
			this.$refs.outer.scrollTop = this.scrollTop;
			this.currentScrollToRowIndex = index;
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.currentScrollToRowIndex = -1;
			}, 1800);
			this.setTopPlace();
		},
		renderTable (h) {
			return h('div', {
				style: this.tableWidthStyles
			}, this.getTables(h));
		}
	}
};
