<template>
    <table ref="itemTable" :class="dataTableClasses" cellspacing="0" cellpadding="0" border="0">
        <colgroup>
            <col :width="getCellWidth(col)" v-for="(col, colIndex) in columns" :key="'colgroup-' + colIndex">
        </colgroup>
        <tbody>
            <tr v-for="(tr, index) in itemData" :key="index">
                <td v-for="(td, i) in tr" class="vue-bigdata-table-cell" :style="rowStyles" :key="i">
                    <div class="vue-bigdata-table-cell">{{ td }}</div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    name: 'ItemTable',
    data () {
        return {
            prefix: 'vue-bigdata-table-data-table',
            tableWidth: 0,
        };
    },
    props: {
        itemData: Array,
        rowStyles: Object,
        columns: Array
    },
    computed: {
        dataTableClasses () {
            return [
                this.prefix
            ];
        }
    },
    methods: {
        getCellWidth (col) {
            if (col.width === undefined) {
                return this.$refs.itemTable.offsetWidth / this.columns.length;
            }
        }
    }
};
</script>
