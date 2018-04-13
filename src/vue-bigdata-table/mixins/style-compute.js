import { getScrollbarWidth } from '../util';
export default {
	data () {
		return {
			wrapperHeight: 0,
			scrollTop: 0,
			moduleHeight: 0, // 三个tr块中的一块的高度
			topPlaceholderHeight: 0, // 顶部占位容器高度
			tableWidth: 0,
			widthArr: [], // 用于给数据表格传递列宽
			totalRowHeight: 0, // 如果全量渲染应该是多高，用于计算占位
			currentScrollToRowIndex: -1, // 当前跳转到的行号，用于做闪烁提示
			canSelectText: true, // 用于控制是否可选中表格文字
			indexWidthInside: 0,
			outerWidth: 0, // 外面容器宽度
			oldTableWidth: 0 // 旧的表格宽度，用于重新计算列宽
		};
	},
	computed: {
		fixedColCom () {
			return this.showIndex ? (this.fixedCol + 1) : this.fixedCol;
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
		placeholderHeight () {
			return this.totalRowHeight - this.moduleHeight * 3; // 占位容器的总高度(上 + 下)
		},
		bottomPlaceholderHeight () {
			return (this.placeholderHeight - this.topPlaceholderHeight) < 0 ? 0 : this.placeholderHeight - this.topPlaceholderHeight;
		},
		itemRowHeight () {
			return this.rowHeight === undefined ? 48 : this.rowHeight;
		},
		colWidthArr () {
			let len = this.cellNum;
			let i = -1;
			let colWidthArr = [];
			while (++i < len) {
				if (this.columnsHandled[i].width) {
					colWidthArr.push(this.columnsHandled[i].width);
				} else {
					colWidthArr.push(this.colWidth);
				}
			}
			this.widthArr = colWidthArr;
			return colWidthArr;
		},
		cursorOnHeader () {
			return this.headerTrStyle.cursor ? this.headerTrStyle.cursor : ((this.isOnCellEdge || this.canResizeCell) ? 'col-resize' : 'default');
		}
	},
	methods: {
		_tableResize () {
			this.$nextTick(() => {
				this.updateHeight();
				this.setComputedProps();
				let scrollBarWidth = this.totalRowHeight > this.wrapperHeight ? getScrollbarWidth() : 0;
				this.outerWidth = this.$refs.outer.offsetWidth - 2 - scrollBarWidth;
				let width = this.colWidth * this.columns.length + (this.showIndex ? this.indexWidthInside : 0);
				// console.log(width > outerWidth)
				this.tableWidth = width > this.outerWidth ? width : this.outerWidth;
				if (width < this.outerWidth) this._setColWidthArr();
				// this.widthArr = this.colWidthArr;
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
			let t0 = 0;
			let t1 = 0;
			let t2 = 0;
			if (scrollTop > this.moduleHeight) {
				switch (this.currentIndex) {
					case 0: t0 = parseInt(scrollTop / (this.moduleHeight * 3)); t1 = t2 = t0; break;
					case 1: t1 = parseInt((scrollTop - this.moduleHeight) / (this.moduleHeight * 3)); t0 = t1 + 1; t2 = t1; break;
					case 2: t2 = parseInt((scrollTop - this.moduleHeight * 2) / (this.moduleHeight * 3)); t0 = t1 = t2 + 1;
				}
			}
			this.times0 = t0;
			this.times1 = t1;
			this.times2 = t2;
			this.topPlaceholderHeight = parseInt(scrollTop / this.moduleHeight) * this.moduleHeight;
			this.setTableData();
		},
		_initMountedHandle () {
			if (this.indexWidth === undefined) this.indexWidthInside = this.setIndexWidth(this.value.length);
			else this.indexWidthInside = this.indexWidth;
			this.oldTableWidth = this.colWidthArr.reduce((sum, b) => {
				return sum + b;
			}, 0);
			this.widthArr = this.colWidthArr;
			if (this.colWidth * this.columns.length + (this.showIndex ? this.indexWidthInside : 0) < this.outerWidth) this._setColWidthArr();
		},
		_setColWidthArr () {
			let widthArr = this.widthArr.map(width => {
				return Math.ceil(width / this.oldTableWidth * this.tableWidth);
			});
			this.widthArr = widthArr;
			this.oldTableWidth = widthArr.reduce((sum, b) => {
				return sum + b;
			}, 0) + 4;
		}
	}
};
