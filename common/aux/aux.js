(function(exports) {
	/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
exports.shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};
exports.getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
})(this.Aux = {});
