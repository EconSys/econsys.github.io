(function(){

  var education = [
        { values: [0], label: 'No formal educational credential' },
        { values: [1], label: 'High school diploma or equivalent' },
        { values: [2], label: 'Postsecondary nondegree award' },
        { values: [3], label: 'Some college, no degree' }
      ],
      english_importance = [
        { values: [2], label: '2' },
        { values: [3], label: '3' },
        { values: [4,5], label: '4-5' }
      ];

  var draw = function(data){
    var margin = { left: 150, top: 25, bottom: 100, right: 50 },
        graph_size = 232,
        svg_height = 4 * (graph_size + 25) + margin.top + 150,
        svg_width = 960;

    var x_s = data.map(function(d){
          return d.skill_distance;
        }),
        x_min = d3.min(x_s),
        x_max = d3.max(x_s),
        x_scale = d3.scale.linear()
            .domain([x_min, x_max])
            .range([0, graph_size]),
        x_axis = d3.svg.axis().scale(x_scale)
          .orient('bottom')
          .ticks(6);


    var y_s = data.map(function(d){
          return d.median_income;
        }),
        y_min = d3.min(y_s),
        y_max = d3.max(y_s),
        y_scale = d3.scale.linear()
            .domain([y_min, y_max])
            .range([graph_size, 0]),
        y_axis = d3.svg.axis().scale(y_scale)
          .orient('left')
          .ticks(6);

    var svg = d3.select('svg#visualization')
            .attr('width', svg_width)
            .attr('height', svg_height);

    if(svg.selectAll('.graph').empty()){
      console.log('Setting up');

      education.forEach(function(edu,i){
        english_importance.forEach(function(eng, j){

          var top =  i * (graph_size + margin.top) + margin.top,
              left = j * (graph_size + 25) + margin.left;
              

          var g = svg.append('g')
            .attr('class', 'edu-' + i + ' eng-' + j)
            .attr('transform','translate(' + left + ',' + top + ')');

          
          var axes_layer = g.append('g')
              .attr('class','axes-layer'),
            foreground_layer = g.append('g')
              .attr('class','foreground-layer');

          if(j == 0){
            var y_svg = axes_layer.append('g')
              .attr('class', 'y axis')
              .call(y_axis);

            y_svg.append('text')
              .attr('text-anchor','middle')
              .text(edu.label)
              .attr('transform','rotate(-90) translate(-110,-130)')
              .style('fill','#888')
              .style('font-size','14px');

            y_svg.append('text')
              .attr('text-anchor','middle')
              .text('Median Income ($)')
              .attr('transform','rotate(-90) translate(-110,-65)')
              .style('fill','#888')
              .style('font-size','12px');
                
          }

          var x_svg = axes_layer.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + graph_size + ')')
              .call(x_axis)
            .append('text')

          if(i == education.length - 1 ){
            x_svg.text(eng.label)
              .attr({ x: graph_size / 2 })
              .attr('dy', 45)
              .attr('text-anchor','middle')
              .style({ 'fill': 'darkgray', 'font-size': '14px' });
          }

          var cross_data = data.filter(function(d){
            return edu.values.indexOf(d.education) >= 0 && eng.values.indexOf(Math.round(d.english_importance)) >= 0;
          });

          console.log(cross_data);

          g.selectAll('circle')
            .data(cross_data, function(d){
              return d.soc;
            })
          .enter().append('circle')
            .attr('cx', function(d){ return x_scale(d.skill_distance) })
            .attr('cy', function(d){ return y_scale(d.median_income) })
            .attr('r', 5)
            .style('fill', 'steelblue')
            .style('opacity', 0.5);

        });
      });
    }
  }


  var setup = function(error, skills, targets){
    var transformed_targets = {};

    targets.forEach(function(t){
      transformed_targets[t.soc] = { 
        education: t.education, 
        median_income: t.median_income, 
        english_importance: 
        t.english_importance  
      };
    });

    var socs = Object.keys(skills[0]).filter(function(k){ return k != 'soc'; });

    console.log('socs');
    console.log(socs);

    var current_soc = 119051,
        data = skills.map(function(s){
          var t = transformed_targets[s.soc]
          return { soc: s.soc, skill_distance: +s[current_soc], education: +t.education, median_income: +t.median_income, english_importance: +t.english_importance  };
        });

    draw(data);

  };


  queue()
    .defer(d3.csv, './data/skill_distances.csv')
    .defer(d3.csv, './data/target_characteristics.csv')
    .await(setup);


})();