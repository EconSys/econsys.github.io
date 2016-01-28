define(function() {

  var stats_controller = {

    init: function(){
      this.simulations = [];
      for(var i = 0; i < 6; i++){
        this.simulations.push({ total: null });
      }

      return this;
    },

    simulations: null,

    push: function(current_year, stat_name, histogram){
      var sim = this.simulations[current_year],
          categories = Object.keys(histogram),
          new_category_means = {},
          total = 0;

      if(!sim[stat_name])
        sim[stat_name] = {};

      categories.forEach(function(c){
        
        if(!sim[stat_name][c]){
          sim[stat_name][c] = { trials: [], mean: null };
        }
 
        var category_stats = sim[stat_name][c];

        category_stats.trials.push( histogram[c] );
        category_stats.mean = d3.mean(category_stats.trials);

        new_category_means[c] = category_stats.mean;
        total += category_stats.mean;
      });

      sim.total = total;

      return new_category_means;
    }

  }.init()

  return function(app){
    return stats_controller;
  }

});