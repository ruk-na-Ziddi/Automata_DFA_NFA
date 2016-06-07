var assert = require('chai').assert;

var nfa_generator = require("./nfa_generator.js").nfa_generator;

describe('=======================> test for ./nfa_generator.js', function() {

	describe('nfa_generator generates nfa', function () {
    it('nfa_generator generates a nfa with given properties', function () {
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

      	assert.equal(JSON.stringify(["q1","q2","q3","q4","q5"]), JSON.stringify(nfa.set_of_states));
      	assert.equal(JSON.stringify(["0","1"]), JSON.stringify(nfa.alphabet_set));
      	assert.equal("q1", nfa.initial_state);
    });
  });

  describe('nfa.accept', function () {
    it('nfa does not accept string if request has any other character than 1 and 0', function () {
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

      	assert.equal(false, nfa.accept("100000abc"));
    });
  });

  describe('nfa.accept', function () {
    it('nfa_ends_with_101 accepts  strings  101', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function={
			"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
			"q2":{"0":["q3"], "1":[], "ε":[]},
			"q3":{"0":[], "1":["q4"], "ε":[]},
			"q4":{"0":[], "1":[], "ε":[]},
		}
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(true, nfa_ends_with_101.accept("101"));
    });
  });

  describe('nfa.accept', function () {
    it('nfa_ends_with_101 accepts  string 00101', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function={
			"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
			"q2":{"0":["q3"], "1":[], "ε":[]},
			"q3":{"0":[], "1":["q4"], "ε":[]},
			"q4":{"0":[], "1":[], "ε":[]},
		}
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(true, nfa_ends_with_101.accept("00101"));
    });
  });

  describe('nfa.accept', function () {
    it('nfa_ends_with_101 accepts  string 11101', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function={
			"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
			"q2":{"0":["q3"], "1":[], "ε":[]},
			"q3":{"0":[], "1":["q4"], "ε":[]},
			"q4":{"0":[], "1":[], "ε":[]},
		}
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(true, nfa_ends_with_101.accept("11101"));
    });
  });

  describe('nfa.accept', function () {
    it('nfa_ends_with_101 accepts  string 1100101', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function={
			"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
			"q2":{"0":["q3"], "1":[], "ε":[]},
			"q3":{"0":[], "1":["q4"], "ε":[]},
			"q4":{"0":[], "1":[], "ε":[]},
		}
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(true, nfa_ends_with_101.accept("1100101"));
    });
  });

  describe('nfa.accept', function () {
    it('nfa_ends_with_101 does not accept string 111', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function={
			"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
			"q2":{"0":["q3"], "1":[], "ε":[]},
			"q3":{"0":[], "1":["q4"], "ε":[]},
			"q4":{"0":[], "1":[], "ε":[]},
		}
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(false, nfa_ends_with_101.accept("111"));
    });
  });

  describe('nfa.accept', function () {
    it('nfa_ends_with_101 does not accept string 110', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function={
			"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
			"q2":{"0":["q3"], "1":[], "ε":[]},
			"q3":{"0":[], "1":["q4"], "ε":[]},
			"q4":{"0":[], "1":[], "ε":[]},
		}
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(false, nfa_ends_with_101.accept("110"));
    });
  });

  describe('nfa.accept', function () {
    it('nfa_ends_with_101 does not accept string 110110', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function={
			"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
			"q2":{"0":["q3"], "1":[], "ε":[]},
			"q3":{"0":[], "1":["q4"], "ε":[]},
			"q4":{"0":[], "1":[], "ε":[]},
		}
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(false, nfa_ends_with_101.accept("110110"));
    });
  });

  describe('nfa.accept', function () {
    it('nfa_ends_with_101 does not accept string 1111100', function () {
	    set_of_states = ["q1","q2","q3","q4"];
		transition_function={
			"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
			"q2":{"0":["q3"], "1":[], "ε":[]},
			"q3":{"0":[], "1":["q4"], "ε":[]},
			"q4":{"0":[], "1":[], "ε":[]},
		}
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q4"];

      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(false, nfa_ends_with_101.accept("1111100"));
    });
  });

  describe('nfa.accept', function () {
    it('nfa_ends_with_0 accept string 0', function () {
	    set_of_states = ["q1","q2","q3"];
		transition_function={
			"q1":{"0":["q1"], "1":[], "ε":["q2"]},
			"q2":{"0":["q3"], "1":["q2"], "ε":[]},
			"q3":{"0":[], "1":[], "ε":[]}
		}
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q3"];

      	var nfa_ends_with_0 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(true, nfa_ends_with_0.accept("0"));
    });
  });

  describe('nfa.accept', function () {
    it('nfa_ends_with_0 accept string 10', function () {
	    set_of_states = ["q1","q2","q3"];
		transition_function={
			"q1":{"0":["q1"], "1":[], "ε":["q2"]},
			"q2":{"0":["q3"], "1":["q2"], "ε":[]},
			"q3":{"0":[], "1":[], "ε":[]}
		}
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q3"];

      	var nfa_ends_with_0 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(true, nfa_ends_with_0.accept("10"));
    });
  });

  describe('nfa.accept', function () {
    it('nfa_ends_with_0 accept string 110', function () {
	    set_of_states = ["q1","q2","q3"];
		transition_function={
			"q1":{"0":["q1"], "1":[], "ε":["q2"]},
			"q2":{"0":["q3"], "1":["q2"], "ε":[]},
			"q3":{"0":[], "1":[], "ε":[]}
		}
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q3"];

      	var nfa_ends_with_0 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(true, nfa_ends_with_0.accept("110"));
    });
  });

  describe('nfa.accept', function () {
    it('nfa_ends_with_0 accept string 0000', function () {
	    set_of_states = ["q1","q2","q3"];
		transition_function={
			"q1":{"0":["q1"], "1":[], "ε":["q2"]},
			"q2":{"0":["q3"], "1":["q2"], "ε":[]},
			"q3":{"0":[], "1":[], "ε":[]}
		}
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q3"];

      	var nfa_ends_with_0 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(true, nfa_ends_with_0.accept("0000"));
    });
  });

  describe('nfa.accept', function () {
    it('nfa_no_name accepts string 0', function () {
	    set_of_states = ["q1","q2","q3"];
		transition_function={
			"q1":{"0":["q1"], "1":[], "ε":["q2"]},
			"q2":{"0":[], "1":["q2"], "ε":["q3"]},
			"q3":{"0":[], "1":[], "ε":[]}
		}
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q3"];

      	var nfa_no_name = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(true, nfa_no_name.accept("0"));
    });
  });

  describe('nfa.accept', function () {
    it('nfa_no_name accepts empty string', function () {
	    set_of_states = ["q1","q2","q3"];
		transition_function={
			"q1":{"0":["q1"], "1":[], "ε":["q2"]},
			"q2":{"0":[], "1":["q2"], "ε":["q3"]},
			"q3":{"0":[], "1":[], "ε":[]}
		}
		alphabet_set=["0","1"];
		initial_state = "q1";
		set_of_final_states = ["q3"];

      	var nfa_no_name = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

      	assert.equal(true, nfa_no_name.accept(""));
    });
  });
});