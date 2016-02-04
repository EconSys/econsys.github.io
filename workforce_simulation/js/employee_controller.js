define(['helpers/clone','logistic_modeler','logistic_simulator'], function(clone, logistic_modeler, logistic_simulator){
  var employee_controller = function(spec){

    var self = {};

    for(var p in spec){
      if(spec.hasOwnProperty(p))
        self[p] = spec[p];
    }

    self.logistic_modeler = logistic_modeler;

    self.logistic_simulator = logistic_simulator;

    self.model = function(){
      self.data = self.data.map(function(d){
        var p_s = self.logistic_modeler.model(self.app.evolution.models, d);
        for(s in p_s){
          d[s] = p_s[s];
        }
        return d;
      });
      return self.data;
    };

    self.simulate = function(){
      self.data = self.data.map(function(d){
        var p_s = self.logistic_simulator.simulate(self.app.evolution.models, d).p_s;
        for(s in p_s){
          d[s] = p_s[s];
        }
        return d;
      });
      return self.data;
    };

    self.evolve = function(){
      self.data = self.app.evolution.evolve(self.data);
    };

    self.summarize = function(prop_name){
      var summary = {},
          unique_values = self.get_unique_values(prop_name);

      console.log(unique_values);
      unique_values.forEach(function(u){
        summary[u] = 0;
      });

      for(var i = 0, l = self.data.length; i < l; i++){
        var g = this.data[i][prop_name];
        summary[g] += 1;
      }

      return summary;
    };

    self.summarize_states = function(){
      var states = Object.keys(self.app.evolution.models),
          summary = {};
      for(var i = 0, l = self.data.length; i < l; i++){
        for(var j = 0, m = states.length; j < m; j++){
          var s = states[j];
          summary[s] = summary[s] ? summary[s] + self.data[i][s] : self.data[i][s];
        }
      };
      return summary;
    };


    // Pull the unique values from the base year data to make sure it
    // the same vals are always present.
    self.get_unique_values = function(prop_name){
      if(!self.unique_values)
        self.unique_values = {};

      if(self.unique_values[prop_name])
        return self.unique_values[prop_name];

      var o = {},
          u = [],
          v;

      for(var i = 0, l = self.base_year_data.length; i < l; i++){
        v = self.base_year_data[i][prop_name];
        o[v] = v;
      }

      for(var i in o){
        u.push(o[i]);
      }

      self.unique_values[prop_name] = u;

      return u;
    };


    self.reset = function(){
      self.data = self.base_year_data.map(function(d){
        return clone(d);
      });
    };

    self.reset();

    return self;
  };

  return function(spec){
    return employee_controller(spec);
  }
});