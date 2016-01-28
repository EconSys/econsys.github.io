define(function(){
	return {
    model: function(models, object){
      var states = Object.keys(models),
          p_s = {};
      
      for (var i = 0; i < states.length; i++) {
        var s = states[i];
        p_s[s] = this.compute_state(models, object, s);
      }

      return p_s;
    },

    compute_state: function(models, object, s){
      var states = Object.keys(models),
          p = 1.0;

      for(var i = 0; i < states.length; i++) {
        if(states[i] != s){
          p += Math.exp( models[states[i]](object) - models[s](object) );
        }
      }
      return 1.0/p;
    }
  };

})