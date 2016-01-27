define(['helpers/clone','model_set', 'logistic_modeler', 'logistic_simulator', 'grade_controller', 'state_controller', 'simulation_controller'], function(clone, model_set, logistic_modeler, logistic_simulator, grade_controller, state_controller, simulation_controller){

  var app = {

    init: function(){
      this.states = Object.keys(this.model_set);
      this.grade_controller = grade_controller(this);
      this.state_controller = state_controller(this);
      this.simulation_controller = simulation_controller(this);
      return this;
    },

    app_vue : null,

    current_year: 0,

    base_year: 2012,

    svg: null,

    base_year_data: null, 

    data: null, 

    trials: [],

    model_set: model_set,

    logistic_modeler: logistic_modeler,

    logistic_simulator: logistic_simulator,

    state_colors: { 
      none: '#d9d9d9', 
      promotion: '#74c476', 
      expired_appt: '#fdae6b', 
      attrite:'#fd8d3c', 
      quit: '#e6550d'
    },

    evolve: function(data){
      var self = this;
      return data.filter(function(d){
        return d.none == 1 || d.promotion == 1;
      }).map(function(d){
        d.age += 1;
        d.aptyrs += 1;
        d.run_year += 1;
        
        return d.promotion == 1 ? self.promote(d) : d;
      });
    },

    promote: function(d){
      var grade_progression = [0,5,7,9,10,11,12,13,14,15],
        new_g = grade_progression.indexOf(d.grade) + 1;
    
      if(new_g < grade_progression.length)
        d.grade = grade_progression[new_g];

      return d;
    },

    model_and_draw: function(){
      var self = this;
      this.data = this.data.map(function(d){
        var p_s = self.logistic_modeler.model(self.model_set, d);
        for(s in p_s){
          d[s] = p_s[s];
        }
        return d;
      })

      var grade_summary = self.grade_controller.summarize(self.data);
      self.push_stats('grade', grade_summary);

      var grade_trials = self.app_vue.trials[self.current_year].grade,
          grade_stats =  Object.keys(grade_trials).map(function(k){
            return { grade: k, count: d3.mean(grade_trials[k]) };
          });
          
      self.grade_controller.draw(grade_stats);
      
      this.svg = this.simulation_controller.draw(this.data);
    },

    simulate: function(){
      var self = this;

      if(this.current_year == 0)
        this.app_vue.trial += 1;

      this.data = this.data.map(function(d){
        var p_s = self.logistic_simulator.simulate(self.model_set, d).p_s;
        for(s in p_s){
          d[s] = p_s[s];
        }
        return d;
      });

      this.simulation_controller.update(this.svg, this.data);

      this.app_vue.run_timeout = setTimeout(function(){

        var state_summary = self.state_controller.summarize(self.data);
        self.push_stats('state', state_summary);

        var state_trials = self.app_vue.trials[self.current_year].state,
            state_stats =  Object.keys(state_trials).map(function(k){
              return { state: k, count: d3.mean(state_trials[k]) };
            });

        self.state_controller.draw(state_stats);

        if(self.current_year < 5){
          if(!self.app_vue.running)
            return;
          
          self.current_year += 1;
          
          self.data = self.evolve(self.data);
          
          self.model_and_draw();
          setTimeout(function(){
            if(!self.app_vue.running)
              return;
            if(self.current_year < 5) {
              self.simulate();
            } else {
              setTimeout(self.next_trial, 1000);
            }
          }, 500);
        }
        
        
      }, this.data.length * 6);
    },

    next_trial: function(){
      app.reset();
      app.model_and_draw();
      app.simulate();
    },

    push_stats: function(stat, data){
      if(this.current_year >= this.app_vue.trials.length)
        this.app_vue.trials.push({});

      var t = this.app_vue.trials[this.current_year];

      if(!t[stat])
        t[stat] = {};

      data.forEach(function(d){
        if(t[stat][d[stat]]){
          t[stat][d[stat]].push(d.count);
        } else {
          t[stat][d[stat]] = [d.count];
        }
      });
    },

    reset: function(){
      var self = this;

      this.current_year = 0;
      this.data = this.base_year_data.map(function(d){
        return clone(d);
      });
      this.simulation_controller.clear();
    },

    run: function(){
      var self = this;
      d3.csv('./current_year_data.csv', function(error, rows){
        var numeric = ['age','aptyrs','empid','grade','retirement_eligible_year','run_year','salary','sex'];

        self.base_year_data = rows.map(function(d){
          numeric.forEach(function(n){ d[n] = +d[n]; });
          return d;
        });

        self.data = self.base_year_data.map(function(d){
          return clone(d);
        });

        self.model_and_draw();
      });
    }


  }.init();

  app.app_vue = new Vue({
    el: '#app',
    data: {
      running: false,
      run_timeout: null,
      years: [],
      trials: [],
      trial: 0
    },
    methods: {
      run: function(event){
        this.running = true;
        app.simulate();
      },
      stop: function(event){
        clearTimeout(this.run_timeout)
        this.running = false;
      }
    },
    created: function(){
      var years = [];
      for(var i = 0; i < 6; i++){
        years.push(app.base_year + i);
      }
      this.years = years;
    }
  });

  window.app = app;

  return app;
});