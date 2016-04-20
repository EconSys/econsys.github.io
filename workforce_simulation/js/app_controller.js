define(['app_vue', 'evolutions/ops','employee_controller', 'stats_controller', 'new_hire_solver', 'filters/d3_formatter','components/data_bars', 'components/stacked_data_bars'], function(app_vue, evolution, employee_controller, stats_controller, new_hire_solver){

  var app_controller = function(spec){
    var self = {
      debug: true,

      delay: 200,

      running: false,

      app_vue: null,

      evolution: evolution(),
      
      state_keys: null,

      state_colors: { 
        none: '#d2d2d2', 
        promotion: '#74c476', 
        voluntary: '#fdae6b', 
        involuntary: '#e6550d', 
        retirement: '#fd8d3c'
      },

      state_labels: {
        none: 'None',
        promotion: 'Promotion',
        voluntary: 'Voluntary', 
        involuntary:'Involuntary', 
        retirement: 'Retirement'
      },

      employee_controller: null,
      new_employee_controller: null,
      new_hire_solver: new_hire_solver({ iprint: 0 }),
      
      grade_stats_controller: stats_controller(),
      state_stats_controller: stats_controller(),
      new_hire_stats_controller: stats_controller(),
      
      
      years: [0,1,2,3,4,5],

      goals: ['287','300','325','335','350','375'],
      
      target_distribution: [],
      
      current_year: 0,

      current_grade_summary: {},

      new_hires: [],
      
      grade_means: [],
      state_means: [],
      new_hire_means: [],

      state_summaries: [],
    
    };

    if(self.debug)
      Vue.config.debug = true;

    for(var p in spec){
      if(spec.hasOwnProperty(p))
        self[p] = spec[p];
    }

    self.app_vue = app_vue({ app: self });
    self.state_keys = Object.keys(self.evolution.event_models);

    
    self.init_with_data = function(d){
      self.load_data(d, function(){
        self.employee_controller.model();
        self.update_grade_summary();
        self.update_initial_state();
      })
    };


    self.load_data = function(d, callback){
      d3.csv(d, function(error, rows){
        var numeric = ['age','grade','occ4','tenure','time_in_job','years_retirement_eligible','age_x_tenure'];

        rows = rows.map(function(d){
          numeric.forEach(function(n){ d[n] = +d[n]; });
          d.unemployment_rate = 5.0;
          return d;
        });

        console.log(rows);

        self.base_year_data = rows;
        self.employee_controller = employee_controller({ app: self, base_year_data: rows });
        self.new_employee_controller = employee_controller({ app: self, base_year_data: [] });
        callback();
      });
    };


    self.run = function(){
      if(self.running){
        self.employee_controller.model();
        self.new_employee_controller.model();

        self.update_grade_summary()
        self.update_initial_state();
      }
      self.running = true;

      if(self.current_year == 0)
        self.app_vue.trial += 1;

      var has_previous_year = self.grade_means[self.current_year - 1],
          is_final_year = self.current_year == self.years.length - 1;

      // The there's a previous year to look at, solve for hires
      if(has_previous_year){
        var goal = parseFloat(self.goals[self.current_year]) || 0,
            gap = self.employee_controller.data.length + self.new_employee_controller.data.length- goal;

        self.log('Goal ' + goal + ', gap ' + gap);
        if(goal > 0 && gap < 0){
          self.hire(-gap, self.current_grade_summary);
        }
      }

      // Simulate and update the bar
      if(is_final_year)
        setTimeout(self.next_year, self.delay);
      else
        self.simulate_state(self.next_year, self.delay);

      // If running, continue to the next year or trial
    };



    self.simulate_state = function(callback, delay){
      self.log('Simulating Year ' + self.current_year + ' events...');
      
      self.employee_controller.simulate();
      self.new_employee_controller.simulate();

      var emp_state_summary = self.employee_controller.summarize_states(),
          new_emp_state_summary = self.new_employee_controller.summarize_states(),
          state_summary = self.combine_summaries(emp_state_summary, new_emp_state_summary),
          state_means = self.state_stats_controller.push(self.current_year, state_summary);

      console.log(state_summary);
      
      self.state_summaries.$set(self.current_year, state_summary);

      setTimeout(function(){
        if(!self.running)
          return;

        if(self.current_year >= self.state_means.length){
          self.state_means.push(state_means);
        } else {
          self.state_means.$set(self.current_year, state_means);
        }

        self.update_max('grade_max', state_means);

        callback();
      }, delay);
    };



    self.next_year = function(){
      if(!self.running)
        return;

      console.log('Current year ' + self.current_year);

      self.current_year += 1;

      if(self.current_year == self.years.length){
        console.log('Moving to next trial');
        setTimeout(self.next_trial, self.delay);
      } else {
        console.log('Evolving and moving to next year');
        self.employee_controller.evolve();
        self.new_employee_controller.evolve();
        setTimeout(function(){
          if(self.running)
            self.run();
        }, self.delay);
      }
    };


    self.next_trial =  function(){
      if(!self.running)
        return;

      self.current_year = 0;

      self.employee_controller.reset();
      self.new_employee_controller.reset();
      
      self.update_grade_summary()
      self.update_initial_state();
      
      self.run();
    };


    self.setup_target_distribution = function(grade_summary){
      console.log('setting target_distribution')
      var values = Object.keys(grade_summary).map(function(k){
            return grade_summary[k];
          }),
          sum = values.reduce(function(a,b){ 
            return a + b; }
          , 0.0);
      for(var k in grade_summary){
        self.target_distribution.push( grade_summary[k] / sum );
      }
    };


    self.update_max = function(max_var, means){
      var keys = Object.keys(means),
          vals = keys.map(function(k){
            return means[k];
          }),
          means_max = d3.max(vals);
      if(means_max > self.app_vue[max_var]){
        self.app_vue[max_var] = means_max;
      }
    };


    self.combine_summaries = function(s1, s2){
      var s = {}
      for(var k in s1){
        s[k] = s1[k] + s2[k];
      }
      return s;
    }

    self.update_grade_summary = function(){
      var emp_grade_summary = self.employee_controller.summarize('grade'),
          new_emp_grade_summary = self.new_employee_controller.summarize('grade'),
          grade_summary = self.combine_summaries(emp_grade_summary, new_emp_grade_summary),
          grade_means = self.grade_stats_controller.push(self.current_year, grade_summary);

      // Initialize target dist
      if(Object.keys(self.target_distribution).length == 0){
        self.setup_target_distribution(emp_grade_summary);
        self.app_vue.target_distribution = self.target_distribution;
      }

      // Save the current grade summary for calculating new hires.
      self.current_grade_summary = grade_summary;

      // Push grade means
      if(self.current_year >= self.grade_means.length){
        self.grade_means.push(grade_means);
      } else {
        self.grade_means.$set(self.current_year, grade_means);
      }

      self.update_max('grade_max', grade_means);
    };


    self.update_initial_state = function(){
      console.log('Setting intial state for ' + self.current_year);
      var emp_data = self.employee_controller.data,
          new_emp_data = self.new_employee_controller.data,
          length = emp_data.length + new_emp_data.length;

      if(length > self.app_vue.state_summaries_max){
        self.app_vue.state_summaries_max = length;
      }

      if(self.current_year >= self.state_summaries.length){
        var state_summary = {};
        self.state_keys.forEach(function(s){
          state_summary[s] = 0;
        });
        state_summary.none = length;

        self.state_summaries.push(state_summary);
      }
    };



    self.hire = function(n, current_distribution){
      var l = self.current_year - 1;
      self.log('Optimizing ' + n + ' Hires for Years ' + l + ' and ' +  self.current_year);
      
      var new_hires = [];
      
      if(!n > 0){
        for(var i = 0, l = current_distribution.length; i < l; i++){
          new_hires.push(0);
        }
      } else {
        new_hires = self.new_hire_solver.solve(
          self.target_distribution,
          self.collect_values(current_distribution),
          n
        );
      }

      var new_hires_summary = self.zip_values(
            Object.keys(current_distribution),
            new_hires
          );

      for(var grade in new_hires_summary){
        for(var i = 0, l = new_hires_summary[grade]; i < l; i++){
          var e = self.evolution.hire({ grade: grade })
          self.new_employee_controller.data.push(e);
        }
      }

      var new_hire_means = self.new_hire_stats_controller.push(self.current_year - 1, new_hires_summary)
      self.new_hire_means.$set(self.current_year - 1, new_hire_means);
      self.update_max('new_hires_max',new_hire_means);
    };



    self.collect_values = function(a){
      return Object.keys(a).map(function(k){ 
        return a[k]; 
      })
    };


    self.zip_values = function(keys, values){
      var o = {};
      for(var i = 0, l = keys.length; i < l; i ++){
        o[keys[i]] = values[i];
      }
      return o;
    };


    self.log = function(s){
      self.debug && console.log(s);
      self.app_vue.whats_happening = s;
    };


    return self;
  };


  return function(spec){
    return app_controller(spec);
  };

});