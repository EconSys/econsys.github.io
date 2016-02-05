define(function(){
  var app_vue = function(spec){
    var app = spec.app;

    return new Vue({
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

        grades_max: 0,
        new_hires_max: 0,
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
          if(app.running){
            return;
          } else {
            this.running = true;
            app.run();
          }
        },
        stop: function(event){
          this.whats_happening = '';
          app.running = false;
          this.running = false;
        }
      },
      computed: {
        onboards: function(){
          return this.onboard_stats.map(function(d){
            return d.total;
          });
        },
        new_hires: function(){
          return this.new_hire_stats.map(function(d){
            return d.total;
          });
        },
        // gaps: function(){
        //   var gaps = [0],
        //       goal,
        //       total;
        //   for(var i = 1, l = this.onboard_stats.length; i < l; i++){
        //     goal = parseFloat(this.goals[i]) || 0;
        //     total = (this.onboard_stats[i].total || 0) + (this.new_hire_stats[i - 1].total || 0);
        //     gaps.push(total - goal);
        //   } 

        //   return gaps;
        // },
        grade_labels: function(){
          return this.grade_means[0] ? Object.keys(this.grade_means[0]) : [];
        },
        state_labels: function(){
          return this.state_means[0] ? Object.keys(this.state_means[0]) : [];
        }
      }
    });

  };
 
  return function(spec){
    return app_vue(spec);
  };

});