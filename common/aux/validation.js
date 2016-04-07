(function(exports) {
	exports.isAlphabetic = value => {
		const filter = /^[a-zA-Z]+$/;
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
