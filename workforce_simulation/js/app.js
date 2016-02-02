define(['evolution','employee_controller', 'stats_controller', 'grade_controller', 'state_controller', 'simulation_controller','filters/d3_formatter','components/data_bars'], function(evolution, employee_controller, stats_controller, grade_controller, state_controller, simulation_controller){

  var app = {

    init: function(){
      this.evolution = evolution();

      this.state_keys = Object.keys(this.evolution.models);
      this.stats_controller = stats_controller();

      // this.grade_controller = grade_controller(this);
      // this.state_controller = state_controller(this);



      this.simulation_controller = simulation_controller({ app: this, element: '.simulation' });
      
      this.new_employee_controller = employee_controller({ app: this, base_year_data: [] });

      this.simulations = [];
      this.years = [0,1,2,3,4,5];
      this.goals = ['','','','',''];
      this.new_hires = [];
      
      this.grade_means = [];
      this.state_means = [];

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
          grade_means = this.stats_controller.push(this.current_year, 'grade', grade_summary);
          // graph_data = Object.keys(grade_means).map(function(k){
          //   return { grade: k, count: grade_means[k] };
          // });

      if(this.current_year >= this.grade_means.length){
        this.grade_means.push(grade_means);
      } else {
        this.grade_means.$set(this.current_year, grade_means);
      }

      this.update_max(grade_means);


      if(this.new_hires.length == 0){
        this.setup_new_hires(grade_summary);
      }

      // this.grade_controller.draw(graph_data);
      this.svg = this.simulation_controller.draw(data);
    },

    setup_new_hires: function(grade_summary){
      var new_hires = [];
      for(var i = 1, l = this.years.length; i < l; i++){
        var y_g = {};
        for(var g in grade_summary){
          y_g[g] = 0;
        }
        new_hires.push(y_g);
      }
      app.app_vue.new_hires = new_hires;
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
            // graph_data =  Object.keys(state_means).map(function(k){
            //   return { state: k, count: state_means[k] };
            // });

        if(self.current_year >= self.state_means.length){
          self.state_means.push(state_means);
        } else {
          self.state_means.$set(self.current_year, state_means);
        }

        self.update_max(state_means);

        // self.state_controller.draw(graph_data);

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
      
      grade_means: app.grade_means,
      state_means: app.state_means,
      max: 0,
      min: 0,

      new_hires: app.new_hires,
      simulations: app.stats_controller.simulations,
      trial: 0,
      employee_count: 0,
      whats_happening: '',
      state_colors: app.state_colors
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
      },
      grade_labels: function(){
        return this.grade_means[0] ? Object.keys(this.grade_means[0]) : [];
      },
      state_labels: function(){
        return this.state_means[0] ? Object.keys(this.state_means[0]) : [];
      }
      // scale: function(){
      //   return d3.scale.linear().domain([this.min,this.max]).range([0,100])
      // },
      // bar_style: function(){
      //   var v = parseFloat(this),
      //       w = Math.abs(this.scale(v) - this.scale(0)),
      //       l = v >= 0 ? this.scale(0) : this.scale(0) - w;
      //   return { 'width': w + '%', 'margin-left': l + '%' }
      // }
    }
  });

  window.a = app;
  

  return app;
});