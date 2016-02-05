define(function() {
  var stats_controller = function(spec){

    var self = {
      simulations: []
    };

    for(var p in spec){
      if(spec.hasOwnProperty(p))
        self[p] = spec[p];
    }

    self.clear = function(){
      self.simulations = [];
      for(var i = 0; i < 6; i++){
        self.simulations.push({ total: null, categories: {} });
      }
    };

    self.push = function(current_year, histogram){
      var sim = self.simulations[current_year],
          categories = Object.keys(histogram),
          new_category_means = {},
          total = 0;

      categories.forEach(function(c){
        
        if(!sim.categories[c]){
          sim.categories[c] = { trials: [], mean: null };
        }
 
        var category_stats = sim.categories[c];

        category_stats.trials.push( histogram[c] );
        category_stats.mean = d3.mean(category_stats.trials);

        new_category_means[c] = category_stats.mean;
        total += category_stats.mean;
      });

      sim.total = total;

      return new_category_means;
    };

    self.clear();

    return self;
  };

  return function(spec){
    return stats_controller(spec);
  }
});