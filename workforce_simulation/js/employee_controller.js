define(['helpers/clone','logistic_modeler','logistic_simulator'], function(clone, logistic_modeler, logistic_simulator){
  var employee_controller = {

    init: function(data){
      this.base_year_data = data;
      this.reset();
      return this;
    },

    data: [],

    logistic_modeler: logistic_modeler,

    logistic_simulator: logistic_simulator,

    model: function(){
      var self = this;
      this.data = this.data.map(function(d){
        var p_s = self.logistic_modeler.model(app.evolution.models, d);
        for(s in p_s){
          d[s] = p_s[s];
        }
        return d;
      });
      return this.data;
    },

    simulate: function(){
      var self = this;
      this.data = this.data.map(function(d){
        var p_s = self.logistic_simulator.simulate(app.evolution.models, d).p_s;
        for(s in p_s){
          d[s] = p_s[s];
        }
        return d;
      });
      return this.data;
    },

    evolve: function(){
      this.data = app.evolution.evolve(this.data);
    },

    summarize: function(prop_name){
      var summary = {};
      for(var i = 0, l = this.data.length; i < l; i++){
        var g = this.data[i][prop_name];
        summary[g] ? summary[g] += 1 : summary[g] = 1;
      }
      return summary;
    },

    summarize_states: function(){
      var states = Object.keys(app.evolution.models),
          summary = {};
      for(var i = 0, l = this.data.length; i < l; i++){
        for(var j = 0, m = states.length; j < m; j++){
          var s = states[j];
          summary[s] = summary[s] ? summary[s] + this.data[i][s] : this.data[i][s];
        }
      };
      return summary;
    },

    reset: function(){
      this.data = this.base_year_data.map(function(d){
        return clone(d);
      });
    }

  };

  return function(app, data){
    return employee_controller.init(data);
  }
});