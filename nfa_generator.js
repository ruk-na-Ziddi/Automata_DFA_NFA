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
	// console.log(this.runner(alphabets))
	return lodash.intersection(this.set_of_final_states, lodash.flatten(this.runner(alphabets))).length >= 1;
};

nfa.prototype.runner = function(alphabets){
	var self=this;
	if(self.badRequest(alphabets))
		return ["bad state"];

	if(alphabets == ""){
		return self.continuousEplsonTransactions()(self.transition_function[self.initial_state][epslon_symbol]);
	}

	return alphabets.split("").reduce(function(states, alphabet){
		return lodash.flatten(states).map(function(state){
			var epslon_transaction = self.continuousEplsonTransactions()(self.transition_function[state][epslon_symbol] || []);
			// console.log("epslon_transaction     ", epslon_transaction);

			var next_to_epslon = self.getNextForEpslon(epslon_transaction, alphabet);
			// console.log("next_to_epslon        ",next_to_epslon);

			var epslon_transaction_from_last_transition = self.transition_function[state][alphabet] || []
			// console.log("epslon_transaction_from_last_transition_before   ",epslon_transaction_from_last_transition)
			if(alphabets.split("").lastIndexOf(alphabet) == alphabets.length-1)
				epslon_transaction_from_last_transition = lodash.union(self.continuousEplsonTransactions()(self.transition_function[state][alphabet] || []), self.continuousEplsonTransactions()(next_to_epslon))
			// console.log("epslon_transaction_from_last_transition     ",epslon_transaction_from_last_transition);

			return lodash.flattenDeep(lodash.union(epslon_transaction_from_last_transition, next_to_epslon))
		})
	}, [self.initial_state]);
};

nfa.prototype.badRequest = function(alphabets){
	var self=this;
	return alphabets.split("").some(function(ele){
		return self.alphabet_set.indexOf(ele) == -1;
	});
}

nfa.prototype.continuousEplsonTransactions = function(){
	var self = this;
	var all = [];
	return function all_eps_transactions(states){
		var result = [];
		states.forEach(function(state){
			if (!self.transition_function[state][epslon_symbol]) {self.transition_function[state][epslon_symbol] = []}
			all.push(state);
			result.push(self.transition_function[state][epslon_symbol]);
		})

		result = lodash.uniq(lodash.flattenDepth(result));
		all.push(result);

		var noEpslon = result.every(function(state){
			if (!self.transition_function[state][epslon_symbol]) {self.transition_function[state][epslon_symbol] = []}
			return self.transition_function[state][epslon_symbol].length == 0;
		})

		if(noEpslon)
			return lodash.flattenDepth(all);
		return all_eps_transactions(result);
	}
}

nfa.prototype.getNextForEpslon = function(states, alphabet){
	var self=this;
	var result = [];
	// console.log(states, alphabet);
	states.forEach(function(state){
		result.push(self.transition_function[state][alphabet] || [])
	})
	return lodash.flattenDeep(lodash.uniq(lodash.flattenDepth(result)));
}

exports.nfa_generator = nfa_generator;
// ε
