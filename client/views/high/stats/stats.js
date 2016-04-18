Template.stats.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataDetail');
});

Template.stats.events({
	'click .btn-test' (event, template) {
		let result = [];
		let data = Data.Detail.find({}, {
			sort: {
				timestamp: 1
			}
		}).fetch();
		let byMode = R.groupBy(function(entry) {
			return entry.mode;
		});
		let byAttention = R.groupBy(function(entry) {
			return entry.attention;
		});
		let byDate = R.groupBy(function(entry) {
			let day = entry.timestamp;
			// day.setHours(0);
			// day.setMinutes(0);
			day.setSeconds(0);
			day.setMilliseconds(0);
			if (entry.timestamp.getMinutes()) {
				return day;
			}
		});
		console.log(byDate(data));
		let sortedByDate = R.map(R.length, byDate(data));
		for (let k in sortedByDate) {
			if (sortedByDate.hasOwnProperty(k)) {
				console.log("Key is " + k + ", value is " + sortedByDate[k]);
				result.push({
					x: k,
					y: sortedByDate[k]
				});
			}
		};
		console.log(result);
	}
})
