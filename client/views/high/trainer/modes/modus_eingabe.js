Template.modusEingabe.helpers({
	termCacheEmpty (term) {
		let cheese = [];
		for (let i = 0; i < term.length; i++) {
			cheese.push('_');
		}
		cheese = R.join(' ', cheese);

		return cheese;
	}
});
