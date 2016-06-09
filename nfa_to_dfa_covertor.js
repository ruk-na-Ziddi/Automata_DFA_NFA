var combinations = require("./combinations.js").combinations;
var dfa_generator = require("./dfa_generator.js").dfa_generator;

// console.log(combinations([1,2,3,4,5]), "\nAnd type is   ", toString.call(combinations([1,2,3,4,5])));

var nfa_to_dfa_convertor = function(set_of_states,alphabet_set, transition_function, initial_state, set_of_final_states){
	var possible_dfa_states = combinations(set_of_states).map(function(state){return state.toString()}).filetr(function(st){return st != ""});
	return dfa_generator(set_of_states,alphabet_set, transition_function, initial_state, set_of_final_states);
}

var converted_dfa_transition_function = function(transition_function, dfa_states){
	var generated_transition_function = {};
	dfa_states.forEach(function(state){
		var states_to_go = [];
		state.split("").forEach(function(each_state){
			transition_function[]
		})
	})
}