state = 'getting_bigger'

interval = setInterval(
  function(){
    d3.select('#key-driver-graph')
      .selectAll('circle')
      .attr('r', 
        function(d){ 
          var r = +d3.select(this).attr('r');
          if(r < 10 && state == 'getting_bigger'){
            r = r + 1;
          }
          else if(r > 1 && state == 'getting_smaller'){
            r = r - 1;
          }
          else if (r == 10){
            state == 'getting_smaller'
            r = r - 1;
          }
          else if (r == 1){
            state = 'getting_bigger'
            r = r + 1;
          }
          console.log('state=' + state);
          console.log('r=' + r);
          return r;
        });

  }, 
50)

clearInterval(interval)