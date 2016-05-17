Template.navSourceTrainer.events({
	'click .btn-source-fav, click .btn-source-all, click .btn-source-not-fav' () {
		// Reset Eingabe
			if (Session.get(REVEALED)) {
				Session.set(REVEALED, false);
			}
			if (Session.get(TERM_RIGHT)) {
				Session.set(TERM_RIGHT, false);
			}
			if(Session.get(INPUT_OCCURED)) {
				Session.set(INPUT_OCCURED, false);
			}

		if (document.getElementById("term")) {
			document.getElementById("term").value = '';
			if (document.getElementById("term").disabled === true) {
				document.getElementById("term").disabled = false;
			}
		}
	},
	'click .btn-source-fav' () {
		setSourceTrainer(NAV_SOURCE_FAV);
	},
	'click .btn-source-all' () {
		setSourceTrainer(NAV_SOURCE_ALL);
	},
	'click .btn-source-not-fav' () {
		setSourceTrainer(NAV_SOURCE_NOT_FAV);
	}
});

setSourceTrainer = (source) => {
	if (!Session.get(source)) {

		if (Session.get(LENGTH_FAV)) {
		Session.set(NAV_SOURCES, [NAV_SOURCE_ALL, NAV_SOURCE_FAV, NAV_SOURCE_NOT_FAV]);
		}

		Session.set(NAV_SOURCE_COUNT, R.indexOf(source, Session.get(NAV_SOURCES)));
		Session.get(NAV_SOURCES).forEach(entry => {
			Session.set(entry, false);
		});
		Session.set(Session.get(NAV_SOURCES)[Session.get(NAV_SOURCE_COUNT)], true);

		Entry.setNext();
		Session.set(REVEALED, false);
	}
	// log
	Log.detail();
};
