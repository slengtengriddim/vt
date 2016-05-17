Template.layout.onCreated(function() {
	let template = Template.instance();
	let startDate = Session.get(UNLOCK_START);
	let endDate = Session.get(UNLOCK_END);

	Tracker.autorun(() => {

		// VOCABULARY

		let favIds = R.pluck('vocabularyId')(Favourites.find().fetch());
		let lengthFav = Vocabulary.find({
			_id: {
				$in: favIds
			}
		}).count();
		let lengthNotFav = Vocabulary.find({
			_id: {
				$nin: favIds
			}
		}).count();
		let lengthAll = Vocabulary.find().count();
		Session.set(LENGTH_FAV, lengthFav);
		Session.set(LENGTH_ALL, lengthAll);
		Session.set(LENGTH_NOT_FAV, lengthNotFav);

		// SOURCE
		Session.set(NAV_SOURCES, [NAV_SOURCE_ALL]);
		if (Session.get(LENGTH_FAV) > 0) {
			Session.set(NAV_SOURCES, [NAV_SOURCE_ALL, NAV_SOURCE_FAV]);
			if (Session.get(LENGTH_NOT_FAV) > 0) {
				Session.set(NAV_SOURCES, [NAV_SOURCE_ALL, NAV_SOURCE_FAV, NAV_SOURCE_NOT_FAV]);
			}
		}

		// SURVEY UNLOCKER
		Meteor.setInterval(() => {
			Session.set(TIME_NOW, new Date().getTime())
		}, 6000);
		let now = Session.get(TIME_NOW);
		 if (now > startDate && now < endDate) {
		// to avoid unneccessary write operations
		if (!Session.get(SURVEY_UNLOCKED)) {
			// console.log("surveyUnlocked TRUE");
			Session.set(SURVEY_UNLOCKED, true);
		}
		 } else {
		 	if (Session.get(SURVEY_UNLOCKED)) {
				// 	console.log("surveyUnlocked FALSE");
		 		Session.set(SURVEY_UNLOCKED, false);
		 	}
		 }
	});

});

Template.layout.events({
	'click .btn-forward, click .btn-backward' (event, template) {
		let self = this;
		if (Session.get(REVEALED)) {
			Session.set(REVEALED, false);
		}
		if (Session.get(TERM_RIGHT)) {
			Session.set(TERM_RIGHT, false);
		}
		if (Session.get(INPUT_OCCURED)) {
			Session.set(INPUT_OCCURED, false);
		}
		if (Session.get(TERM_CACHE)) {
			Session.set(TERM_CACHE, '');
		}

		if (document.getElementById("term")) {
			document.getElementById("term").value = '';
			if (document.getElementById("term").disabled === true) {
				document.getElementById("term").disabled = false;
				document.getElementById("term").autofocus = true;
			}
			document.getElementById("term").focus();
		}
		let animationName = 'animated fadeIn';
		let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		// animate
		$(".content-entry").addClass(animationName).one(animationEnd,
				function() {
					$(this).removeClass(animationName);
				})
		// log
		Log.detail();

		Meteor.call('dataWords', self);

	},
	'click .btn-backward' (event, template) {
		if (Session.get(BROWSE_FORWARD)) {
			Session.set(BROWSE_FORWARD, false);
		}
		Entry.setNext();
	},
	'click .btn-forward' (event, template) {
		if (!Session.get(BROWSE_FORWARD)) {
			Session.set(BROWSE_FORWARD, true);
		}
		Entry.setNext();
	},
	'click .btn-reveal' (event, template) {
		if (!Session.get(REVEALED)) {
			Session.set(REVEALED, true);
		}
		if (document.getElementById("term")) {
			if (document.getElementById("term").disabled === false) {
				document.getElementById("term").disabled = true;
			}
		}
	},
	'click .btn-insert, click .btn-delete' (event, template) {
		// log
		Log.detailHeart();
	},
	'click .btn-insert' (event, template) {
		let self = this;
		let iconNotFav = ".icon-not-fav-" + self._id;
		let btnDelay = ".btn-delay";
		$(btnDelay).removeClass(".btn-insert");

		if (Session.get(NAV_SOURCE_NOT_FAV)) {
			// animate icon before actually remove entry from list
			// only needed for trainer lists fav / not fav
			let animationName = 'fa-heart animated zoomIn';
			let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			$(iconNotFav).removeClass("fa-heart-o");
			$(iconNotFav).addClass(animationName).one(animationEnd,
				function() {
					$(this).removeClass(animationName).addClass("fa-heart-o");
				});

			setTimeout(() => {
				Session.set(LENGTH_NOT_FAV, Session.get(LENGTH_NOT_FAV) - 1);
				Entry.resetSource();
				Meteor.call('insertFavourite', self._id);
				Entry.setNext();
			}, 300);

			$(btnDelay).addClass(".btn-insert");
		} else {
			Session.set(LENGTH_NOT_FAV, Session.get(LENGTH_NOT_FAV) - 1);
			Entry.resetSource();
			Meteor.call('insertFavourite', self._id);
		}

	},
	'click .btn-delete' (event, template) {
		let self = this;
		let iconFav = ".icon-fav-" + self._id;
		let btnDelay = ".btn-delay";
		$(btnDelay).removeClass(".btn-delete");

		if (Session.get(NAV_SOURCE_FAV)) {
			// animate icon before actually remove entry from list
			// only needed for trainer lists fav / not fav

			let animationName = 'fa-heart-o animated zoomOut';
			let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

			$(iconFav).addClass(animationName).one(animationEnd,
				function() {
					$(this).removeClass(animationName).addClass("fa-heart");
				});

			setTimeout(() => {
				Session.set(LENGTH_FAV, Session.get(LENGTH_FAV) - 1);
				Entry.resetSource();
				Meteor.call('deleteFavourite', self._id);
				Entry.setNext();
			}, 300);
			$(btnDelay).addClass(".btn-insert");
		} else {
			Session.set(LENGTH_FAV, Session.get(LENGTH_FAV) - 1);
			Entry.resetSource();
			Meteor.call('deleteFavourite', self._id);
		}
	}
});
