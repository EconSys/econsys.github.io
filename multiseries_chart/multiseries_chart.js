(function () {

  var colors = ['#0099c6','#dd4477','#66aa00','#b82e2e','#316395'];

  var draw = function(series){
    var margin = { left: 150, top: 100, bottom: 50, right: 150 },
        svg_width = 960,
        svg_height = 500,
        chart_height = svg_height - margin.top - margin.bottom,
        chart_width = svg_width - margin.left - margin.right;

    var svg = d3.select('svg#chart')
          .attr({ height: svg_height, width: svg_width })
          .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'),
        axes_layer = svg.append('g')
          .attr('class','axes-layer');

    var x_scale = d3.scale.ordinal()
          .domain(series[0].data.map(function(d){
            return d.fy;
          }))
          .rangePoints([0, chart_width]),
        x_axis = d3.svg.axis()
          .scale(x_scale)
          .orient('bottom');

    var x = axes_layer.append('g')
      .attr('class','x axis')
      .attr('transform', 'translate(0,' + chart_height + ')')
      .call(x_axis);

    var y_scales = [];

    var series_maxes = series.map(function(s,i){
      return d3.max(s.data.map(function(d){
        return d.value;
      }));
    });

    // var y_max = d3.max(s.data.map(function(d){
    //     return d.value;
    //   }));
      
    var y_scale = d3.scale.linear()
          .domain([0,d3.max(series_maxes)])
          .range([chart_height,0]),
        y_axis = d3.svg.axis()
          .scale(y_scale)
          .orient('left');

    var y = axes_layer.append('g')
      .attr('class','y axis')
      .call(y_axis);


    series.forEach(function(s,i){
      // var y_max = d3.max(s.data.map(function(d){
      //   return d.value;
      // }));
      
      // var y_scale = d3.scale.linear()
      //       .domain([0,y_max])
      //       .range([chart_height,0]),
      //     y_axis = d3.svg.axis()
      //       .scale(y_scale)
      //       .orient('left');

      // var y = axes_layer.append('g')
      //   .attr('class','y axis y-' + i)
      //   .style('opacity', 0)
      //   .call(y_axis);
      
      // y_scales.push(y_scale);

      var path_generator = d3.svg.line()
          .x(function(d) {
            console.log()
            return x_scale(d.fy); 
          })
          .y(function(d) { 
            return y_scale(d.value); 
          })
          .interpolate('linear');

      svg.append('path')
        .attr('class', 'series s-' + i)
        .attr('d', path_generator(s.data))
        .style({
          'fill': 'none',
          'stroke-width': '3',
          'stroke': colors[i]
        })
        .append('title')
          .text(s.title);
        

      svg.selectAll('circle.s-' + i)
          .data(s.data)
        .enter().append('circle')
          .attr('class','series-points s-' + i)
          .attr('cx', function(d){
            return x_scale(d.fy);
          })
          .attr('cy', function(d){
            return y_scale(d.value);
          })
          .attr('r',5) 
          .style({
            'fill': 'white',
            'stroke-width': '2',
            'stroke': colors[i]
          });


      d3.selectAll('path.s-' + i + ', circle.s-' + i).on('mouseenter', function(){
          d3.selectAll('.series, .series-points').transition()
            .style('opacity',function () {
              return d3.select(this).classed('s-' + i) ? 1.0 : 0.05;
            });

          // y.transition()
          //   .style('opacity', 1);
        })
        .on('mouseleave', function(){
          d3.selectAll('.series, .series-points').transition()
            .style('opacity', 1);
          // y.transition()
          //   .style('opacity', 0);
        });

    });
  }

  d3.csv('./v04_646.csv',function(error, data){
    var chart_data = [];
    data.forEach(function(d,i){
      if(i >= 5)
        return;

      var series = { title: d.category, data: []};

      Object.keys(d).forEach(function(k,i){
        if(k.indexOf('fy') == 0){
          series.data.push({ fy: k, value: +d[k] });
        }
      });

      series.data = series.data.slice(0,6);

      chart_data.push(series);
    });

    console.log(chart_data);

    draw(chart_data);

  })
})();