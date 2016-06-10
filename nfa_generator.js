var lodash = require("lodash");

var epslon_symbol = "e"
// var epslon_symbol = "ε"

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
	var _this=this;
	if(_this.badRequest(alphabets))
		return ["bad state"];

	if(alphabets == ""){
		return _this.continuousEplsonTransactions([_this.initial_state]);
	}

	return alphabets.split("").reduce(function(states, alphabet){
		var possible_states_of_machine = _this.continuousEplsonTransactions(states);
		var states_after_epslon_transaction = _this.alphabetTransactionOnStates(possible_states_of_machine, alphabet);
		return _this.continuousEplsonTransactions(states_after_epslon_transaction);
	}, [_this.initial_state]);
};

nfa.prototype.badRequest = function(alphabets){
	var _this=this;
	return alphabets.split("").some(function(ele){
		return _this.alphabet_set.indexOf(ele) == -1;
	});
}

nfa.prototype.continuousEplsonTransactions = function(states){
	var _this = this;
	var next_candidates = []
	states.forEach(function(state){
		isUndefined(_this.transition_function[state]) && (_this.transition_function[state] = {epslon_symbol:[]})
		next_candidates.push(_this.transition_function[state][epslon_symbol] || [])
	})
	if(lodash.difference(lodash.flattenDeep(next_candidates), states).length == 0)
		return states;
	return _this.continuousEplsonTransactions(lodash.union(states, lodash.flattenDeep(next_candidates)))
}

nfa.prototype.alphabetTransactionOnStates = function(states, alphabet){
	var _this=this;
	var next_states_after_alphabet_transaction = [];
	states.forEach(function(state){
		next_states_after_alphabet_transaction.push(_this.transition_function[state][alphabet] || [])
	})
	return lodash.flattenDeep(lodash.uniq(lodash.flattenDeep(next_states_after_alphabet_transaction)));
}

function isUndefined(element){ return element == undefined };

exports.nfa_generator = nfa_generator;
// ε
