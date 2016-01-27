define(function(){
	return {
    model: function(model_set, object){
      var states = Object.keys(model_set),
          p_s = {};
      
      for (var i = 0; i < states.length; i++) {
        var s = states[i];
        p_s[s] = this.compute_state(model_set, object, s);
      }

      return p_s;
    },

    compute_state: function(model_set, object, s){
      var states = Object.keys(model_set),
          p = 1.0;

      for(var i = 0; i < states.length; i++) {
        if(states[i] != s){
          p += Math.exp( model_set[states[i]](object) - model_set[s](object) );
        }
      }
      return 1.0/p;
    }
  };

})