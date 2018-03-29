import { findNodeUpper } from '../util';
export default {
	data () {
		return {
			isOnCellEdge: false, // 鼠标是否在表头的两个单元格之间的边框上
			canResizeCell: false,
			initCellX: 0, // 用于计算鼠标移动的距离
			scrollLeft: 0,
			colIndex: 0, // 在表头上移动时鼠标坐在列的序号,
			atGivenArea: false // 是否在表头单元格指定区域(距右侧)
		};
	},
	methods: {
		handleMousemove (e) {
			let cell = e.srcElement.tagName.toUpperCase() === 'TH' ? e.srcElement : findNodeUpper(e.srcElement, 'th');
			let cellDomrect = cell.getBoundingClientRect();
			let atLeft = (e.pageX - cellDomrect.left) < (cellDomrect.width / 2);
			let atGivenArea = (cellDomrect.right - e.pageX) <= this.atCellPosi;
			let cellIndex = parseInt(cell.getAttribute('data-index')); // 当前单元格的序号
			if (atLeft && cellIndex !== 0) {
				this.isOnCellEdge = (e.pageX - cellDomrect.left) <= 1;
			} else if (!atLeft && cellIndex !== this.cellNum - 1) {
				this.isOnCellEdge = (cellDomrect.right - e.pageX) <= 1;
			}
			e.atGivenArea = atGivenArea;
			this.atGivenArea = atGivenArea;
			let index = 0; // 调整表格列宽的左侧的表格的序列
			e.colIndex = cellIndex;
			this.colIndex = cellIndex;
			this.$emit('on-moving-on-header', e);
			if (this.canResizeCell) {
				if (atLeft) {
					index = cellIndex - 1;
				} else {
					index = cellIndex;
				}
				let widthLeft = this.widthArr[index] + e.pageX - this.initCellX;
				let widthRight = this.widthArr[index + 1] + this.initCellX - e.pageX;
				this.widthArr.splice(index, 2, widthLeft, widthRight);
				this.initCellX = e.pageX;
			}
		},
		handleMousedown (e) {
			e.colIndex = this.cellIndex;
			this.$emit('on-mousedown-on-header', e);
			if (this.isOnCellEdge) {
				this.canResizeCell = true;
				this.initCellX = e.pageX;
			}
		},
		canNotMove (e) {
			this.canResizeCell = false;
			e.colIndex = this.colIndex;
			e.atGivenArea = this.atGivenArea;
			this.$emit('on-mouseup-on-header', e);
		}
	}
};
