define(function(){
  return {
    simulate: function(models, object){
      var states = Object.keys(models),
          r = jStat.uniform.sample(0,1),
          a = 0,
          state,
          new_p_s = {};

      for(var i = 0, l = states.length; i < l; i++){
        var s = states[i],
            p = object[s];
        if(r > a){
          state = s;
          a += p;
        }

        new_p_s[s] = 0;
      }

      new_p_s[state] = 1;

      return { p_s: new_p_s, r: r, state: state }
    }
  }
});