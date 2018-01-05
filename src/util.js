export const hasOneOf = (str, targetArr) => {
	let len = targetArr.length;
	let i = 0;
	while (i++ < len) {
		if (str.indexOf(targetArr[i]) >= 0) {
			return true;
		}
	}
	return false;
};

export const handleData = (data, precision, minListLength) => {
	/*
	 * precision: 辨别经纬度和数据类型的遍历次数
	 * minListLength: 筛选菜单选项显示个数
	*/
	let headers = data.headers;
	let rows = data.rows;
	let len = rows.length; // 总共几列
	// 用于经纬度识别的变量
	let latRes = {};
	let lngRes = {};
	let maxLatNum = 0;
	let maxLngNum = 0;
	// 用于排重的变量
	let removeRepeatedArr = new Array(len);
	// 用于整理数据的变量
	let resData = [];
	// 数据类型
	let typeArr = [];
	let type = '';
	precision = precision ? (precision > rows[0].length ? rows[0].length : precision) : Math.min(rows[0].length, 100);
	let i = 0;
	while (i < len) { // 遍历所有列
		let col = rows[i];
		let colLen = col.length;
		let j = 0;
		removeRepeatedArr[i] = [];
		// 用于判断数据类型的变量
		let store = {
			string: 0,
			number: 0,
			date: 0
		};
		while (j < colLen) { // 遍历一列数据
			let valueInit = col[j];
			let value = typeof col[j] === 'object' ? col[j].value : col[j];
			// 整理数据
			if (i === 0) {
				resData.push([]);
			}
			resData[j][i] = valueInit;
			// 识别经纬度
			if (value) {
				if (!isNaN(value)) {
					if (j < precision) {
						if (parseFloat(value) >= 3.86 && parseFloat(value) <= 53.55 && value.indexOf('.') >= 0) { // 如果当前值在纬度范围内
							latRes[i] = latRes[i] || 0 + 1;
							maxLatNum = Math.max(latRes[i], maxLatNum);
						} else if (parseFloat(value) >= 73.66 && parseFloat(value) <= 135.05 && value.indexOf('.') >= 0) {
							lngRes[i] = lngRes[i] || 0 + 1;
							maxLngNum = Math.max(lngRes[i], maxLngNum);
						}
					}
					store.number += 1;
				} else {
					// 是字符串不是数值
					if (j < precision) {
						if (hasOneOf(value, [':', '年', '月', '日', '-', '：', '星期', '周'])) {
							store.date += 1;
						} else {
							store.string += 1;
						}
					}
				}
			}
			// 排重 && removeRepeatedArr[i].length < minListLength
			if (removeRepeatedArr[i].indexOf(value) < 0) {
				removeRepeatedArr[i].push(value);
			}
			let most = Math.max(store.string, store.number, store.date);
			for (let key in store) {
				if (store[key] === most) {
					type = key;
					break;
				}
			}
			j++;
		}
		typeArr.push(type);
		i++;
	}
	let lat = 0;
	let lng = 0;
	let l = 0;
	while (l < len) {
		if (latRes[l] === maxLatNum) {
			lat = l;
		} else if (lngRes[l] === maxLngNum) {
			lng = l;
		}
		l++;
	}
	return {
		cellLength: len,
		header: headers,
		lat: lat,
		lng: lng,
		data: resData,
		type: typeArr,
		minList: removeRepeatedArr
	};
};
