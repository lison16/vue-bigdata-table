<template>
    <table ref="itemTable" :class="dataTableClasses" cellspacing="0" cellpadding="0" border="0" width="100%">
        <colgroup>
            <col 
                :width="width" v-for="(width, i) in widthArr"
                :key="'colgroup-' + i"
            >
        </colgroup>
        <tbody>
            <tr v-for="(tr, index) in itemData" :key="index">
                <td v-if="showIndex" :class="['vue-bigdata-table-cell', 'vue-bigdata-table-data-table-center']">{{ indexBase + index + 1 }}</td>
                <td v-for="(td, i) in tr" :class="['vue-bigdata-table-cell', setAlign(i)]" :style="rowStyles" :key="i">
                    <div v-if="!showCellRender[showIndex ? (i + 1) : i]" class="vue-bigdata-table-cell">{{ td }}</div>
                    <template v-else>
                        <render-dom :render="showCellRender[showIndex ? (i + 1) : i]" :back-value="backValue((indexBase + index), i)"></render-dom>
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
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
			tableWidth: 0
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
		showIndex: Boolean
	},
	computed: {
		dataTableClasses () {
			return [
				this.prefix
			];
		},
		indexColumnsIndex () {
			this.columns.some(item => {
				return item.type === 'index';
			});
			let i = 0;
			let len = this.columns.length;
			while (i < len) {
				if (this.columns[i].type === 'index') {
					return i;
				}
				i++;
			}
			return false;
		},
		indexAlign () {
			return this.prefix + '-' + (this.columns[this.indexColumnsIndex].align || 'center');
		},
		indexBase () {
			return this.times * this.itemNum * 3 + this.itemNum * (this.tableIndex - 1);
		},
		showCellRender () {
			return this.columns.map(item => {
				return item.cellRender ? item.cellRender : undefined;
			});
		}
	},
	methods: {
		getCellWidth (col) {
			if (col.width === undefined) {
				return this.$refs.itemTable.offsetWidth / this.columns.length;
			}
		},
		setAlign (i) {
			i = this.showIndex ? i + 1 : i;
			let col = this.columns[i];
			return this.prefix + '-' + col.align;
		},
		backValue (row, col) {
			return {
				row: row,
				col: col
			};
		}
	}
};
</script>
