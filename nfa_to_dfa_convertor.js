var lodash = require("lodash");
var combinations = require("./combinations.js").combinations;
var dfa_generator = require("./dfa_generator.js").dfa_generator;

var epslon_symbol = "e"
// var epslon_symbol = "ε"

var nfa_to_dfa_convertor = function(set_of_states,alphabet_set, transition_function, initial_state, set_of_final_states){
	var possible_dfa_states = combinations(set_of_states).map(function(state){return state.toString()});
	var initial_state_for_dfa = possible_initial_state(transition_function, initial_state, possible_dfa_states);
	var final_states_for_dfa = possible_final_states(set_of_final_states, possible_dfa_states);
	var transition_function_for_dfa = dfa_transition_function(transition_function, alphabet_set, possible_dfa_states);
	return dfa_generator(possible_dfa_states,alphabet_set, transition_function_for_dfa, initial_state_for_dfa, final_states_for_dfa);
}

var possible_final_states = function(set_of_final_states, possible_dfa_states){
	return possible_dfa_states.filter(function(state){
		return lodash.intersection(set_of_final_states, state.split(",")).length >= 1;
	})
}

var possible_initial_state = function(transition_function, initial_state, possible_dfa_states){
	var initial_state = lodash.flattenDeep(initial_state.split(","));
	var next_candidates = next_possible_states(transition_function, initial_state);
	// console.log("next_candidates=====>",next_candidates)
	if(lodash.difference(next_candidates, initial_state).length == 0)
		// console.log("initial_state======>",initial_state)
		// console.log("equivalent_state===>",equivalent_state(possible_dfa_states, initial_state.toString()))
		return equivalent_state(possible_dfa_states, initial_state.toString());
	return _this.continuousEplsonTransactions(lodash.union(initial_state, next_candidates).toString())
}

var next_possible_states = function(transition_function, states){
	return lodash.flattenDeep(states.map(function(state){
		isUndefined(transition_function[state]) && (transition_function[state] = {epslon_symbol:[]})
		return transition_function[state][epslon_symbol] || []
	}))
}

var are_equal = function(collection1, collection2){
	return (lodash.difference(collection1, collection2).length == 0) && (lodash.difference(collection2, collection1).length == 0)
}

var equivalent_state = function(possible_dfa_states, returned_state){
	return possible_dfa_states.filter(function(each_state){
		// console.log("returned_state-->",returned_state)
		return are_equal(each_state.split(","), returned_state.split(","))
	}).toString();
}

var state_after_alphabet_transaction = function(transition_function, state, alphabet, possible_dfa_states){
	// console.log("state------------->", state)
	var after_alphabet_transition = state.split(",").map(function(each_state){
		// console.log(transition_function[each_state],"-------------------")
		transition_function[each_state] = transition_function[each_state] || {}
		return transition_function[each_state][alphabet] || []
	})
	// console.log("after_alphabet_transition==> ",lodash.flattenDeep(after_alphabet_transition).toString())
	var next_epslon_states = possible_initial_state(transition_function, lodash.flattenDeep(after_alphabet_transition).toString(), possible_dfa_states);
	// console.log("next_epslon_states------>",next_epslon_states)
	return equivalent_state(possible_dfa_states, next_epslon_states.toString());
}

var dfa_transition_function = function(transition_function, alphabet_set, possible_dfa_states){
	var transition_function_for_dfa = {};
	// console.log("possible_dfa_states   ", possible_dfa_states)
	possible_dfa_states.forEach(function(each_state){
		// console.log("each_state is some:  ",each_state)
		alphabet_set.forEach(function(each_alphabet){
			transition_function_for_dfa[each_state] = transition_function_for_dfa[each_state] || {};
			transition_function_for_dfa[each_state][each_alphabet] = state_after_alphabet_transaction(transition_function, each_state, each_alphabet, possible_dfa_states);
			// console.log("===================>    ,",transition_function_for_dfa[each_state][each_alphabet])
		})
	});
	return transition_function_for_dfa;
}

function isUndefined(element){ return element == undefined };

exports.nfa_to_dfa_convertor = nfa_to_dfa_convertor;
// console.log(areEqual([1,2,3,4], [3,2,4,1]));
