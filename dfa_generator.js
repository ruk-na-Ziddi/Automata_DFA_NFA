var dfa = function(set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states){
	this.set_of_states = set_of_states;
	this.alphabet_set = alphabet_set;
	this.transition_function = transition_function;
	this.initial_state = initial_state;
	this.set_of_final_states = set_of_final_states;
}

var dfa_generator = function(set_of_states,alphabet_set, transition_function, initial_state, set_of_final_states){
	return new dfa(set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states);
};

dfa.prototype.accept = function(alphabets){
	return this.set_of_final_states.indexOf(this.runner(alphabets)) > -1;
};

dfa.prototype.runner = function(alphabets){
	var self=this;
	if(self.badRequest(alphabets))
		return "bad state";
	return alphabets.split("").reduce(function(initial_state, char){
		return self.transition_function[initial_state][char];
	}, self.initial_state);
};

dfa.prototype.badRequest = function(alphabets){
	var alphabet_set=this.alphabet_set;
	return alphabets.split("").some(function(ele){
		return alphabet_set.indexOf(ele) == -1;
	});
}

exports.dfa_generator = dfa_generator;
