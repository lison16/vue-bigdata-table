<style lang="less">
    @import './vue-bigdata-table.less';
</style>

<template>
    <div :class="wraperClasses">
        <div
            :class="dataWraperClasses"
            ref="outWraper"
            @scroll="handleScroll">
            <div :class="headerWraperClasses">
                <table ref="headerTable" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <th :width="getCellWidth(col.title)" v-for="(col, i) in columns" :key="`table-title-${i}`">{{ col.title }}</th>
                    </tr>
                </table>
            </div>
            <div :style="{height: `${topPlaceholderHeight}px`}"></div>
            <render-dom :render="renderTable"></render-dom>
            <div :style="{height: `${bottomPlaceholderHeight}px`}"></div>
        </div>
    </div>
</template>
<script>
import renderDom from './renderDom';
import ItemTable from './item-table.vue';
export default {
    name: 'BigdataTable',
    components: {
        renderDom
    },
    props: {
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
        }
    },
    data () {
        return {
            prefix: 'vue-bigdata-table',
            times0: 0, // 当前是第几轮
            times1: 0,
            times2: 0,
            currentIndex: 0, // 当前展示的表格是第几个
            itemNum: 50, // 一块数据显示的数据条数
            scrollTop: 0,
            moduleHeight: 0, // 三个tr块中的一块的高度
            topPlaceholderHeight: 0, // 顶部占位容器高度
            mark: 0, // 用于保存滚动距离来计算滚动方向
            direction: 0, // 滚动方向 1 is down, 0 is up
            tableWidth: 0,
            initCellWidth: 0
        };
    },
    computed: {
        wraperClasses () {
            return [
                this.prefix,
                this.fixed ? `${this.prefix}-fixed` : ''
            ];
        },
        headerWraperClasses () {
            return [
                `${this.prefix}-header-wraper`
            ]
        },
        dataWraperClasses () {
            return [
                `${this.prefix}-wraper`
            ]
        },
        dataTableClasses () {
            return [
                `${this.prefix}-data-table`
            ];
        },
        table1Data () {
            let count = this.times0 * this.itemNum * 3;
            return this.value.slice(count, count + this.itemNum);
        },
        table2Data () {
            let count = this.times1 * this.itemNum * 3;
            return this.value.slice(count + this.itemNum, count + this.itemNum * 2);
        },
        table3Data () {
            let count = this.times2 * this.itemNum * 3;
            return this.value.slice(count + this.itemNum * 2, count + this.itemNum * 3);
        },
        rowStyles () {
            return this.rowHeight !== undefined ? {height: `${this.rowHeight}px`} : {};
        },
        itemRowHeight () {
            return this.rowHeight === undefined ? 48 : this.rowHeight;
        },
        totalRowHeight () {
            const len = this.value.length;
            return len * this.itemRowHeight; // 所给所有数据如果全展示出来应该多高
        },
        placeholderHeight () {
            return this.totalRowHeight - this.moduleHeight * 3; // 占位容器的总高度(上 + 下)
        },
        bottomPlaceholderHeight () {
            return (this.placeholderHeight - this.topPlaceholderHeight) < 0 ? 0 : this.placeholderHeight - this.topPlaceholderHeight;
        }
    },
    methods: {
        getDomHeight (ele) {
            return ele.offsetHeight;
        },
        getDomWidth (ele) {
            return ele.offsetWidth;
        },
        updateHeight () {
            let wraperHeight = this.getDomHeight(this.$refs.outWraper);
            this.tableWidth = this.getDomWidth(this.$refs.headerTable);
            this.initCellWidth = this.tableWidth / this.columns.length;
            this.itemNum = Math.ceil(wraperHeight / this.itemRowHeight) + 10;
            this.moduleHeight = this.itemNum * this.itemRowHeight;
        },
        getItemTable (h, data, index) {
            return h(ItemTable, {
                props: {
                    itemData: data,
                    rowStyles: this.rowStyles,
                    columns: this.columns
                },
                key: 'table-item-key' + index,
                ref: 'itemTable' + index
            });
        },
        getTables (h) {
            let table1 = this.getItemTable(h, this.table1Data, 1);
            let table2 = this.getItemTable(h, this.table2Data, 2);
            let table3 = this.getItemTable(h, this.table3Data, 3);
            if (this.currentIndex === 0) {
                return [table1, table2, table3];
            } else if (this.currentIndex === 1) {
                return [table2, table3, table1];
            } else {
                return [table3, table1, table2];
            }
        },
        renderTable (h) {
            return h('div', this.getTables(h));
        },
        handleScroll (e) {
            let scrollTop = e.srcElement.scrollTop;
            this.direction = this.mark >= scrollTop ? 1 : 0; // 1 is down, 0 is up
            if (this.direction) {
                if (this.scrollTop < this.topPlaceholderHeight + this.moduleHeight) {
                    this.topPlaceholderHeight -= this.moduleHeight;
                    this.currentIndex--;
                    if (this.currentIndex <= -1) {
                        this.currentIndex = 2;
                    }
                    this['times' + (this.currentIndex)]--;
                }
            } else {
                if ((this.scrollTop > this.topPlaceholderHeight + this.moduleHeight * 2)) {
                    this.topPlaceholderHeight += this.moduleHeight;
                    this['times' + (this.currentIndex)]++;
                    this.currentIndex++;
                    if (this.currentIndex >= 3) {
                        this.currentIndex = 0;
                    }
                }
            }
            this.scrollTop = scrollTop;
            this.mark = scrollTop;
        },
        getCellWidth (col) {
            if (col.width === undefined) {
                return this.tableWidth / this.columns.length;
            }
            // this.$nextTick(() => {
            //     console.log(this.$refs.headerTable.$el)
            //     return this.$refs.headerTable.$el;
            // });
        }
    },
    mounted () {
        this.updateHeight();
    }
};
</script>
