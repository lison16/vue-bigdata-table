# vue-bigdata-table

> Powerful, table components optimized for large amounts of data, based on Vue2.0

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run bist
```

API

props:

属性  |  说明  |  类型  |  默认值
:-------: | -------  |  :-------:  |  :-------:
showIndex  |  是否显示序列号列  |  Boolean  |  false
value  |  表格数据，可以使用v-model双向绑定  |  Array  |  -
rowHeight  |  表格行高  |  Number  |  48
fixed  |  固定表头，设为true后表头不随表格滚动  |  Boolean  |  false
fixedWrapperWidth  | 设为true后表格列宽总是平分容器宽度减去indexWidth后的宽度 |  Boolean  |  false
disabledHover  |  是否取消鼠标悬浮高亮效果  |  Boolean  |  true
columns  |  表头数组，元素为单个表头的对象，{title: 'xxx', render: (h) => {}},默认只需要title属性  |  Array  |  -
colWidth  |  列宽，如果单独列中指定了宽度则按单独列，如果所有宽度加起来比容器宽度小，则平分宽度，否则用colWidth  |  Number  |  100
headerHeight  |  表头高度  |  Number  |  52
headerTrStyle  |  表头tr样式  |  Object  |  {}
indexWidth  |  序列号列宽，如果没有设置，则会根据数据行数自动计算合适的宽度  |  Number  |  -
indexRender  |  序列号渲染render  |  Function  |  (h, index) => {return h('span', index + 1);}
stripe  |  是否显示斑马线  |  Boolean  |  false
atLeftCellPosi  |  指定当前鼠标在表头单元格左侧atLeftCellPosi像素处  |  Number  |  80
atRightCellPosi  |  指定当前鼠标在表头单元格右侧atRightCellPosi像素处  |  Number  |  80
fixedCol  |  固定的列的范围，[0, fixedCol]，设为2即固定0，1，2列，这三列横向不滚动，固定后列横向不随表格滚动  |  Number  |  -1
appendNum  |  根据表格容器高度计算内置单个表格（1/3）渲染的行数基础上额外渲染的行数，行数越多表格接替渲染效果越好，但越耗性能  |  Number  |  15
canEdit  |  是否可编辑  |  Boolean  |  false
startEditType  |  触发编辑单元格的方式，目前只支持dblclick一种，即鼠标双击单元格  |  String  |  'dblclick'
editCellRender  |  自定义编辑单元格的render函数，如果不指定则使用默认内置的editRender，可参考components/input-render.js  |  Funciton  |  editRender
beforeSave  |  保存修改的单元格内容之前的钩子，如果该函数返回false，则阻止保存  |  Function  |  ({ row, col, value, initRowIndex }) => {return true}
selectable  |  是否可选择单元格，开启后效果就像excel点击一个单元格然后拖动选择  |  Boolean  |  false
 paste |  是否可粘贴，设为true后可划选要粘贴的位置，然后ctrl+v粘贴从其他地方复制的表格数据，设为true则selectable将开启  |  Boolean  |  false
sortable  |  是否可排序  |  Boolean  |  false
sortIndex  |  开启排序的列序号数组或序号  |  Array, Number  |  -
defaultSort  |  数据默认排序方式，是一个包含一对键值对的对象，键是要按其排序的序号，值是'up'（升序）或'down'（降序）（为方便记忆，并没有使用'asc'和'desc'）  |  Object  |  -

Methods:

方法  |  说明  |  参数  |  默认值

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
