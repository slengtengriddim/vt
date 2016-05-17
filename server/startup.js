Meteor.startup(function() {
	Meteor.users.find({
		"status.online": true
	}).observe({
		added: function(obj) {

			let today = new Date();

			// TERM OF THE DAY

			let lastEntryTermDay = TermDay.findOne({
				userId: obj._id
			}, {
				sort: {
					timestamp: -1,
					limit: 1
				}
			});
			let termDayIds = R.pluck('vocabularyId')(TermDay.find({
				userId: obj._id
			}).fetch());
			let vocabulary = Vocabulary.find({
				_id: {
					$nin: termDayIds
				}
			}).fetch();

			// only insert a new vocabulary if there doesn't exist one for today
			if (!lastEntryTermDay || lastEntryTermDay.timestamp.getDate() !== today.getDate()) {
				if (vocabulary.length !== 0) {
					TermDay.insert({
						userId: obj._id,
						vocabularyId: vocabulary[Math.floor(Math.random() * vocabulary.length)]._id
					});
				}
			}

			// log online

			// let latestEntry = Data.Status.findOne({
			// 	userId: obj._id
			// }, {
			// 	sort: {
			// 		timestamp: -1,
			// 		limit: 1
			// 	}
			// });
			// if (latestEntry) {
			// 	if (latestEntry.status !== 'online') {
			// 		Data.Status.insert({
			// 			userId: obj._id,
			// 			userMail: obj.emails[0].address,
			// 			status: "online"
			// 		});
			// 		console.log(obj._id + ' set online');
			// 	}
			// } else {
			// 	Data.Status.insert({
			// 		userId: obj._id,
			// 		userMail: obj.emails[0].address,
			// 		status: "online"
			// 	});
			// 	console.log(obj._id + ' set online');
			// }

		},
		removed: function(obj) {
			let today = new Date();

			//log offline

			// let latestEntry = Data.Status.findOne({
			// 	userId: obj._id
			// }, {
			// 	sort: {
			// 		timestamp: -1,
			// 		limit: 1
			// 	}
			// });
			//
			// if (latestEntry) {
			// 	if (latestEntry.status !== 'offline') {
			// 		// set exit and entry points if user stays online over midnight
			// 		if (latestEntry.timestamp.getDate() < today.getDate()) {
			// 			let year = latestEntry.timestamp.getFullYear();
			// 			let month = latestEntry.timestamp.getMonth();
			// 			let lastDay = latestEntry.timestamp.getDate();
			// 			let todayDay = today.getDate();
			// 			let beforeMidnight = new Date(year, month, lastDay, 23, 59, 59, 999);
			// 			let afterMidnight = new Date(year, month, todayDay, 0, 0, 0, 1);
			//
			// 			// set offline before midnight
			// 			Data.Status.insert({
			// 				userId: obj._id,
			// 				userMail: obj.emails[0].address,
			// 				status: "offline",
			// 				timestamp: beforeMidnight
			// 			});
			// 			console.log(beforeMidnight);
			// 			console.log(obj._id + ' set offline');
			//
			// 			// set online after midnight
			// 			Data.Status.insert({
			// 				userId: obj._id,
			// 				userMail: obj.emails[0].address,
			// 				status: "online",
			// 				timestamp: afterMidnight
			// 			});
			// 			console.log(afterMidnight);
			// 			console.log(obj._id + ' set online');
			// 		}
			//
			// 		Data.Status.insert({
			// 			userId: obj._id,
			// 			userMail: obj.emails[0].address,
			// 			status: "offline",
			// 			timestamp: new Date()
			// 		});
			// 		console.log(obj._id + ' set offline');
			// 	}
			// }

		}
	});
});
