var lodash = require("lodash");

var nfa = function(set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states){
	this.set_of_states = set_of_states;
	this.alphabet_set = alphabet_set;
	this.transition_function = transition_function;
	this.initial_state = initial_state;
	this.set_of_final_states = set_of_final_states;
}

var nfa_generator = function(set_of_states,alphabet_set, transition_function, initial_state, set_of_final_states){
	return new nfa(set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states);
};

nfa.prototype.accept = function(alphabets){
	return lodash.intersection(this.set_of_final_states, lodash.flatten(this.runner(alphabets))).length >= 1;
};

nfa.prototype.runner = function(alphabets){
	if(this.badRequest(alphabets))
		return ["bad state"];

	var this_one = this;

	if(alphabets == ""){
		return this_one.continuousEplsonTransactions(this.transition_function[this.initial_state]["ε"]);
	}

	return alphabets.split("").reduce(function(states, alphabet){
		return lodash.flatten(states).map(function(state){
			var epslon_transaction = this_one.continuousEplsonTransactions(this.transition_function[state]["ε"]);
			var next_to_epslon = this_one.getNextForEpslon(epslon_transaction, alphabet);
			return lodash.union(this.transition_function[state][alphabet], next_to_epslon);
		})
	}, [this.initial_state]);
};

nfa.prototype.badRequest = function(alphabets){
	return alphabets.split("").some(function(ele){
		return this.alphabet_set.indexOf(ele) == -1;
	});
}

nfa.prototype.continuousEplsonTransactions = function(states){
	var result = [];
	states.forEach(function(state){
		if(this.transition_function[state]["ε"].length == 0)
			result.push(state);
		result.push(this.transition_function[state]["ε"]);
	})

	result = lodash.uniq(lodash.flattenDepth(result));

	var noEpslon = result.every(function(state){
		return this.transition_function[state]["ε"].length == 0;
	})

	if(noEpslon)
		return result;
	return this.continuousEplsonTransactions(result);
}

nfa.prototype.getNextForEpslon = function(states, alphabet){
	var result = [];
	states.forEach(function(state){
		if(this.transition_function[state][alphabet].length > 0){
			result.push(this.transition_function[state][alphabet])
		}else{
			result.push(state);
		}
	})
	return lodash.uniq(lodash.flattenDepth(result));
}

exports.nfa_generator = nfa_generator;
// ε
