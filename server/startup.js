Meteor.startup(function() {
	Meteor.users.find({
		"status.online": true
	}).observe({
		added: function(obj) {
			let latestEntry = Data.Status.findOne({
				userId: obj._id
			}, {
				sort: {
					timestamp: -1,
					limit: 1
				}
			});
			if (latestEntry) {
				if (latestEntry.status !== 'online') {
					Data.Status.insert({
						userId: obj._id,
						status: "online"
					});
					console.log(obj._id + ' set online');
				}
			} else {
				Data.Status.insert({
					userId: obj._id,
					status: "online"
				});
				console.log(obj._id + ' set online');
			}
		},
		removed: function(obj) {
			let latestEntry = Data.Status.findOne({
				userId: obj._id
			}, {
				sort: {
					timestamp: -1,
					limit: 1
				}
			});
			if (latestEntry) {
				if (latestEntry.status !== 'offline') {
					Data.Status.insert({
						userId: obj._id,
						status: "offline"
					});
					console.log(obj._id + ' set offline');
				}
			}
		}
	});
});
