<style lang="less">
    @import './vue-bigdata-table.less';
</style>

<template>
    <div :class="outerClasses">
        <div :class="wraperClasses" :style="tableWidthStyles">
            <div
                :class="dataWraperClasses"
                ref="outWraper"
                @scroll="handleScroll"
                :style="marginTopStyle">
                <div :class="headerWraperClasses" :style="{height: headerHeight + 'px'}">
                    <table ref="headerTable" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <colgroup>
                            <col :width="width" v-for="(width, i) in cellWidthArr" :key="'header-key-' + i"></col>
                        </colgroup>
                        <tr 
                            :style="{cursor: cursorOnHeader}" 
                            @mousemove.capture.prevent="handleMousemove"
                            @mousedown="handleMousedown"
                            @mouseup="canNotMove"
                            @mouseleave="canNotMove">
                            <th v-for="(col, i) in columns" :data-index="i" :key="`table-title-${i}`">
                                <!-- <div :class="headerThInsideWraper"> -->
                                    <span v-if="!col.render">{{ col.title }}</span>
                                    <render-dom v-else :render="col.render" :back-value="i"></render-dom>
                                <!-- </div> -->
                            </th>
                        </tr>
                    </table>
                </div>
                <div :style="{height: `${topPlaceholderHeight}px`}"></div>
                <render-dom :render="renderTable"></render-dom>
                <div :style="{height: `${bottomPlaceholderHeight}px`}"></div>
            </div>
        </div>
    </div>
</template>
<script>
import renderDom from './renderDom';
import ItemTable from './item-table.vue';
import { findNodeUpper } from './util';
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
        },
        cellWidth: {
            type: Number,
            default: 100
        },
        headerHeight: {
            type: Number,
            default: 52
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
            widthArr: [], // 用于给数据表格传递列宽
            /**
             * 鼠标拖动调整列宽相关变量
             */
            isOnCellEdge: false, // 鼠标是否在表头的两个单元格之间的边框上
            canMove: false,
            initCellX: 0, // 用于计算鼠标移动的距离
            scrollLeft: 0
        };
    },
    computed: {
        outerClasses () {
            return [
                `${this.prefix}-outer`
            ];
        },
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
        headerThInsideWraper () {
            return [
                `${this.prefix}-header-inside-wraper`
            ];
        },
        marginTopStyle () {
            return this.fixed && this.headerHeight ? {marginTop: this.headerHeight + 'px'} : {}
        },
        cellNum () { // 表格列数
            return this.columns.length;
        },
        tableWidthStyles () {
            return this.tableWidth ? {width: this.tableWidth + 'px'} : '100%';
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
        },
        cellWidthArr () {
            let len = this.cellNum;
            let i = 0;
            let cellWidthArr = [];
            let hasWidthCellCount = 0; // 统计设置了width的列的数量，从而为没有设置width的列分配宽度
            let noWidthCellIndexArr = []; // 没有设置宽度的列的序列
            let hasWidthCellTotalWidth = 0; // 设置了width的列一共多宽
            while (i < len) {
                if (this.columns[i].width) {
                    hasWidthCellCount++;
                    hasWidthCellTotalWidth += this.columns[i].width;
                    cellWidthArr.push(this.columns[i].width);
                } else {
                    noWidthCellIndexArr.push(i);
                    cellWidthArr.push(0);
                }
                i++;
            }
            let noWidthCellWidth = (this.tableWidth - hasWidthCellTotalWidth) / (len - hasWidthCellCount);
            let w = 0;
            let indexArrLen = noWidthCellIndexArr.length;
            while (w < indexArrLen) {
                cellWidthArr[noWidthCellIndexArr[w]] = noWidthCellWidth;
                w++;
            }
            this.widthArr = cellWidthArr;
            return cellWidthArr;
        },
        cursorOnHeader () {
            return this.isOnCellEdge ? 'col-resize' : 'default';
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
            // this.tableWidth = this.getDomWidth(this.$refs.headerTable);
            this.itemNum = Math.ceil(wraperHeight / this.itemRowHeight) + 10;
            this.moduleHeight = this.itemNum * this.itemRowHeight;
        },
        getItemTable (h, data, index) {
            return h(ItemTable, {
                props: {
                    times: this['times' + (index - 1)],
                    tableIndex: index,
                    itemData: data,
                    itemNum: this.itemNum,
                    rowStyles: this.rowStyles,
                    widthArr: this.widthArr,
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
        handleMousemove (e) {
            let parentRow = e.currentTarget;
            let cell = e.srcElement.tagName.toUpperCase() === 'TH' ? e.srcElement : findNodeUpper(e.srcElement, 'th');
            let cellDomrect = cell.getBoundingClientRect();
            let atLeft = (e.pageX - cellDomrect.left) < (cellDomrect.width / 2);
            let cellIndex = parseInt(cell.getAttribute('data-index')); // 当前单元格的序号
            if (atLeft && cellIndex !== 0) {
                if ((e.pageX - cellDomrect.left) <= 1) {
                    this.isOnCellEdge = true;
                } else {
                    this.isOnCellEdge = false;
                }
            } else if (!atLeft && cellIndex !== this.cellNum - 1) {
                if ((cellDomrect.right - e.pageX) <= 1) {
                    this.isOnCellEdge = true;
                } else {
                    this.isOnCellEdge = false;
                }
            }
            let index = 0; // 调整表格列宽的左侧的表格的序列
            if (this.canMove) {
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
            if (this.isOnCellEdge) {
                this.canMove = true;
                this.initCellX = e.pageX;
            }
        },
        canNotMove () {
            this.canMove = false;
        }
    },
    watch: {
        columns () {
            this.$nextTick(() => {
                this.tableWidth = this.cellWidth * this.columns.length > this.getDomWidth(this.$refs.headerTable) ? this.cellWidth * this.columns.length : false;
                this.widthArr = this.cellWidthArr;
            });
        }
    },
    mounted () {
        this.updateHeight();
    }
};
</script>
