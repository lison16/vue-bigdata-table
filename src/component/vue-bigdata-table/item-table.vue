<template>
    <table ref="itemTable" :class="dataTableClasses" cellspacing="0" cellpadding="0" border="0" width="100%">
        <colgroup>
            <col :width="width" v-for="(width, i) in widthArr" :key="'colgroup-' + i">
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
        widthArr: Array
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
