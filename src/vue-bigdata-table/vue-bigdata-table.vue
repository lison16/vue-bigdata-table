<style lang="less">
	@import './vue-bigdata-table.less';
</style>

<template>
	<div class="vue-bigdata-table-outer" ref="outer" @scroll="handleScroll">
		<div :class="wrapperClasses" :style="tableWidthStyles">
			<div class="vue-bigdata-table-wrapper" ref="outWrapper">
				<div class="vue-bigdata-table-header-wrapper" :style="headerStyle">
				<slot name="top" :cellWidthArr="cellWidthArr"></slot>
				<table v-if="fixedCell >= 0" :class="['vue-bigdata-table-fixed-header', showFixedBoxShadow ? 'box-shdow' : '']" cellspacing="0" cellpadding="0" border="0">
					<colgroup>
						<col :width="width" v-for="(width, i) in cellWidthArr" :key="'header-key-fixed-' + i" />
					</colgroup>
					<tr
						:style="{cursor: cursorOnHeader}"
						@mousemove.capture.prevent="handleMousemove"
						@mousedown="handleMousedown"
						@mouseup="canNotMove"
						@mouseleave="canNotMove">
						<th v-if="i <= fixedCell" v-for="(col, i) in columnsHandled" :data-index="i" :key="`table-title-${i}`" style="border-right: 1px solid #e9eaec;">
							<span v-if="!col.render">{{ col.title }}</span>
							<render-dom v-else :render="col.render" :back-value="showIndex ? (i - 1) : i"></render-dom>
						</th>
					</tr>
				</table>
				<table ref="headerTable" style="position: absolute;left: 0;top: 0;" cellspacing="0" cellpadding="0" border="0" width="100%">
					<colgroup>
						<col :width="width" v-for="(width, i) in cellWidthArr" :key="'header-key-' + i" />
					</colgroup>
					<tr
						:style="{cursor: cursorOnHeader}"
						@mousemove.capture.prevent="handleMousemove"
						@mousedown="handleMousedown"
						@mouseup="canNotMove"
						@mouseleave="canNotMove">
						<th v-for="(col, i) in columnsHandled" :data-index="i" :key="`table-title-${i}`">
							<span v-if="!col.render && (i > fixedCell)">{{ col.title }}</span>
							<render-dom v-else-if="(i > fixedCell)" :render="col.render" :back-value="showIndex ? (i - 1) : i"></render-dom>
						</th>
					</tr>
				</table>
			</div>
			<div class="vue-bigdata-table-content">
				<div :style="{height: `${topPlaceholderHeight}px`}"></div>
					<render-dom :render="renderTable"></render-dom>
					<div :style="{height: `${bottomPlaceholderHeight}px`}"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import renderDom from './components/renderDom';
import editRender from './components/input-render';
import mixins from './mixins';
export default {
	name: 'bigdataTable',
	components: {
		renderDom
	},
	mixins: [ ...mixins ],
	props: {
		showIndex: {
			type: Boolean,
			default: false
		},
		value: {
			type: Array
		},
		rowHeight: Number,
		fixed: {
			type: Boolean,
			default: false
		},
		columns: {
			type: Array
		},
		cellWidth: {
			type: Number,
			default: 100
		},
		headerHeight: {
			type: Number,
			default: 52
		},
		headerTrStyle: {
			type: Object,
			default: () => {
				return {};
			}
		},
		indexWidth: {
			type: Number,
			default: 70
		},
		indexRender: {
			type: Function,
			default: (h, index) => {
				return h('span', index + 1);
			}
		},
		stripe: {
			type: Boolean,
			default: false
		},
		atCellPosi: {
			type: Number,
			default: 80
		},
		fixedCell: {
			type: Number,
			default: -1
		},
		appendNum: {
			type: Number,
			default: 15
		},
		preventExtensions: {
			type: Boolean,
			default: false
		},
		canEdit: {
			type: Boolean,
			default: false
		},
		startEditType: {
			type: String,
			default: 'dblclick'
		},
		editCellRender: {
			type: Function,
			default: editRender
		},
		beforeSave: {
			type: Function,
			default: () => {
				return true;
			}
		}
	},
	data () {
		return {
			prefix: 'vue-bigdata-table'
		};
	},
	methods: {
		// 涉及到表格容器尺寸变化或数据变化的情况调用此方法重新计算相关值
		resize () {
			this._tableResize();
		},
		// 获取表格横向滚动的距离
		getScrollLeft () {
			return this.$refs.outer.scrollLeft;
		},
		// 调用此方法跳转到某条数据
		scrollToRow (index) {
			this._scrollToIndexRow(index);
		},
		// canEdit为true时调用此方法使第row+1行第col+1列变为编辑状态，这里的行列指的是表格显示的行和除序列号列的列
		editCell (row, col) {
			this._editCell(row, col);
		}
	},
	watch: {
		value () {
			this.resize();
		},
		currentIndex () {
			this.setTopPlace();
		}
	},
	mounted () {
		if (this.indexWidth === undefined) this.indexWidth = this.setIndexWidth(this.value.length);
		this.resize();
	}
};
</script>
