var barrier_model_formula = function(d){
    if(d.x == d.n) { return 0; }

    var can_approximate = ( d.n*d.p >= 5 && d.n*(1-d.p) >= 5 );
    
    if(can_approximate){
      var mu = d.n*d.p,
        sigma_squared = mu*(1-d.p)
        z = (d.x + 0.5 - mu) / Math.sqrt(sigma_squared);
      return 1 - jStat.normal.cdf(z,0,1);
    } else { 
      return 1 - jStat.binomial.cdf(d.x,d.n,d.p);
    }
}