(function(exports) {
	exports.d3Reset = () => {
		window.onresize = null;
	};
// exports.byDate = R.groupBy(function(entry) {
// 	let day = entry.timestamp;
// 	day.setHours(0);
// 	day.setMinutes(0);
// 	day.setSeconds(0);
// 	day.setMilliseconds(0);
// 	if (entry.timestamp.getDate()) {
// 		return day;
// 	}
// });

exports.normalizeByDate = (data, xValues) => {
	let result = [];
	let xValuesByDate = R.keys(Stat.byDateUnix(xValues));
	// console.log(xValuesByDate);
	const defaultPairs = R.map(day => {
		return {
			x: parseInt(day),
			y: 0
		}
	}, xValuesByDate);
	const fillGaps = pairs => {
		const toInsert = R.differenceWith(R.eqBy(R.prop('x')), defaultPairs, pairs);
		return R.concat(pairs, toInsert).sort(function(a, b) {
			return a.x - b.x;
		});
	};

	let groupedByDate = R.map(R.length, Stat.byDateUnix(data));
	for (let k in groupedByDate) {
		if (groupedByDate.hasOwnProperty(k)) {
			result.push({
				x: parseInt(k),
				y: groupedByDate[k]
			});
		}
	};
	return fillGaps(result);
};

exports.byDateUnix = R.groupBy(function(entry) {
	let day = entry.timestamp;
	let month = entry.timestamp.getMonth() + 1;
	let date = entry.timestamp.getDate();

	day.setHours(0);
	day.setMinutes(0);
	day.setSeconds(0);
	day.setMilliseconds(0);

	if (entry.timestamp.getDate()) {
		return day.getTime();
	}
});
})(this.Stat = {});
