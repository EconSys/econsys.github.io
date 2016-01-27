define(function(){
  return function(o) {
    if (null == o || 'object' != typeof o) return o;
    var copy = o.constructor();
    for (var attr in o) {
        if (o.hasOwnProperty(attr)) copy[attr] = o[attr];
    }
    return copy;
  }
})