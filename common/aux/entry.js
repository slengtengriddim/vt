(function(exports) {
	exports.resetSource = () => {
		if ((Session.get(NAV_SOURCE_FAV) && Session.get(LENGTH_FAV) < 1) ||
			(Session.get(NAV_SOURCE_NOT_FAV) && Session.get(LENGTH_NOT_FAV) < 1)) {
			Session.set(NAV_SOURCE_FAV, false);
			Session.set(NAV_SOURCE_NOT_FAV, false);
			Session.set(NAV_SOURCE_ALL, true);
		};
	};

	exports.setNext = () => {
		// ORDER RANDOM
		if (Session.get(NAV_ORDER_RANDOM)) {
			if (Session.get(NAV_SOURCE_FAV)) {
				Session.set(INDEX_BROWSE, Math.floor(Math.random() * Session.get(LENGTH_FAV)));
			} else if (Session.get(NAV_SOURCE_NOT_FAV)) {
				Session.set(INDEX_BROWSE, Math.floor(Math.random() * Session.get(LENGTH_NOT_FAV)));
			} else {
				Session.set(INDEX_BROWSE, Math.floor(Math.random() * Session.get(LENGTH_ALL)))
			}
		}
		// ORDER STRAIGHT
		else {

			if (Session.get(NAV_SOURCE_FAV)) {
				if (Session.get(BROWSE_FORWARD)) {
					Session.set(INDEX_BROWSE, (Session.get(INDEX_BROWSE) + 1) % Session.get(LENGTH_FAV));
				} else {
					if (Session.get(INDEX_BROWSE) === 0) {
							Session.set(INDEX_BROWSE, (Session.get(LENGTH_FAV) - 1) % Session.get(LENGTH_FAV));
					} else {
						Session.set(INDEX_BROWSE, (Session.get(INDEX_BROWSE) - 1) % Session.get(LENGTH_FAV));
					}
				}
			} else if (Session.get(NAV_SOURCE_NOT_FAV)) {
				if (Session.get(BROWSE_FORWARD)) {
					Session.set(INDEX_BROWSE, (Session.get(INDEX_BROWSE) + 1) % Session.get(LENGTH_NOT_FAV));
				} else {
					if (Session.get(INDEX_BROWSE) === 0) {
							Session.set(INDEX_BROWSE, (Session.get(LENGTH_NOT_FAV) - 1) % Session.get(LENGTH_NOT_FAV));
					} else {
						Session.set(INDEX_BROWSE, (Session.get(INDEX_BROWSE) - 1) % Session.get(LENGTH_NOT_FAV));
					}
				}
			} else {
				if (Session.get(BROWSE_FORWARD)) {
					Session.set(INDEX_BROWSE, (Session.get(INDEX_BROWSE) + 1) % Session.get(LENGTH_ALL));
				} else {
					if (Session.get(INDEX_BROWSE) === 0) {
							Session.set(INDEX_BROWSE, (Session.get(LENGTH_ALL) - 1) % Session.get(LENGTH_ALL));
					} else {
						Session.set(INDEX_BROWSE, (Session.get(INDEX_BROWSE) - 1) % Session.get(LENGTH_ALL));
					}
				}
			}

		}

	};
})(this.Entry = {});
