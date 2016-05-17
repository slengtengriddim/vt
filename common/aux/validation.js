(function(exports) {
	exports.isAlphabetic = value => {
		const filter = /^[a-zA-ZäöüÄÖÜß]+$/;
		if (filter.test(value)) {
			return true;
		}
		return false;
	};

	exports.isLength64 = value => {
		if (value.length < 65) {
			return true;
		}
		return false;
	};

})(this.Validate = {})
