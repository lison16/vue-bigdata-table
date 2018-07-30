import { hasOneOf } from '../util';
export default {
	methods: {
		_filter (col, queryArr) {
			let value = [...this.value];
			this.insideTableData = value.filter(item => hasOneOf(item[col], queryArr));
			this._tableResize();
		},
		_cancelFilter () {
			this.insideTableData = [...this.value];
			this._tableResize();
		}
	}
};