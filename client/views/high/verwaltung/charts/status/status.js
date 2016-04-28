Template.status.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataDetail');
	template.subscribe('userStatus');
});

Template.status.events({
	'click .btn-test' (event, template) {
		let result = [];
		let data = Data.Status.find({}, {
			sort: {
				timestamp: 1
			}
		}).fetch();
		let byUser = R.groupBy(function(entry) {
			return entry.userId;
		});
		let byDate = R.groupBy(function(entry) {
			let day = entry.timestamp;
			if (entry.timestamp.getHours()) {
				return (day.getMonth() + 1) + "-" + day.getDate();
			}
		});
		let online;
		let offline;
		let isOnline = (n, m) => n.status === "online";
		let isOffline = (n, m) => n.status === "offline";
		let getRange = n => n[1] - n[0];

		let groupedByUser = byUser(data);

		for (let k in groupedByUser) {
			if (groupedByUser.hasOwnProperty(k)) {
				// console.log(k);
				let userValues = [];
				let userStream = {
					area: true,
					values: userValues,
					key: k, // userId
					strokeWidth: 4,
					classed: 'dashed'
				}

				let groupedByDate = byDate(groupedByUser[k]);
				// console.log(groupedByDate);
				for (let l in groupedByDate) {
					if (groupedByDate.hasOwnProperty(l)) {
						online = R.pluck('timestamp')(R.filter(isOnline, groupedByDate[l]));
						offline = R.pluck('timestamp')(R.filter(isOffline, groupedByDate[l]));

						let onOff = R.zip(online, offline);
						let timeRanges = R.map(getRange, onOff);
						let timeTotalPerDatePerUser = R.sum(timeRanges);
						// console.log(l);
						// console.log(timeTotalPerDatePerUser);
						userValues.push({
							x: l, // date
							y: timeTotalPerDatePerUser
						}); //the nulls are to show how defined works
					}
				};
				result.push(userStream);
			}
		};
console.log(result);

		// console.log(data);
		// console.log(groupedByUser);
		// let byMode = R.groupBy(function(entry) {
		// 	return entry.mode;
		// });
		// let byAttention = R.groupBy(function(entry) {
		// 	return entry.attention;
		// });
		// let byDate = R.groupBy(function(entry) {
		// 	let day = entry.timestamp;
		// 	// day.setHours(0);
		// 	// day.setMinutes(0);
		// 	day.setSeconds(0);
		// 	day.setMilliseconds(0);
		// 	if (entry.timestamp.getMinutes()) {
		// 		return day;
		// 	}
		// });

		// let groupedByVocabularyId = byVocabularyId(data);
		// for (let k in groupedByVocabularyId) {
		// 	if (groupedByVocabularyId.hasOwnProperty(k)) {
		// 		result.push({
		// 			x: groupedByVocabularyId[k][0].vocabularyName,
		// 			y: R.sum(R.pluck('viewed')(groupedByVocabularyId[k]))
		// 		});
		// 	}
		// };
		// result.forEach(entry => {
		// 		console.log(R.prop('y', entry));
		// 	})
		// console.log(result);

	}
});
