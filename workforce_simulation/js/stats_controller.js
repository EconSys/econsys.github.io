define(function() {
  var stats_controller = function(spec){

    var self = {
      simulations: []
    };

    for(var p in spec){
      if(spec.hasOwnProperty(p))
        self[p] = spec[p];
    }

    for(var i = 0; i < 6; i++){
      self.simulations.push({ total: null });
    }


    self.push = function(current_year, stat_name, histogram){
      var sim = self.simulations[current_year],
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
    };

    return self;
  };

  return function(spec){
    return stats_controller(spec);
  }
});