define(function(){

  Vue.filter('d3-formatter', function(n, format){
    return d3.format(format)(n);
  });
  
});