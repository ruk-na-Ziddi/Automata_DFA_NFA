var Combinatorics = require('js-combinatorics');

var combinations = function(collection){
	return Combinatorics.power(collection).toArray();
}

exports.combinations = combinations;
