Template.index.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataDetail');
});

Template.index.helpers({
	dataDetail1() {
		let data = Data.Detail.find().fetch();
		return data;
	},
	dataDetail2() {
		let result;
		let data = Data.Detail.find().fetch();
		let byMode = R.groupBy(function(entry) {
			let mode = entry.mode;
			return mode;
		})
		console.log(byMode(data));
		return data;
	}
});

Template.index.events ({
	'click .btn-question' (event, template) {
		let result;
		let data = Data.Detail.find().fetch();
		let byMode = R.groupBy(function(entry) {
			return entry.mode;
		})
		console.log(byMode(data));
		let byDate = R.groupBy(function(entry) {
			let day = entry.timestamp;
			// day.setHours(0);
			// day.setMinutes(0);
			day.setSeconds(0);
			day.setMilliseconds(0);
			if (entry.timestamp.getMinutes()) {
					return day;
			}
		})
		console.log(byDate(data));
		console.log(R.map(R.length, byDate(data)));
	}
})
