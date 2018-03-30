<template>
	<div class="vue-bigdata-table-item-table">
		<table v-show="showTable && fixedCell >= 0" :class="['vue-bigdata-table-data-table', 'vue-bigdata-table-fixed-table', showFixedBoxShadow ? 'box-shdow' : '']" :style="fixedCellStyles" cellspacing="0" cellpadding="0" border="0">
			<colgroup>
				<col
					:width="width" v-for="(width, i) in widthArr"
					:key="'colgroup-fixed-' + i"
				>
			</colgroup>
			<tbody>
				<tr
					v-for="(tr, index) in itemData"
					:key="index"
					:style="{background: currentMouseEnterIndex === index ? '#ebf7ff' : ''}"
					:class="[stripe && (indexBase + index) % 2 !== 0 ? 'stripe-gray' : '', tr.className, currentScrollToRowIndex === indexBase + index ? 'scroll-to-row-tip' : '']"
					@click="handleClickTr(indexBase + index)"
					@mouseenter.stop="handleMouseIn(index)"
					@mouseleave.stop="handleMouseLeave">
					<td v-if="showIndex" :class="['vue-bigdata-table-cell', 'vue-bigdata-table-data-table-center']" style="position: sticky;">
						<render-dom :render="indexRender" :back-value="(indexBase + index)"></render-dom>
					</td>
					<td v-if="i <= fixedCellCom" @click="handleClickTd(indexBase + index, i)" @dblclick="handleDblclickTd(indexBase + index, i, typeof td === 'object' ? td.value : td)" v-for="(td, i) in tr" :class="['vue-bigdata-table-cell', setAlign(i), typeof td === 'object' ? td.className : '']" :style="rowStyles" :key="i">
						<template v-if="!canEdit || (canEdit && `${indexBase + index}-${i}` !== edittingTd)">
							<div v-if="!showCellRender[showIndex ? (i + 1) : i]" class="vue-bigdata-table-cell">{{ typeof td === 'object' ? td.value : td }}</div>
							<template v-else>
								<render-dom :render="showCellRender[showIndex ? (i + 1) : i]" :back-value="{row: indexBase + index, col: i}"></render-dom>
							</template>
						</template>
						<render-dom v-else :render="editCellRender" :back-value="{row: indexBase + index, col: i, value: typeof td === 'object' ? td.value : td, beforeSave}"></render-dom>
					</td>
				</tr>
			</tbody>
		</table>
		<table v-show="showTable" ref="itemTable" class="vue-bigdata-table-data-table vue-bigdata-table-content-table" :style="{position: fixedCell < 0 ? '' : 'absolute'}" cellspacing="0" cellpadding="0" border="0" width="100%">
			<colgroup>
				<col
					:width="width" v-for="(width, i) in widthArr"
					:key="'colgroup-' + i"
				>
			</colgroup>
			<tbody>
				<tr
					v-for="(tr, index) in itemData"
					:key="index"
					@click="handleClickTr(indexBase + index)"
					@mouseenter.stop="handleMouseIn(index)"
					@mouseleave.stop="handleMouseLeave"
					:style="{background: currentMouseEnterIndex === index ? '#ebf7ff' : ''}"
					:class="[stripe && (indexBase + index) % 2 !== 0 ? 'stripe-gray' : '', tr.className, currentScrollToRowIndex === indexBase + index ? 'scroll-to-row-tip' : '']">
					<td v-if="showIndex" :class="['vue-bigdata-table-cell', 'vue-bigdata-table-data-table-center']">
						<render-dom v-if="fixedCell < 0" :render="indexRender" :back-value="(indexBase + index)"></render-dom>
					</td>
					<td v-for="(td, i) in tr" @click="handleClickTd(indexBase + index, i)" @dblclick="handleDblclickTd(indexBase + index, i, typeof td === 'object' ? td.value : td)" :class="['vue-bigdata-table-cell', setAlign(i), typeof td === 'object' ? td.className : '']" :style="rowStyles" :key="i">
						<template v-if="!canEdit || (canEdit && `${indexBase + index}-${i}` !== edittingTd)">
							<div v-if="(!showCellRender[showIndex ? (i + 1) : i]) && (i >= fixedCell)" class="vue-bigdata-table-cell">{{ typeof td === 'object' ? td.value : td }}</div>
							<template v-else-if="i >= fixedCell">
								<render-dom :render="showCellRender[showIndex ? (i + 1) : i]" :back-value="{row: indexBase + index, col: i}"></render-dom>
							</template>
						</template>
						<render-dom v-else :render="editCellRender" :back-value="{row: indexBase + index, col: i, value: typeof td === 'object' ? td.value : td, beforeSave}"></render-dom>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import renderDom from './renderDom';
export default {
	name: 'ItemTable',
	components: {
		renderDom
	},
	data () {
		return {
			prefix: 'vue-bigdata-table-data-table',
			tableWidth: 0,
			currentMouseEnterIndex: -1,
			editInputValue: ''
		};
	},
	props: {
		times: Number,
		tableIndex: Number,
		itemData: Array,
		rowStyles: Object,
		widthArr: Array,
		columns: Array,
		itemNum: Number,
		showIndex: Boolean,
		indexRender: Function,
		stripe: Boolean,
		fixedCell: Number,
		currentScrollToRowIndex: Number,
		canEdit: Boolean,
		edittingTd: String,
		startEditType: String,
		showFixedBoxShadow: Boolean,
		editCellRender: Function,
		beforeSave: Function
	},
	computed: {
		showTable () {
			return this.itemData.length > 0;
		},
		indexBase () {
			return this.times * this.itemNum * 3 + this.itemNum * (this.tableIndex - 1);
		},
		showCellRender () {
			return this.columns.map(item => {
				return item.cellRender ? item.cellRender : undefined;
			});
		},
		baseIndex () {
			return this.showIndex ? 1 : 0;
		},
		fixedCellStyles () {
			return {
				position: 'sticky',
				left: 0,
				zIndex: 60
			};
		},
		fixedCellCom () {
			return this.showIndex ? (this.fixedCell - 1) : this.fixedCell;
		}
	},
	methods: {
		setAlign (i) {
			let columns = this.columns[i + this.baseIndex];
			if (!columns) return;
			let col = columns;
			return this.prefix + '-' + col.align;
		},
		backValue (row, col) {
			return {
				row: row,
				col: col
			};
		},
		handleMouseIn (index) {
			this.currentMouseEnterIndex = index;
		},
		handleMouseLeave () {
			this.currentMouseEnterIndex = -1;
		},
		handleClickTr (index) {
			this.$emit('on-click-tr', index);
		},
		handleClickTd (row, col) {
			this.$emit('on-click-td', { row, col });
		},
		editCell (row, col) {
			this.$emit('on-edit-cell', row, col);
		},
		handleDblclickTd (row, col, value) {
			this.editInputValue = value;
			if (this.canEdit && this.startEditType === 'dblclick') this.editCell(row, col);
		}
	}
};
</script>
