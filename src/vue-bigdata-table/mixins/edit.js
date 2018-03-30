export default {
	data () {
		return {
			edittingTd: '' // 正在编辑的单元格的行号和列号拼接的字符串 `${row}-${col}`
		};
	},
	methods: {
		_editCell (row, col) {
			if (!this.canEdit || row < 0 || row > this.value.length || col < 0 || col > this.columns.length || this.edittingTd === `${row}-${col}`) return;
			if (parseInt(this.edittingTd.split('-')[0]) !== row) this.scrollToRow(row);
			this.edittingTd = `${row}-${col}`;
		}
	}
};
