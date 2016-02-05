define(function(){

  var clean_string = function(val, format){
    val = +val.replace(/[^\d.]/g, '');
    if(format.indexOf('%') >= 0){
      val = val / 100.0;
    }
    return val;
  };

  Vue.filter('d3-formatter', {

    read: function(val, format){
      val = typeof val === 'string' ? clean_string(val, format) : val;
      return d3.format(format)(val);  
    },

    write: function(val, oldVal, format){
      val = typeof val === 'string' ? clean_string(val, format) : val;
      if(isNaN(val))
        return 0;
      else if(format.indexOf('%') >= 0)
        return val;
      else
        return d3.format(format)(val);
    }

  });
  
});