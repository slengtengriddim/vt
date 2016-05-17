Template.msgFragebogen.helpers({
	unlockEnd() {
		let unixTime = Session.get(UNLOCK_END);
		return new Date(unixTime).getDate() + "." + new Date(unixTime).getMonth()
		+ ", " + new Date(unixTime).getHours() + ":" + new Date(unixTime).getMinutes() + " Uhr";
	}
});
