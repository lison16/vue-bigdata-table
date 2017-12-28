<template>
    <table :class="dataTableClasses" cellspacing="0" cellpadding="0" border="0">
        <tr v-for="(tr, index) in itemData" :key="index">
            <td v-for="(td, i) in tr" class="vue-bigdata-table-cell" :style="rowStyles" :key="i">
                <div class="vue-bigdata-table-cell">{{ td }}</div>
            </td>
        </tr>
    </table>
</template>
<script>
export default {
    name: 'ItemTable',
    data () {
        return {
            prefix: 'vue-bigdata-table-data-table'
        };
    },
    props: {
        itemData: Array,
        rowStyles: Object
    },
    computed: {
        dataTableClasses () {
            return [
                this.prefix
            ];
        }
    }
};
</script>
