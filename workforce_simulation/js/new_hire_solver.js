define(['lib/cobyla.min'], function(){

  var new_hire_solver = function(spec){

    var self = {
      iprint: 1,
      max_iterations: 150,
      rho_beg: function(target_dist, current_onboard, total_hires){
        return 3 * total_hires / target_dist.length;
      },
      rho_end: function(target_dist, current_onboard, total_hires){
        return 1.0e-5;
      }
    };


    for(var p in spec){
      if(spec.hasOwnProperty(p))
        self[p] = spec[p];
    }


    self.solve = function(target_dist, current_onboard, total_hires){
      var x = self.x_i(total_hires, target_dist),
          n = target_dist.length;
      
      window.FindMinimum(
        self.calcfc(target_dist, current_onboard, total_hires),
        n, // n
        n + 2, // m
        x,  // x_i
        self.rho_beg(target_dist, current_onboard, total_hires), // rho_beg 
        self.rho_end(target_dist, current_onboard, total_hires), // rho_end
        self.iprint, // logging
        self.max_iterations // max calcfc function calls
      );
      
      return x.map(function(d){
        var v = +parseFloat(d).toFixed(2);
        return v == -0 ? 0 : v;
      });
    };


    self.x_i = function(total_hires, target_dist){
      // Randomly distribute the hires across the vector.
      var r = [],
          x = [],
          l = target_dist.length,
          sum;

      for(var i = 0; i < l; i++){
        r.push(Math.random());
      }
      sum = self.reduce_sum(r);

      for(var i = 0; i < l; i++){
        x.push(total_hires * r[i] / sum);
      }
      return x;
    };


    self.calcfc = function(target_dist, current_onboard, total_hires){
      return function(n,m,x,con){
        var current_x = current_onboard.map(function(d,i){ return d + x[i]; }),
            current_x_sum = self.reduce_sum(current_x),
            current_x_dist = current_x.map(function(d){ return d / +current_x_sum; }),
            obj = 0.0,
            x_sum = 0;

        for(var i = 0; i < n; i++){
          obj += Math.abs(target_dist[i] - current_x_dist[i]);
          con[i] = x[i];
          x_sum += x[i];
        }

        con[n] = x_sum - total_hires;
        con[n + 1] = total_hires - x_sum;

        return obj;
      };
    };


    self.reduce_sum = function(a){
      return a.reduce(function(b,c){
        return b + c;
      }, 0);
    };

    self.random_int = function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    return self;
  };

  return function(spec){
    return new_hire_solver(spec);
  };

});