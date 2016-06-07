var assert = require('chai').assert;

var dfa_generator = require("./dfa_generator.js").dfa_generator;

describe('=========================> test for ./dfa_generator.js', function() {

	describe('dfa_generator generates dfa', function () {
    it('dfa_generator generates a dfa with given properties', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function = {
			"q1":{"0":"q3", "1":"q2"}, 
			"q2":{"0":"q4", "1":"q3"}, 
			"q3":{"0":"q3", "1":"q3"}, 
			"q4":{"1":"q4", "0":"q4"}
		};
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var dfa = dfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(JSON.stringify(["q1","q2","q3","q4"]), JSON.stringify(dfa.set_of_states));
      	assert.equal(JSON.stringify(["0","1"]), JSON.stringify(dfa.alphabet_set));
      	assert.equal("q1", dfa.initial_state);
    });
  });

  describe('dfa.accept', function () {
    it('dfa accepts all the strings staring with 10 and have only 1 and 0 as their elements', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function = {
			"q1":{"0":"q3", "1":"q2"}, 
			"q2":{"0":"q4", "1":"q3"}, 
			"q3":{"0":"q3", "1":"q3"}, 
			"q4":{"1":"q4", "0":"q4"}
		};
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var dfa = dfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(true, dfa.accept("100000"));
      	assert.equal(true, dfa.accept("10"));
      	assert.equal(true, dfa.accept("1000000000000000"));
    });
  });

  describe('dfa.accept', function () {
    it('dfa rejects the string if it starts with 0', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function = {
			"q1":{"0":"q3", "1":"q2"}, 
			"q2":{"0":"q4", "1":"q3"}, 
			"q3":{"0":"q3", "1":"q3"}, 
			"q4":{"1":"q4", "0":"q4"}
		};
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var dfa = dfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(false, dfa.accept("00100000"));
    });
  });

  describe('dfa.accept', function () {
    it('dfa rejects the string if it starts with 1 but second character is also 1', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function = {
			"q1":{"0":"q3", "1":"q2"}, 
			"q2":{"0":"q4", "1":"q3"}, 
			"q3":{"0":"q3", "1":"q3"}, 
			"q4":{"1":"q4", "0":"q4"}
		};
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var dfa = dfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(false, dfa.accept("1100000"));
    });
  });

  describe('dfa.runner', function () {
    it('dfa runner returns bad state  if it has any character other than 0 or 1', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function = {
			"q1":{"0":"q3", "1":"q2"}, 
			"q2":{"0":"q4", "1":"q3"}, 
			"q3":{"0":"q3", "1":"q3"}, 
			"q4":{"1":"q4", "0":"q4"}
		};
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var dfa = dfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal("bad state", dfa.runner("1100acv000"));
    });
  });

  describe('dfa.accept', function () {
    it('dfa rejects the string if it has any character other than 0 or 1', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function = {
			"q1":{"0":"q3", "1":"q2"}, 
			"q2":{"0":"q4", "1":"q3"}, 
			"q3":{"0":"q3", "1":"q3"}, 
			"q4":{"1":"q4", "0":"q4"}
		};
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var dfa = dfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(false, dfa.accept("1100acv000"));
    });
  });

  describe('dfa.badRequest', function () {
    it('dfa badRequest is true if string  has any character other than 0 or 1', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function = {
			"q1":{"0":"q3", "1":"q2"}, 
			"q2":{"0":"q4", "1":"q3"}, 
			"q3":{"0":"q3", "1":"q3"}, 
			"q4":{"1":"q4", "0":"q4"}
		};
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var dfa = dfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(true, dfa.badRequest("1100acv000"));
    });
  });

  describe('dfa.accept', function () {
    it('dfa_length_is_devided_by_2 accepts all strings where strings lenght is devided by 2', function () {
	    set_of_states = ["q1","q2"];
		transition_function = {
			"q1":{"0":"q2", "1":"q2"}, 
			"q2":{"0":"q1", "1":"q1"}
		};
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q1"];

      	var dfa_length_is_devided_by_2 = dfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(true, dfa_length_is_devided_by_2.accept("110000"));
    });
  });

  describe('dfa.accept', function () {
    it('dfa_length_is_devided_by_2 rejects all strings where strings lenght is not devided by 2', function () {
	    set_of_states = ["q1","q2"];
		transition_function = {
			"q1":{"0":"q2", "1":"q2"}, 
			"q2":{"0":"q1", "1":"q1"}
		};
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q1"];

      	var dfa_length_is_devided_by_2 = dfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(false, dfa_length_is_devided_by_2.accept("1100001"));
    });
  });
});
