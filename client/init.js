Meteor.startup(function() {
	WebFontConfig = {
		google: {
			families: ['Montserrat:400,700:latin', 'Roboto:400,300,700:latin', 'Playfair+Display:400,700,400italic:latin']
		}
	};
	(function() {
		var wf = document.createElement('script');
		wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
		wf.type = 'text/javascript';
		wf.async = 'true';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(wf, s);
	})();
});
