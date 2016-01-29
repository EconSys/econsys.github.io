define(['evolution','employee_controller', 'stats_controller', 'grade_controller', 'state_controller', 'simulation_controller'], function(evolution, employee_controller, stats_controller, grade_controller, state_controller, simulation_controller){

  var app = {

    init: function(){
      this.evolution = evolution(this);

      this.states = Object.keys(this.evolution.models);
      this.stats_controller = stats_controller(this);

      this.grade_controller = grade_controller(this);
      this.state_controller = state_controller(this);

      this.simulation_controller = simulation_controller(this);

      this.simulations = [];
      this.years = [0,1,2,3,4,5];
      this.goals = ['','','','',''];

      return this;
    },

    app_vue : null,

    current_year: 0,

    svg: null,

    base_year_data: null, 

    data: null, 

    simulations: [],

    years: [],

    goals: [],

    state_colors: { 
      none: '#d2d2d2', 
      promotion: '#74c476', 
      expired_appt: '#fdae6b', 
      attrite:'#fd8d3c', 
      quit: '#e6550d'
    },

    state_labels: {
      none: 'None',
      promotion: 'Promotion',
      expired_appt: 'Expired Appt',
      attrite: 'Attrite',
      quit: 'Quit'
    },


    model_and_draw: function(){
      this.app_vue.whats_happening = 'Updating Year ' + this.current_year + ' grade distribution...'

      var data = this.employee_controller.model(),
          grade_summary = this.employee_controller.summarize('grade'),
          grade_means = this.stats_controller.push(this.current_year, 'grade', grade_summary),
          graph_data = Object.keys(grade_means).map(function(k){
            return { grade: k, count: grade_means[k] };
          });

      this.grade_controller.draw(graph_data);
      this.svg = this.simulation_controller.draw(data);
    },

    simulate: function(){
      if(this.current_year == 0)
        this.app_vue.trial += 1;

      this.app_vue.whats_happening = 'Simulating Year ' + this.current_year + ' events...'

      var data = this.employee_controller.simulate(),
          self = this;

      this.simulation_controller.update(this.svg, data, function(){
        if(!self.app_vue.running)
          return;

        self.app_vue.whats_happening = 'Summarizing Year ' + self.current_year + ' events...'

        var state_summary = self.employee_controller.summarize_states(),
            state_means = self.stats_controller.push(self.current_year, 'state', state_summary);
            graph_data =  Object.keys(state_means).map(function(k){
              return { state: k, count: state_means[k] };
            });

        self.state_controller.draw(graph_data);

        if(self.current_year < 5){
          if(!self.app_vue.running)
            return;
          
          self.current_year += 1;
          
          self.employee_controller.evolve();
          
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

      });

    },

    next_trial: function(){
      app.reset();
      app.model_and_draw();
      app.simulate();
    },

    push_stats: function(stat, data){
      var s = current_simulation();

      data.forEach(function(d){
        s[stat].trials.push(d.count);
        s[stat].mean = d3.mean(s[stat].trials);
        s[stat].total = d3.sum(s[stat].trials);
      });
    },

    reset: function(){
      var self = this;

      this.current_year = 0;
      this.employee_controller.reset();
      this.simulation_controller.clear();
    },

    run: function(){
      var self = this;
      d3.csv('./current_year_data.csv?123', function(error, rows){
        var numeric = ['age','aptyrs','empid','grade','retirement_eligible_year','run_year','salary','sex'];

        rows = rows.map(function(d){
          numeric.forEach(function(n){ d[n] = +d[n]; });
          return d;
        });

        self.employee_controller = employee_controller(self, rows);
        self.model_and_draw();
      });
    }


  }.init();

  Vue.filter('isnan', function(n){
    return isNaN(n) ? '' : n;
  });

  Vue.filter('d3-formatter', function(n, format){
    return d3.format(format)(n);
  });

  app.app_vue = new Vue({
    el: '#app',
    data: {
      running: false,
      run_timeout: null,
      years: app.years,
      goals: app.goals,
      simulations: app.stats_controller.simulations,
      trial: 0,
      employee_count: 0,
      whats_happening: ''
    },
    methods: {
      run: function(event){
        this.running = true;
        app.simulate();
      },
      pause: function(event){
        this.whats_happening = '';
        clearTimeout(this.run_timeout)
        this.running = false;
      }
    },
    computed: {
      gaps: function(){
        var sims = this.simulations.slice(1);
        return this.goals.map(function(g,i){
          return sims[i].total - (parseFloat(g) || 0);
        });
      }
    }
  });

  Vue.config.debug = true;

  return app;
});