//  Session variables

// SURVEY

TIME_NOW = 'timeNow';

UNLOCK_START = 'unlockStart';
Session.setDefault(UNLOCK_START, 1463487120 * 1000);

UNLOCK_END = 'unlockEnd';
Session.setDefault(UNLOCK_END, 1463498040 * 1000);

SURVEY_UNLOCKED = 'surveyUnlocked';
Session.setDefault(SURVEY_UNLOCKED, false);

// ATTENTION BAR

ATTENTION_MODE = 'attentionMode';
Session.setDefault(ATTENTION_MODE, false);

LAST_PATH = 'lastPath';
Session.setDefault(LAST_PATH, '/');


// SOURCES

NAV_SOURCE_FAV = 'navSourceFav';
Session.setDefault(NAV_SOURCE_FAV, false);

NAV_SOURCE_ALL = 'navSourceAll';
Session.setDefault(NAV_SOURCE_ALL, true);

NAV_SOURCE_NOT_FAV = 'navSourceNotFav';
Session.setDefault(NAV_SOURCE_NOT_FAV, false);

NAV_SOURCES = 'navSources';
Session.setDefault(NAV_SOURCES, [NAV_SOURCE_ALL]);

NAV_SOURCE_COUNT = 'sourceCount';
Session.setDefault(NAV_SOURCE_COUNT, 0);

// ORDER

NAV_ORDER_RANDOM = 'navOrderRandom';
Session.setDefault(NAV_ORDER_RANDOM, true);

// BROWSE WORDS

SOURCE_FAV = 'sourceFav';
Session.setDefault(SOURCE_FAV, false);

BROWSE_FORWARD = 'browseForward';
Session.setDefault(BROWSE_FORWARD, true);

INDEX_BROWSE = 'indexBrowse';
Session.setDefault(INDEX_BROWSE, 0);

LENGTH_FAV = 'lengthFav';
Session.setDefault(LENGTH_FAV, 0);

LENGTH_ALL = 'lengthAll';
Session.setDefault(LENGTH_ALL, 0);

LENGTH_NOT_FAV = 'lengthNotFav';
Session.setDefault(LENGTH_ALL, 0);

// EXTRA

REVEALED = 'revealed';
Session.setDefault(REVEALED, false);

SETTINGS_TRAINER = 'settingsTrainer';
Session.setDefault(SETTINGS_TRAINER, true);

// EINGABE

INPUT_OCCURED = 'inputOccured';
Session.setDefault(INPUT_OCCURED, false);

TERM_RIGHT = 'termRight';
Session.setDefault(TERM_RIGHT, false);

TERM_CACHE = 'termCache';
Session.setDefault(TERM_CACHE, '');

COUNT_LETTERS_MATCH = 'countLettersMatch';
Session.setDefault(COUNT_LETTERS_MATCH, 0);

// MODES

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
