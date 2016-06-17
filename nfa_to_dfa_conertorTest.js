var assert = require('chai').assert;

var nfa_to_dfa_convertor = require("./nfa_to_dfa_convertor.js").nfa_to_dfa_convertor;

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

 //  describe('nfa.accept', function () {
 //    it('nfa_ends_with_101 accepts  strings  101', function () {
	//     set_of_states = ["q1","q2","q3","q4"];
	// 	transition_function={
	// 		"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
	// 		"q2":{"0":["q3"], "1":[], "ε":[]},
	// 		"q3":{"0":[], "1":["q4"], "ε":[]},
	// 		"q4":{"0":[], "1":[], "ε":[]},
	// 	}
	// 	alphabet_set=["0","1"];
	// 	initial_state = "q1";
	// 	set_of_final_states = ["q4"];

 //      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

 //      	assert.equal(true, nfa_ends_with_101.accept("101"));
 //    });
 //  });

 //  describe('nfa.accept', function () {
 //    it('nfa_ends_with_101 accepts  string 00101', function () {
	//     set_of_states = ["q1","q2","q3","q4"];
	// 	transition_function={
	// 		"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
	// 		"q2":{"0":["q3"], "1":[], "ε":[]},
	// 		"q3":{"0":[], "1":["q4"], "ε":[]},
	// 		"q4":{"0":[], "1":[], "ε":[]},
	// 	}
	// 	alphabet_set=["0","1"];
	// 	initial_state = "q1";
	// 	set_of_final_states = ["q4"];

 //      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

 //      	assert.equal(true, nfa_ends_with_101.accept("00101"));
 //    });
 //  });

 //  describe('nfa.accept', function () {
 //    it('nfa_ends_with_101 accepts  string 11101', function () {
	//     set_of_states = ["q1","q2","q3","q4"];
	// 	transition_function={
	// 		"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
	// 		"q2":{"0":["q3"], "1":[], "ε":[]},
	// 		"q3":{"0":[], "1":["q4"], "ε":[]},
	// 		"q4":{"0":[], "1":[], "ε":[]},
	// 	}
	// 	alphabet_set=["0","1"];
	// 	initial_state = "q1";
	// 	set_of_final_states = ["q4"];

 //      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

 //      	assert.equal(true, nfa_ends_with_101.accept("11101"));
 //    });
 //  });

 //  describe('nfa.accept', function () {
 //    it('nfa_ends_with_101 accepts  string 1100101', function () {
	//     set_of_states = ["q1","q2","q3","q4"];
	// 	transition_function={
	// 		"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
	// 		"q2":{"0":["q3"], "1":[], "ε":[]},
	// 		"q3":{"0":[], "1":["q4"], "ε":[]},
	// 		"q4":{"0":[], "1":[], "ε":[]},
	// 	}
	// 	alphabet_set=["0","1"];
	// 	initial_state = "q1";
	// 	set_of_final_states = ["q4"];

 //      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

 //      	assert.equal(true, nfa_ends_with_101.accept("1100101"));
 //    });
 //  });

 //  describe('nfa.accept', function () {
 //    it('nfa_ends_with_101 does not accept string 111', function () {
	//     set_of_states = ["q1","q2","q3","q4"];
	// 	transition_function={
	// 		"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
	// 		"q2":{"0":["q3"], "1":[], "ε":[]},
	// 		"q3":{"0":[], "1":["q4"], "ε":[]},
	// 		"q4":{"0":[], "1":[], "ε":[]},
	// 	}
	// 	alphabet_set=["0","1"];
	// 	initial_state = "q1";
	// 	set_of_final_states = ["q4"];

 //      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

 //      	assert.equal(false, nfa_ends_with_101.accept("111"));
 //    });
 //  });

 //  describe('nfa.accept', function () {
 //    it('nfa_ends_with_101 does not accept string 110', function () {
	//     set_of_states = ["q1","q2","q3","q4"];
	// 	transition_function={
	// 		"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
	// 		"q2":{"0":["q3"], "1":[], "ε":[]},
	// 		"q3":{"0":[], "1":["q4"], "ε":[]},
	// 		"q4":{"0":[], "1":[], "ε":[]},
	// 	}
	// 	alphabet_set=["0","1"];
	// 	initial_state = "q1";
	// 	set_of_final_states = ["q4"];

 //      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

 //      	assert.equal(false, nfa_ends_with_101.accept("110"));
 //    });
 //  });

 //  describe('nfa.accept', function () {
 //    it('nfa_ends_with_101 does not accept string 110110', function () {
	//     set_of_states = ["q1","q2","q3","q4"];
	// 	transition_function={
	// 		"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
	// 		"q2":{"0":["q3"], "1":[], "ε":[]},
	// 		"q3":{"0":[], "1":["q4"], "ε":[]},
	// 		"q4":{"0":[], "1":[], "ε":[]},
	// 	}
	// 	alphabet_set=["0","1"];
	// 	initial_state = "q1";
	// 	set_of_final_states = ["q4"];

 //      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

 //      	assert.equal(false, nfa_ends_with_101.accept("110110"));
 //    });
 //  });

 //  describe('nfa.accept', function () {
 //    it('nfa_ends_with_101 does not accept string 1111100', function () {
	//     set_of_states = ["q1","q2","q3","q4"];
	// 	transition_function={
	// 		"q1":{"0":["q1"], "1":["q1","q2"], "ε":[]},
	// 		"q2":{"0":["q3"], "1":[], "ε":[]},
	// 		"q3":{"0":[], "1":["q4"], "ε":[]},
	// 		"q4":{"0":[], "1":[], "ε":[]},
	// 	}
	// 	alphabet_set=["0","1"];
	// 	initial_state = "q1";
	// 	set_of_final_states = ["q4"];

 //      	var nfa_ends_with_101 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

 //      	assert.equal(false, nfa_ends_with_101.accept("1111100"));
 //    });
 //  });

 //  describe('nfa.accept', function () {
 //    it('nfa_ends_with_0 accept string 0', function () {
	//     set_of_states = ["q1","q2","q3"];
	// 	transition_function={
	// 		"q1":{"0":["q1"], "1":[], "ε":["q2"]},
	// 		"q2":{"0":["q3"], "1":["q2"], "ε":[]},
	// 		"q3":{"0":[], "1":[], "ε":[]}
	// 	}
	// 	alphabet_set=["0","1"];
	// 	initial_state = "q1";
	// 	set_of_final_states = ["q3"];

 //      	var nfa_ends_with_0 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

 //      	assert.equal(true, nfa_ends_with_0.accept("0"));
 //    });
 //  });

 //  describe('nfa.accept', function () {
 //    it('nfa_ends_with_0 accept string 10', function () {
	//     set_of_states = ["q1","q2","q3"];
	// 	transition_function={
	// 		"q1":{"0":["q1"], "1":[], "ε":["q2"]},
	// 		"q2":{"0":["q3"], "1":["q2"], "ε":[]},
	// 		"q3":{"0":[], "1":[], "ε":[]}
	// 	}
	// 	alphabet_set=["0","1"];
	// 	initial_state = "q1";
	// 	set_of_final_states = ["q3"];

 //      	var nfa_ends_with_0 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

 //      	assert.equal(true, nfa_ends_with_0.accept("10"));
 //    });
 //  });

 //  describe('nfa.accept', function () {
 //    it('nfa_ends_with_0 accept string 110', function () {
	//     set_of_states = ["q1","q2","q3"];
	// 	transition_function={
	// 		"q1":{"0":["q1"], "1":[], "ε":["q2"]},
	// 		"q2":{"0":["q3"], "1":["q2"], "ε":[]},
	// 		"q3":{"0":[], "1":[], "ε":[]}
	// 	}
	// 	alphabet_set=["0","1"];
	// 	initial_state = "q1";
	// 	set_of_final_states = ["q3"];

 //      	var nfa_ends_with_0 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

 //      	assert.equal(true, nfa_ends_with_0.accept("110"));
 //    });
 //  });

 //  describe('nfa.accept', function () {
 //    it('nfa_ends_with_0 accept string 0000', function () {
	//     set_of_states = ["q1","q2","q3"];
	// 	transition_function={
	// 		"q1":{"0":["q1"], "1":[], "ε":["q2"]},
	// 		"q2":{"0":["q3"], "1":["q2"], "ε":[]},
	// 		"q3":{"0":[], "1":[], "ε":[]}
	// 	}
	// 	alphabet_set=["0","1"];
	// 	initial_state = "q1";
	// 	set_of_final_states = ["q3"];

 //      	var nfa_ends_with_0 = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

 //      	assert.equal(true, nfa_ends_with_0.accept("0000"));
 //    });
 //  });

 //  describe('nfa.accept', function () {
 //    it('nfa_no_name accepts string 0', function () {
	//     set_of_states = ["q1","q2","q3"];
	// 	transition_function={
	// 		"q1":{"0":["q1"], "1":[], "ε":["q2"]},
	// 		"q2":{"0":[], "1":["q2"], "ε":["q3"]},
	// 		"q3":{"0":[], "1":[], "ε":[]}
	// 	}
	// 	alphabet_set=["0","1"];
	// 	initial_state = "q1";
	// 	set_of_final_states = ["q3"];

 //      	var nfa_no_name = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

 //      	assert.equal(true, nfa_no_name.accept("0"));
 //    });
 //  });

 //  describe('nfa.accept', function () {
 //    it('nfa_no_name accepts empty string', function () {
	//     set_of_states = ["q1","q2","q3"];
	// 	transition_function={
	// 		"q1":{"0":["q1"], "1":[], "ε":["q2"]},
	// 		"q2":{"0":[], "1":["q2"], "ε":["q3"]},
	// 		"q3":{"0":[], "1":[], "ε":[]}
	// 	}
	// 	alphabet_set=["0","1"];
	// 	initial_state = "q1";
	// 	set_of_final_states = ["q3"];

 //      	var nfa_no_name = nfa_generator (set_of_states, alphabet_set, transition_function, initial_state, set_of_final_states)

 //      	assert.equal(true, nfa_no_name.accept(""));
 //    });
 //  });
});