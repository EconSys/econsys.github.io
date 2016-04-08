define(['evolution','employee_controller', 'stats_controller', 'new_hire_solver', 'filters/d3_formatter','components/data_bars', 'components/stacked_data_bars'], function(evolution, employee_controller, stats_controller, new_hire_solver){

  var app = {

    init: function(){

      this.evolution = evolution();

      this.employee_controller = null; //Intiailized when data is loaded;
      this.new_employee_controller = employee_controller({ app: this, base_year_data: [] });

      this.state_keys = Object.keys(this.evolution.models);

      this.grade_stats_controller = stats_controller();
      this.state_stats_controller = stats_controller();
      this.new_hire_stats_controller = stats_controller();
      this.new_hire_solver = new_hire_solver({ iprint: 0 });

      this.simulations = [];
      this.years = [0,1,2,3,4,5];

      // this.goals = ['','','','','',''];
      this.goals = ['287','300','325','335','350','375'];
      // this.goals = ['','','','','',''];

      this.target_distribution = {};
      this.current_grade_summary = {};

      this.new_hires = [];
      
      this.grade_means = [];
      this.state_means = [];
      this.new_hire_means = [];

      this.state_summaries = [];

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
      // There is way too much shit happening here.
      this.app_vue.whats_happening = 'Updating Year ' + this.current_year + ' grade distribution...'

      var data = this.employee_controller.model(),
          grade_summary = this.employee_controller.summarize('grade'),
          grade_means = this.grade_stats_controller.push(this.current_year, grade_summary);

      // Initialize target dist
      if(Object.keys(this.target_distribution).length == 0){
        this.setup_target_distribution(grade_summary);
      }

      // Save the current grade summary for calculating new hires.
      this.current_grade_summary = grade_summary;

      // Push grade means
      if(this.current_year >= this.grade_means.length){
        this.grade_means.push(grade_means);
      } else {
        this.grade_means.$set(this.current_year, grade_means);
      }

      this.update_max(grade_means);

      if(data.length > this.app_vue.state_summaries_max){
        this.app_vue.state_summaries_max = data.length;
      }

      if(this.current_year >= this.state_summaries.length){
        var state_summary = {};
        this.state_keys.forEach(function(s){
          state_summary[s] = 0;
        });
        state_summary.none = data.length;

        this.state_summaries.push(state_summary);
      }

    },


    setup_target_distribution: function(grade_summary){
      var values = Object.keys(grade_summary).map(function(k){
            return grade_summary[k];
          }),
          sum = values.reduce(function(a,b){ 
            return a + b; }
          , 0.0),
          t = this.target_distribution;
      for(var k in grade_summary){
        t[k] = grade_summary[k] / sum;
      }
      return t;
    },

    update_max: function(means){
      var keys = Object.keys(means),
          vals = keys.map(function(k){
            return means[k];
          }),
          means_max = d3.max(vals);
      if(means_max > this.app_vue.max){
        this.app_vue.max = means_max;
      }
    },


    hire: function(n, current_distribution){
      var l = this.current_year - 1;
      console.log('Optimizing + ' + n + ' + Hires for Years ' + l + ' and ' +  this.current_year);

      this.app_vue.whats_happening = 'Optimizing + ' + n + ' + Hires for Year ' + this.current_year + '...'
      
      var new_hires = [];
      
      if(!n > 0){
        // console.log('No gaps.');
        for(var i = 0, l = current_distribution.length; i < l; i++){
          new_hires.push(0);
        }
      } else {
        // console.log('Optimizing hires.');
        new_hires = this.new_hire_solver.solve(
          this.collect_values(this.target_distribution),
          this.collect_values(current_distribution),
          n
        );
      }

      var new_hires_summary = this.zip_values(
            Object.keys(current_distribution),
            new_hires
          );

      for(var grade in new_hires_summary){
        for(var i = 0, l = new_hires_summary[grade]; i < l; i++){
          var e = this.evolution.hire({ grade: grade })
          this.new_employee_controller.data.push(e);
        }
      }

      var new_hire_means = this.new_hire_stats_controller.push(this.current_year - 1, new_hires_summary)
      console.log(new_hire_means);
      if(this.current_year  >= this.new_hire_means.length){
        this.new_hire_means.push(new_hire_means);
      } else {
        this.new_hire_means.$set(this.current_year, new_hire_means);
      }


      // this.update_max(new_hire_means);
    },

    collect_values: function(a){
      return Object.keys(a).map(function(k){ 
        return a[k]; 
      })
    },


    zip_values: function(keys, values){
      var o = {};
      for(var i = 0, l = keys.length; i < l; i ++){
        o[keys[i]] = values[i];
      }
      return o;
    },

    simulate: function(){
      console.log('Simulating current year ' + this.current_year);

      if(this.current_year == 0)
        this.app_vue.trial += 1;
      
      // Draw the starting bar
      // Draw the grade distribution
      // The there's a previous year to look at, solve for hires
      // Simulate and update the bar
      // Draw the states
      // Move to next
    
     
      this.app_vue.whats_happening = 'Simulating Year ' + this.current_year + ' events...'

      var data = this.employee_controller.simulate(),
          self = this;

      if(!self.app_vue.running)
        return;

      self.app_vue.whats_happening = 'Summarizing Year ' + self.current_year + ' events...'

      var state_summary = self.employee_controller.summarize_states(),
          state_means = self.state_stats_controller.push(self.current_year, state_summary);

      
      this.state_summaries.$set(this.current_year, state_summary);

      setTimeout(function(){

        if(self.current_year >= self.state_means.length){
          self.state_means.push(state_means);
        } else {
          self.state_means.$set(self.current_year, state_means);
        }

        self.update_max(state_means);

        if(self.current_year < 5){
          if(!self.app_vue.running)
            return;
          
          self.current_year += 1;

         // if(self.current_year > 0){
          var goal = parseFloat(self.goals[self.current_year]) || 0,
              gap = self.employee_controller.data.length - goal;

          console.log('Goal ' + goal + ', gap ' + gap);
          if(goal > 0 && gap < 0){
            self.hire(-gap, self.current_grade_summary);
          } 
        // }

          
          self.employee_controller.evolve();
          
          self.model_and_draw();

          setTimeout(function(){
            if(!self.app_vue.running)
              return;
            if(self.current_year < 5) {
              self.simulate();
            } else {
              setTimeout(self.next_trial, 3000);
            }
          }, 3000);
        }

      }, 3000);

    },

    next_trial: function(){
      app.reset();
      app.model_and_draw();
      app.simulate();
    },

    reset: function(){
      var self = this;

      this.current_year = 0;
      this.employee_controller.reset();
      this.new_employee_controller.reset();
    },

    run: function(){
      var self = this;
      d3.csv('./current_year_data.csv?123', function(error, rows){
        var numeric = ['age','aptyrs','empid','grade','retirement_eligible_year','run_year','salary','sex'];

        rows = rows.map(function(d){
          numeric.forEach(function(n){ d[n] = +d[n]; });
          return d;
        });

        self.employee_controller = employee_controller({ app: self, base_year_data: rows });
        self.model_and_draw();
      });
    }


  }.init();

  Vue.config.debug = true;

 


  app.app_vue = new Vue({
    el: '#app',
    data: {
      running: false,
      run_timeout: null,
      years: app.years,

      goals: app.goals,

      target_distribution: app.target_distribution,
      
      grade_means: app.grade_means,
      state_means: app.state_means,
      new_hire_means: app.new_hire_means,
      state_summaries: app.state_summaries,

      state_summaries_max: 0,

      max: 0,
      min: 0,

      new_hires: app.new_hires,
      onboard_stats: app.grade_stats_controller.simulations,
      new_hire_stats: app.new_hire_stats_controller.simulations,
      trial: 0,
      employee_count: 0,
      whats_happening: '',
      state_colors: app.state_colors,

    },
    methods: {
      run: function(event){
        this.running = true;
        app.current_year = 0;
        // if(app.grade_stats_controller.simulations[1].total){
        //   this.trial = 0;

        //   app.employee_controller.reset();

        //   app.grade_stats_controller.clear();
          
          
        //   this.simulations = app.grade_stats_controller.simulations;
        //   app.model_and_draw();
        // }
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
        var self = this;
        return this.goals.map(function(g,i){
          var total = (self.onboard_stats[i].total || 0) + (self.new_hire_stats[i].total || 0);
          return total - (parseFloat(g) || 0);
        });
      },
      grade_labels: function(){
        return this.grade_means[0] ? Object.keys(this.grade_means[0]) : [];
      },
      state_labels: function(){
        return this.state_means[0] ? Object.keys(this.state_means[0]) : [];
      }
    }
  });

  window.a = app;
  

  return app;
});