export default (h, { index, params }, table) => {
	return h('div', {
		'class': 'index-render-item-wrapper'
	}, [
		h('div', {
			'class': [
				'index-slide-wrapper',
				params.index === index ? 'slide-to-left' : ''
			],
      on: {
        click (event) {
          table.$parent.$emit('on-index-change', params.index === index ? -1 : index);
          event.stopPropagation();
        }
      }
		}, [
			h('div', {
				'class': 'index-render-num-con'
			}, [
				h('span', index + 1)
			]),
      h('div', {
				'class': 'index-render-tip-con'
			}, [
				h('span', {
					'class': 'is-paintting-tip'
				}, `第${index + 1}行`)
			])
		])
	]);
};
