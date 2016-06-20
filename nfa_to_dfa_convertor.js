var lodash = require("lodash");
var combinations = require("./combinations.js").combinations;
var dfa_generator = require("./dfa_generator.js").dfa_generator;

// var epslon_symbol = "e"
var epslon_symbol = "ε"

var nfa_to_dfa_convertor = function(set_of_states,alphabet_set, transition_function, initial_state, set_of_final_states){
	var possible_dfa_states = combinations(set_of_states).map(function(state){return state.toString()});
	var initial_state_for_dfa = state_with_epslon(transition_function, initial_state, possible_dfa_states);
	var final_states_for_dfa = possible_final_states(set_of_final_states, possible_dfa_states);
	var transition_function_for_dfa = dfa_transition_function(transition_function, alphabet_set, possible_dfa_states);
	return dfa_generator(possible_dfa_states,alphabet_set, transition_function_for_dfa, initial_state_for_dfa, final_states_for_dfa);
}

var possible_final_states = function(set_of_final_states, possible_dfa_states){
	return possible_dfa_states.filter(function(state){
		return lodash.intersection(set_of_final_states, state.split(",")).length >= 1;
	})
}

var state_with_epslon = function(transition_function, initial_state, possible_dfa_states){
	var initial_state = lodash.flattenDeep(initial_state.split(","));
	var next_candidates = next_possible_states(transition_function, initial_state);
	if(lodash.difference(next_candidates, initial_state).length == 0)
		return equivalent_state(possible_dfa_states, initial_state.toString());
	return state_with_epslon(transition_function,lodash.union(initial_state, next_candidates).toString(), possible_dfa_states)
}

var next_possible_states = function(transition_function, states){
	return lodash.flattenDeep(states.map(function(state){
		isUndefined(transition_function[state]) && (transition_function[state] = {epslon_symbol:[]})
		return transition_function[state][epslon_symbol] || []
	}))
}

var are_equal = function(collection1, collection2){
	collection1 = fresh_collection(collection1);
	collection2 = fresh_collection(collection2);
	return (lodash.difference(collection1, collection2).length == 0) && (lodash.difference(collection2, collection1).length == 0)
}

var equivalent_state = function(possible_dfa_states, returned_state){
	return possible_dfa_states.filter(function(each_state){
		return are_equal(each_state.split(","), returned_state.split(","))
	}).toString();
}

var alphabet_transaction = function(transition_function, state, alphabet, possible_dfa_states){
	var states_after_alphabet = state.split(",").map(function(each_state){
		transition_function[each_state] = transition_function[each_state] || {}
		return transition_function[each_state][alphabet] || []
	});
	return equivalent_state(possible_dfa_states, states_after_alphabet.toString());
}

var fresh_collection = function(collection){
	return collection.filter(function(ele){
		return ele != "";
	});
}

var dfa_transition_function = function(transition_function, alphabet_set, possible_dfa_states){
	var dfa_transition_function = {};
	possible_dfa_states.forEach(function(state){
		alphabet_set.forEach(function(alphabet){
			dfa_transition_function[state] = dfa_transition_function[state] || {};
			var epslon_state = state_with_epslon(transition_function, state, possible_dfa_states);
			var alphabet_state = alphabet_transaction(transition_function, epslon_state, alphabet, possible_dfa_states);
			dfa_transition_function[state][alphabet] = state_with_epslon(transition_function, alphabet_state, possible_dfa_states);
		})
	});
	return dfa_transition_function;
}

function isUndefined(element){ return element == undefined };

exports.nfa_to_dfa_convertor = nfa_to_dfa_convertor;
