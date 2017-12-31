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
                <td v-if="showIndex">{{ times * 3 * itemNum + index }}</td>
                <td v-for="(td, tdKey, i) in tr" :class="['vue-bigdata-table-cell', setAlign(i, td)]" :style="rowStyles" :key="tdKey">
                    <div class="vue-bigdata-table-cell">{{ td }}</div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { hasOneOf } from './util';
export default {
    name: 'ItemTable',
    data () {
        return {
            prefix: 'vue-bigdata-table-data-table',
            tableWidth: 0,
        };
    },
    props: {
        times: Number,
        tableIndex: Number,
        itemData: Array,
        rowStyles: Object,
        widthArr: Array,
        columns: Array
    },
    computed: {
        dataTableClasses () {
            return [
                this.prefix
            ];
        },
        showIndex () {
            return this.columns.some(item => {return item.type === 'index'});
        },
        itemNum () {
            return this.itemData.length;
        }
    },
    methods: {
        getCellWidth (col) {
            if (col.width === undefined) {
                return this.$refs.itemTable.offsetWidth / this.columns.length;
            }
        },
        setAlign (i, content) {
            let col = this.columns[i];
            let align = (col && col.align) ? col.align : false;
            if (!align) {
                if (typeof content === 'number' || (!isNaN(parseFloat(content)) && ('1' + content === parseFloat('1' + content).toString()))) {
                    align = 'right';
                } else {
                    if (hasOneOf(content, [':', '年', '月', '日', '-', '：', '星期', '周'])) {
                        align = 'center';
                    } else {
                        align = 'left'
                    }
                }
            } else {
                align = 'center';
            }
            return this.prefix + '-' + align;
        }
    }
};
</script>
