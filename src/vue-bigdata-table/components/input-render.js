import Input from './input.vue';
export default (h, {row, col, value, beforeSave}, table) => {
	return h('div', {
		'class': 'edit-item-con'
	}, [
		h(Input, {
			'class': 'edit-item-input',
			props: {
				value: value
			},
			on: {
				input (res) {
          table.editContent = res;
				}
			}
		}),
		h('div', {
			'class': 'edit-item-btn-con'
		}, [
			h('button', {
				'class': 'edit-btn',
				props: {
					type: 'text',
					icon: 'checkmark-round',
					size: 'small'
				},
				on: {
					click () {
            // console.log(value)
						if (beforeSave({ row, col, value })) {
							table.$emit('on-success-save', {
								row: row,
								col: col,
								value: table.editContent
							});
						} else {
							table.$emit('on-fail-save', {
								row: row,
								col: col,
								value: table.editContent
							});
						}
					}
				}
			}),
			h('button', {
				'class': 'edit-btn',
				props: {
					type: 'text',
					icon: 'close-round',
					size: 'small'
				},
				on: {
					click () {
						table.$emit('on-cancel-edit');
					}
				}
			})
		])
	]);
};
