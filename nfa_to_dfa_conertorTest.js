var assert = require('chai').assert;

var nfa_to_dfa_convertor = require("./nfa_to_dfa_convertor.js").nfa_to_dfa_convertor;
var nfa_generator = require("./nfa_generator.js").nfa_generator;


describe('=======================> test for ./nfa_to_dfa_convertor.js', function() {

	describe('nfa_to_dfa_convertor generates a equivalent dfa_ends_with_101 for nfa_ends_with_101', function () {
    it('generated dfa should accept all the strings nfa accepts', function () {
	    set_of_states=["q1","q2","q3","q4"]
		alphabet_set=["0","1"]
		transition_function={
			"q1":{"0":["q1"], "1":["q1", "q2"], "ε":[]},
			"q2":{"0":["q3"], "1":[], "ε":[]},
			"q3":{"0":[], "1":["q4"], "ε":[]},
			"q4":{"0":[], "1":[], "ε":[]}
		}
		initial_state="q1"
		set_of_final_states=["q4"]

      	var dfa = nfa_to_dfa_convertor (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(true, dfa.accept("101"));
      	assert.equal(true, dfa.accept("00000101"));
      	assert.equal(true, dfa.accept("11101"));
      	assert.equal(true, dfa.accept("1010101"));
      	assert.equal(true, dfa.accept("0101101"));
    });
  });

 describe('nfa_to_dfa_convertor generates a equivalent dfa_ends_with_101 for nfa_ends_with_101', function () {
    it('generated dfa should reject all the strings nfa rejects', function () {
	    set_of_states=["q1","q2","q3","q4"]
		alphabet_set=["0","1"]
		transition_function={
			"q1":{"0":["q1"], "1":["q1", "q2"], "ε":[]},
			"q2":{"0":["q3"], "1":[], "ε":[]},
			"q3":{"0":[], "1":["q4"], "ε":[]},
			"q4":{"0":[], "1":[], "ε":[]}
		}
		initial_state="q1"
		set_of_final_states=["q4"]

      	var dfa = nfa_to_dfa_convertor (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(false, dfa.accept("1011"));
      	assert.equal(false, dfa.accept("000001011"));
      	assert.equal(false, dfa.accept("111010"));
      	assert.equal(false, dfa.accept("10101010"));
      	assert.equal(false, dfa.accept("01011010"));
    });
  });

 describe('nfa_to_dfa_convertor generates a equivalent dfa_ends_with_101 for nfa_ends_with_101', function () {
    it('generated dfa rejects input if it contains anything other than 1 and 0', function () {
	    set_of_states=["q1","q2","q3","q4"]
		alphabet_set=["0","1"]
		transition_function={
			"q1":{"0":["q1"], "1":["q1", "q2"], "ε":[]},
			"q2":{"0":["q3"], "1":[], "ε":[]},
			"q3":{"0":[], "1":["q4"], "ε":[]},
			"q4":{"0":[], "1":[], "ε":[]}
		}
		initial_state="q1"
		set_of_final_states=["q4"]

      	var dfa = nfa_to_dfa_convertor (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(false, dfa.accept("101a1"));
      	assert.equal(false, dfa.accept("00000101!!1"));
      	assert.equal(false, dfa.accept("111010"));
      	assert.equal(false, dfa.accept("1pe010101"));
      	assert.equal(false, dfa.accept("0e1011010"));
    });
  });

 describe('nfa_to_dfa_convertor generates a equivalent dfa_with_even_1s_or_0s for nfa_with_even_1s_or_0s', function () {
    it('dfa_with_even_1s_or_0s accepts all the strings accepted by nfa_with_even_1s_or_0s', function () {
	    set_of_states=["q1","q2","q3","q4","q5"]
		alphabet_set=["0","1"]
		transition_function={
			"q1":{"0":[], "1":[], "ε":["q2","q4"]},
			"q2":{"0":["q3"], "1":["q2"], "ε":[]},
			"q3":{"0":["q2"], "1":["q3"], "ε":[]},
			"q4":{"0":["q4"], "1":["q5"], "ε":[]},
			"q5":{"0":["q5"], "1":["q4"], "ε":[]}
		}
		initial_state="q1"
		set_of_final_states=["q2","q4"]

      	var nfa = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)
      	var dfa = nfa_to_dfa_convertor(set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states);

      	assert.equal(true, nfa.accept("11"));
      	assert.equal(true, dfa.accept("11"));

      	assert.equal(true, nfa.accept("00"));
      	assert.equal(true, dfa.accept("00"));

      	assert.equal(true, nfa.accept("100"));
      	assert.equal(true, dfa.accept("100"));

      	assert.equal(true, nfa.accept("011"));
      	assert.equal(true, dfa.accept("011"));

      	assert.equal(true, nfa.accept("0"));
      	assert.equal(true, dfa.accept("0"));
    });
  });

 describe('nfa_to_dfa_convertor generates a equivalent dfa_with_even_1s_or_0s for nfa_with_even_1s_or_0s', function () {
    it('dfa_with_even_1s_or_0s rejects all the strings rejected by nfa_with_even_1s_or_0s', function () {
	    set_of_states=["q1","q2","q3","q4","q5"]
		alphabet_set=["0","1"]
		transition_function={
			"q1":{"0":[], "1":[], "ε":["q2","q4"]},
			"q2":{"0":["q3"], "1":["q2"], "ε":[]},
			"q3":{"0":["q2"], "1":["q3"], "ε":[]},
			"q4":{"0":["q4"], "1":["q5"], "ε":[]},
			"q5":{"0":["q5"], "1":["q4"], "ε":[]}
		}
		initial_state="q1"
		set_of_final_states=["q2","q4"]

      	var nfa = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)
      	var dfa = nfa_to_dfa_convertor(set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states);

      	assert.equal(false, nfa.accept("10"));
      	assert.equal(false, dfa.accept("10"));

      	assert.equal(false, nfa.accept("0100"));
      	assert.equal(false, dfa.accept("0100"));
    });
  });

});