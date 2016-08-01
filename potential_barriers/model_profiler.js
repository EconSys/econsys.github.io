(function(){

  var models = {
    barrier:  {
      title: 'Potential Barrier',
      color: 'red',
      equation: barrier_model_formula,
      y: { type: 'continuous', min: 0, max: 1, title: 'Predicted Barrier Likelihood', format: d3.format('.1%') },
      variables: {
        x: { type: 'continuous', min: 0, max: 100, mean: 18, title: 'Target Group Employees', increment: 1, format: d3.format('0f') },
        n: { type: 'continuous', min: 0, max: 2222, mean: 2222, title: 'Total Employees', increment: 100, format: d3.format('0f') },
        p: { type: 'continuous', min: 0, max: 0.1, mean: 0.0108, title: 'Reference Population Pariticipation', increment: 0.005, format: d3.format('.2%') }
      }
    }
  };

  var svg;


  var draw = function(model){
    var variables = Object.keys(model.variables),
        current_means;


    var margin = { left: 150, top: 100, bottom: 50, right: 50 },
        graph_height = 232,
        svg_height = Math.ceil(variables.length / 3) * (graph_height + 50) + margin.top + 150,
        svg_width = 960;

    var percent_format = d3.format('0%');


    svg = d3.select('svg#model-profiler')
          .attr({ height: svg_height, width: svg_width }),
        svg_parent = d3.select('div#model-profiler-parent');

    var y = d3.scale.linear()
          .domain([model.y.min, model.y.max])
          .range([graph_height, 0]),
        y_axis = d3.svg.axis()
          .scale(y).orient('left')
          .tickFormat(percent_format)
          .tickValues([0,.2,.4,.6,.8,1]);

    var title = svg.append('text')
      .attr('class','title')
      .attr('x', 200)
      .attr('y', 60)
      .attr('dy', '1em')
      .attr('text-anchor','middle')

    var updateTitle = function(y){
      title.text(model.y.title + ': ' + model.y.format(y));
    }


    var collect_means = function(){
      var t = {};
      variables.map(function(v){
        var mean = model.variables[v].mean;
        t[v] = mean ? mean : model.variables[v].mode;
      })
      return t;
    };


    var updateInputs = function(current_means, changed_v){
      var v_i = model.variables[changed_v],
          value = current_means[changed_v];
      if(v_i.type == 'continuous'){
        value = v_i.format(value);
      }
      d3.select('#input-' + changed_v)[0][0].value = value;
    };


    var updateCharts = function(current_means, changed_v){
      var predicted_p = model.equation(current_means),
          predicted_y = y(predicted_p);

      variables.forEach(function(v){
        var v_i = model.variables[v],
            plot_data = get_plot_data(current_means, v),
            plot = d3.select('.' + v);
        plot.selectAll('path.response-curve')
          .attr('d', v_i.path_generator(plot_data));

        plot.selectAll('circle')
          .attr('cx', v_i.x(current_means[v]))
          .attr('cy', predicted_y);
      });

      d3.selectAll('line.predicted-p')
        .attr('y1', predicted_y)
        .attr('y2', predicted_y);

      d3.selectAll('text.predicted-p')
        .text(model.y.format(predicted_p))
        .attr('y', predicted_y);
    };


    var updateContinuousMean = function(x_value){
      if(v_i.type == 'continuous'){
        var x_value = v_i.x.invert((cx += d3.event.dx));
        current_means[v] = x_value;
        current_means[v] = current_means[v] < domain[0] ? domain[0] : current_means[v];
        current_means[v] = current_means[v] > domain[1] ? domain[1] : current_means[v];
      } else {
        current_means[v] = domain[d3.bisect(range, d3.event.x) - 1];
      }
    }




    var get_plot_data = function(current_means, v){
      var t = {};
     
      Object.keys(current_means).forEach(function(k){
        t[k] = current_means[k];
      });

      var v_i = model.variables[v],
          domain = v_i.x.domain(),
          plot_data = [];

      if(v_i.type == 'continuous'){
        var inc = domain[0];
        while(inc < domain[1]){
          t[v] = inc;
          plot_data.push({ x: t[v], y: model.equation(t) });
          inc += v_i.increment;
        }
      } else {
        domain.forEach(function(d){
          t[v] = d;
          plot_data.push({ x: t[v], y: model.equation(t) });
        });
      }

      return plot_data;
    };

    current_means = collect_means();
      
    variables.forEach(function(v,i){
      var v_i = model.variables[v];

      var mod = i%3,
          left = mod * (graph_height + 50) + margin.left,
          top = Math.floor(i/3) * (graph_height + margin.top) + margin.top;

      var g = svg.append('g')
        .attr('class', v)
        .attr('transform','translate(' + left + ',' + top + ')');


      var background_layer = g.append('g')
            .attr('class','background-layer'),
          axes_layer = g.append('g')
            .attr('class','axes-layer'),
          foreground_layer = g.append('g')
            .attr('class','foreground-layer');


      if(mod % 3 === 0){
        axes_layer.append('g')
          .attr('class', 'y axis')
          .call(y_axis)
            .append('text')
              .attr('text-anchor','middle')
              .text(model.y.title)
              .attr('transform','rotate(-90) translate(-110,-130)')
              .style('fill','#888')
              .style('font-size','14px');
      }


      if(v_i.type == 'continuous'){
        v_i.x = d3.scale.linear()
          .domain([v_i.min,v_i.max])
          .range([0, graph_height]);

        v_i.x_axis = d3.svg.axis()
          .scale(v_i.x)
          .orient('bottom')
          .ticks(6)
          .tickFormat(v_i.format);

      } else if(['ordinal','nominal'].indexOf(v_i.type) >= 0){
        v_i.x = d3.scale.ordinal()
          .domain(v_i.values)
          .rangePoints([0, graph_height]);
        
         v_i.x_axis = d3.svg.axis()
          .scale(v_i.x)
          .orient('bottom')
          .outerTickSize(0);

        if(v_i.values.length > 6){
           v_i.x_axis.tickValues([]);
        } else if(v_i.values.length > 6){
          x_axis.tickValues(v_i.x.domain().filter(function(d,i){
            return !(i % Math.floor(v_i.values.length / 6))
          }));
        }
      }


      var g_x_axis = axes_layer.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + graph_height + ')')
          .call(v_i.x_axis)
        .append('text')
        .text(v_i.title)
          .attr({ x: graph_height / 2 })
          .attr('dy', 85)
          .attr('text-anchor','middle')
          .style({ 'fill': 'darkgray', 'font-size': '14px' });

      var g_input = svg_parent.append('div')
        .attr('class','profiler-input')
        .style('position','absolute')
        .style('top', top  + graph_height + 30 + 'px')
        .style('left', left + 50 + 'px')

      if(v_i.type == 'continuous'){
        g_input.append('input')
          .attr('type','text')
          .attr('value', v_i.format(v_i.mean))
          .attr('class','form-control')
          .attr('id', 'input-' + v)
          .style('width',graph_height - 100 + 'px')
          .style('text-align', 'center')
          .on('input', function(d){

            var value = parseFloat(this.value),
                domain = v_i.x.domain();

            value = value < domain[0] ? domain[0] : value;
            value = value > domain[1] ? domain[1] : value;
            current_means[v] = value;
            updateCharts(current_means, v);
          });
      } else {
        g_input.append('select')
          .on('change', function(d){
            current_means[v] = this.value;
            updateCharts(current_means, v);
          })
          .attr('class','form-control')
          .attr('id', 'input-' + v)
          .style('width', graph_height - 100 + 'px')
            .selectAll('option')
              .data(v_i.values)
            .enter().append('option')
              .text(function(d){ return d; })
              .attr('value', function(d){ return d; })
              .property('selected', function(d){
                return d == current_means[v] 
              });
      }



      v_i.path_generator = d3.svg.line()
          .x(function(d) { 
            var a = v_i.x(d.x);
            if(isNaN(a))
              console.log(d);
            return v_i.x(d.x); 
          })
          .y(function(d) { 
            var a = y(d.y);
            if(isNaN(a))
              console.log(d);
            return y(d.y); 
          })
          .interpolate('linear');

     
   
      var t = collect_means(),
          plot_data = get_plot_data(t, v),
          predicted_p = model.equation(t),
          mean = [v_i.x(t[v]), y(predicted_p)],
          domain = v_i.x.domain(),
          range = v_i.x.range();

        if(mod == 0){
          g.append('text')
          .attr('class','predicted-p')
          .attr('x', function(){
            var x1 = v_i.x(domain[0]);
          })
          .attr('y',mean[1])
          .attr('dx','-110')
          .attr('dy','0.3em')
          .text(model.y.format(predicted_p))
          .style('fill',model.color)
          .style('font-weight','bold');
        }

        foreground_layer.append('path')
          .attr('class','response-curve')
          .attr('d', v_i.path_generator(plot_data))
          .style('stroke-width', 3)
          .style('stroke', d3.rgb(model.color).brighter(0.7))
          .style('fill','none');




        var circle = foreground_layer.selectAll('circle').data([mean])
            .enter().append('circle')
          .attr('cx',function(d){ return d[0] })
          .attr('cy',function(d){ return d[1] })
          .attr('r', 6)
          .style('stroke-width',3.5)
          .style('stroke',model.color)
          .style('fill','white')
            .attr('cursor', 'move');


        var rect = background_layer.append('rect')
          .attr('x',0)
          .attr('y',0)
          .attr('width',graph_height)
          .attr('height',graph_height)
          .style('fill','rgb(250,250,250)');

        g.selectAll('.background-layer, .foreground-layer')
          .selectAll('circle, rect, path').call(
          d3.behavior.drag().on('dragstart', function(d,i){
            d3.event.sourceEvent.stopPropagation(); 
            
            circle.transition()
              .duration(100)
              .attr('r', 12);
          }).on('dragend', function(d,i){
            circle.transition()
              .duration(100)
              .attr('r', 6);
          }).on('drag', function(d,i){
              if(v_i.type == 'continuous'){

                var x_value = +circle.attr('cx') + d3.event.dx;

                x_value = v_i.x.invert((x_value));
                current_means[v] = x_value;
                current_means[v] = current_means[v] < domain[0] ? domain[0] : current_means[v];
                current_means[v] = current_means[v] > domain[1] ? domain[1] : current_means[v];
              } else {
                var x_i = d3.bisect(range, d3.event.x) - 1;
                x_i = x_i < 0 ? 0 : x_i;
                current_means[v] = domain[x_i];
              }

              var predicted_p = model.equation(current_means),
                  predicted_y = y(predicted_p);

              circle
                .attr('cx', v_i.x(current_means[v]) )
                .attr('cy', predicted_y);

              updateInputs(current_means, v);
              updateCharts(current_means, v);
          }));


        background_layer.append('line')
          .attr('class','predicted-p')
          .attr('x1', function(){
            var x1 = v_i.x(domain[0]);
            return mod == 0 ? x1 : x1 - 25;
          })
          .attr('y1',mean[1])
          .attr('x2', function(){
            var x2 = v_i.x( domain[domain.length - 1] );
            return mod == 2 ? x2 : x2 + 25;
          })
          .attr('y2',mean[1])
          .style('stroke-width', 1.5)
          .style('stroke','lightgray')
          .style('fill','none');

      });

  };

  var model_titles = Object.keys(models).map(function(k){
    return { title: models[k].title, model: k };
  });

  var select_a_model = d3.selectAll('#select-a-model')
    .on('change',function(){
      d3.selectAll('.profiler-input').remove();
      svg.selectAll('*').remove();
      draw(models[this.value]);
    }).selectAll('option')
      .data(model_titles)
    .enter().append('option')
      .text(function(d){ return d.title; })
      .attr('value', function(d){ return d.model; })
      .property('selected', function(d,i){
        return i == 0; 
      });

  var url_params = {};
  window.location.search.substr(1).split('&').forEach(function(params){
    var p = params.split('=');
    if(p.length == 2){
      url_params[p[0]] = p[1];
    }
  });

  var load_model = url_params['model'] ? url_params['model'] : model_titles[0].model;

  $('#select-a-model').val(load_model);

  draw(models[load_model]);

})();