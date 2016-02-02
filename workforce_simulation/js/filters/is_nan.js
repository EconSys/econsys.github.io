define(function(){

  Vue.filter('is-nan', function(n){
      return isNaN(n) ? '' : n;
    });
  
});