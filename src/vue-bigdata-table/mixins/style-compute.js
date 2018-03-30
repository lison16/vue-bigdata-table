import { getScrollbarWidth } from '../util';
export default {
	data () {
		return {
			wrapperHeight: 0,
			scrollTop: 0,
			moduleHeight: 0, // 三个tr块中的一块的高度
			topPlaceholderHeight: 0, // 顶部占位容器高度
			bottomPlaceholderHeight: 0, // 底部占位容器高度
			tableWidth: 0,
			widthArr: [], // 用于给数据表格传递列宽
			totalRowHeight: 0, // 如果全量渲染应该是多高，用于计算占位
			placeholderHeight: 0,
			currentScrollToRowIndex: -1 // 当前跳转到的行号，用于做闪烁提示
		};
	},
	computed: {
		fixedCellCom () {
			return this.showIndex ? (this.fixedCell + 1) : this.fixedCell;
		},
		wrapperClasses () {
			return [
				this.prefix,
				this.fixed ? `${this.prefix}-fixed` : ''
			];
		},
		headerStyle () {
			return {
				position: this.fixed && this.headerHeight ? 'sticky' : '',
				height: this.headerHeight + 'px',
				transform: 'translateX(0)'
			};
		},
		showFixedBoxShadow () {
			return this.scrollLeft !== 0;
		},
		tableWidthStyles () {
			return {width: this.tableWidth + 'px'};
		},
		rowStyles () {
			return this.rowHeight !== undefined ? {height: `${this.rowHeight}px`} : {};
		},
		itemRowHeight () {
			return this.rowHeight === undefined ? 48 : this.rowHeight;
		},
		cellWidthArr () {
			let len = this.cellNum;
			let i = 0;
			let cellWidthArr = [];
			let hasWidthCellCount = 0; // 统计设置了width的列的数量，从而为没有设置width的列分配宽度
			let noWidthCellIndexArr = []; // 没有设置宽度的列的序列
			let hasWidthCellTotalWidth = 0; // 设置了width的列一共多宽
			while (i < len) {
				if (this.columnsHandled[i].width) {
					hasWidthCellCount++;
					hasWidthCellTotalWidth += this.columnsHandled[i].width;
					cellWidthArr.push(this.columnsHandled[i].width);
				} else {
					noWidthCellIndexArr.push(i);
					cellWidthArr.push(0);
				}
				i++;
			}
			let noWidthCellWidth = (this.tableWidth - hasWidthCellTotalWidth) / (len - hasWidthCellCount);
			let w = 0;
			let indexArrLen = noWidthCellIndexArr.length;
			while (w < indexArrLen) {
				cellWidthArr[noWidthCellIndexArr[w]] = noWidthCellWidth;
				w++;
			}
			this.widthArr = cellWidthArr;
			return cellWidthArr;
		},
		cursorOnHeader () {
			return this.headerTrStyle.cursor ? this.headerTrStyle.cursor : ((this.isOnCellEdge || this.canResizeCell) ? 'col-resize' : 'default');
		}
	},
	methods: {
		_tableResize () {
			this.$nextTick(() => {
				this.updateHeight();
				let scrollBarWidth = this.totalRowHeight > this.wrapperHeight ? getScrollbarWidth() : 0;
				let outerWidth = this.$refs.outer.offsetWidth - 2 - scrollBarWidth;
				let width = this.cellWidth * this.columns.length + (this.showIndex ? this.indexWidth : 0);
				this.tableWidth = width > outerWidth ? width : outerWidth;
				this.widthArr = this.cellWidthArr;
			});
		},
		updateHeight () {
			this.$nextTick(() => {
				let wrapperHeight = this.$refs.outer.offsetHeight;
				this.itemNum = Math.ceil((wrapperHeight - this.headerHeight) / this.itemRowHeight) + this.appendNum;
				this.moduleHeight = this.itemNum * this.itemRowHeight;
				this.wrapperHeight = wrapperHeight;
				this.setTopPlace();
			});
		},
		setComputedProps () {
			const len = this.value.length;
			this.totalRowHeight = len * this.itemRowHeight;
		},
		watchTopPlaceholderHeight () {
			const len = this.value.length;
			this.totalRowHeight = len * this.itemRowHeight;
			this.placeholderHeight = this.totalRowHeight - this.moduleHeight * 3;
			this.bottomPlaceholderHeight = (this.placeholderHeight - this.topPlaceholderHeight) < 0 ? 0 : this.placeholderHeight - this.topPlaceholderHeight;
		},
		setIndexWidth (len) {
			let width = 70;
			if (len <= 99) {
				width = 50;
			} else if (len > 99 && len <= 1000) {
				width = 60;
			} else if (len > 1000 && len <= 10000) {
				width = 70;
			} else if (len > 10000 && len <= 100000) {
				width = 90;
			} else {
				width = 100;
			}
			return width;
		},
		setTopPlace () {
			let scrollTop = this.scrollTop;
			switch (this.currentIndex) {
				case 1: this.times0 = parseInt((scrollTop + this.moduleHeight) / (this.moduleHeight * 3)); this.times1 = this.times0; this.times2 = (this.times0 === 0 ? -1 : this.times0); break;
				case 2: this.times1 = parseInt((scrollTop - this.moduleHeight) / (this.moduleHeight * 3)); this.times2 = this.times1; this.times0 = this.times1 + 1; break;
				case 0: this.times2 = parseInt((scrollTop - this.moduleHeight * 2) / (this.moduleHeight * 3)); this.times0 = this.times1 = this.times2 + 1; break;
			}
			let height = scrollTop - this.moduleHeight;
			this.topPlaceholderHeight = parseInt((height < 0 ? 0 : height) / this.moduleHeight) * this.moduleHeight;
			this.watchTopPlaceholderHeight();
			this.setTableData();
		}
	}
};
