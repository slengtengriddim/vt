//  Session variables

ATTENTION_MODE = 'attentionMode';
Session.setDefault(ATTENTION_MODE, false);

LAST_PATH = 'lastPath';
Session.setDefault(LAST_PATH, '/');

SOURCE_FAV = 'sourceFavourites';
Session.setDefault(SOURCE_FAV, false);

// RANDOM_FAV = 'randomFavourites';
// Session.setDefault(RANDOM_FAV, false);
//
// RANDOM_NOT_FAV = 'randomNotFavourites';
// Session.setDefault(RANDOM_NOT_FAV, true);

LENGTH_FAV = 'lengthFav';
Session.setDefault(LENGTH_FAV, 0);

LENGTH_NOT_FAV = 'lengthNotFav';
Session.setDefault(LENGTH_NOT_FAV, 0);

COUNT_VIEWED = 'countViewed';
Session.setDefault(COUNT_VIEWED, 0);

REVEALED = 'revealed';
Session.setDefault(REVEALED, false);

EXAMPLE = 'example';
Session.setDefault(EXAMPLE, false);

TERM_WRONG = 'termWrong';
Session.setDefault(TERM_WRONG, false);

TERM_RIGHT = 'termRight';
Session.setDefault(TERM_RIGHT, false);

TERM_CACHE = 'termCache';
Session.setDefault(TERM_CACHE, '');

COUNT_LETTERS_MATCH = 'countLettersMatch';
Session.setDefault(COUNT_LETTERS_MATCH, 0);

NAV_MODE_READ = 'lesen';
Session.setDefault(NAV_MODE_READ, true);

NAV_MODE_TERM = 'wort';
Session.setDefault(NAV_MODE_TERM, false);

NAV_MODE_DEF = 'definition';
Session.setDefault(NAV_MODE_DEF, false);

NAV_MODE_ENTER = 'eingabe';
Session.setDefault(NAV_MODE_ENTER, false);

NAV_MODES = 'navModes';
Session.setDefault(NAV_MODES, [NAV_MODE_READ, NAV_MODE_TERM, NAV_MODE_DEF]);

NAV_MODE_COUNT = 'navModeCount';
Session.setDefault(NAV_MODE_COUNT, 0);

NAV_LOW = 'navLow';
Session.setDefault(NAV_LOW, false);
