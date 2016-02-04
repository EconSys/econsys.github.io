define(function(){

  Vue.filter('d3-formatter', {

    read: function(val, format){
      return d3.format(format)(val);
    },

    write: function(val, oldVal, format){
      var number = +val.replace(/[^\d.]/g, '');
      return isNaN(number) ? 0 :  d3.format(format)(number);
    }

  });
  
});