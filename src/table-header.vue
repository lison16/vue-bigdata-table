<template>
    <div>
        <Poptip placement="bottom" width="200" transfer>
            <a href="javascript:void(0)">
                {{ title }}
                <Icon type="arrow-down-b"></Icon>
            </a>
            <div class="table-header-dropdown-con" slot="content">
				<Dropdown trigger="click" placement="right-start" @on-click="changeType">
					<Button type="primary">
						修改字段类型
						<Icon type="arrow-down-b"></Icon>
					</Button>
					<DropdownMenu slot="list">
						<DropdownItem name="left" :selected="type === 'string'">文本类型</DropdownItem>
						<DropdownItem name="right" :selected="type === 'number'">数值类型</DropdownItem>
						<DropdownItem name="center" :selected="type === 'date'">日期类型</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<br/>
				<p>数值/文本搜索</p>
				<Input />
				<div class="value-list-con">
					<CheckboxGroup>
						<!-- <p v-for="(value, i) in noRepeatList" :key="i">
							<Checkbox :label="value"></Checkbox>
						</p> -->
						<!-- <virtual-scroller class="scroller" :items="noRepeatList" item-height="20" content-tag="div">
							<template slot-scope="props">
								<p :key="props.item">
									<Checkbox :label="props.item"></Checkbox>
								</p>
							</template>
						</virtual-scroller> -->
					</CheckboxGroup>
				</div>
			</div>
        </Poptip>
    </div>
</template>
<script>
export default {
	name: 'tableHeader',
	props: {
		title: String,
		col: Number,
		noRepeatList: Array,
		type: String
	},
	methods: {
		changeType (align) {
			this.$emit('onChangeType', this.col, align);
		}
	},
	computed: {
		valueMinList () {
			// return
		}
	}
};
</script>
<style lang="less">
.table-header-dropdown-con{
	// width: 300px;
	// height: 400px;
	// background: red;
}
.value-list-con{
	height: 160px;
	width: 100%;
	overflow: auto;
	background: #FFF7C4;
	ul{
		list-style: none;
		li{
			display: block;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			word-break: break-all;
		}
	}
}
</style>

