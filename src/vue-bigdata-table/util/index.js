export const findNodeUpper = (ele, tag) => {
	if (ele.parentNode) {
		if (ele.parentNode.tagName === tag.toUpperCase()) {
			return ele.parentNode;
		} else {
			if (ele.parentNode) return findNodeUpper(ele.parentNode, tag);
			else return false;
		}
	}
};

export const getScrollbarWidth = () => {
	let oP = document.createElement('p');
	let styles = {
		width: '100px',
		height: '100px',
		overflowY: 'scroll'
	};
	for (let i in styles) {
		oP.style[i] = styles[i];
	}
	document.body.appendChild(oP);
	let scrollbarWidth = oP.offsetWidth - oP.clientWidth;
	oP.remove();
	return scrollbarWidth;
};

export const createNewArray = (length, content = undefined) => {
	let i = -1;
	let arr = [];
	while (++i < length) {
		let con = Array.isArray(content) ? content[i] : content;
		arr.push(con);
	}
	return arr;
};

export const iteratorByTimes = (times, fn) => {
	let i = -1;
	while (++i < times) {
		fn(i);
	}
};

export const getHeaderWords = (length) => {
	let wordsArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	let headerArr = [];
	if (length <= 26) {
		headerArr = wordsArr.slice(0, length);
	} else {
		headerArr = [...wordsArr];
		let num = length - 26;
		let firstWordIndex = 0;
		let secondWordIndex = 0;
		let i = -1;
		while (++i < num) {
			firstWordIndex = Math.floor(i / 26);
			secondWordIndex = i % 26;
			let sumWord = `${wordsArr[firstWordIndex]}${wordsArr[secondWordIndex]}`;
			headerArr.push(sumWord);
		}
	}
	return headerArr;
};
