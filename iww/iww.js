(function(){

  var education = [
        { values: [0], label: 'No formal educational credential' },
        { values: [1], label: 'High school diploma or equivalent' },
        { values: [2], label: 'Postsecondary nondegree award' },
        { values: [3], label: 'Some college, no degree' }
      ],
      english = [
        { values: [2], label: 'Low (2)' },
        { values: [3], label: 'Medium (3)' },
        { values: [4,5], label: 'High (4-5)' }
      ];


  var plot_offset = function(edu_index, eng_index){
    var offset = {};

    offset.x = eng_index * (graph_size + graph_padding);
    offset.y = edu_index * (graph_size + graph_padding);

    return offset;
  };


  var margin = { left: 140, top: 25, bottom: 130, right: 50 },
      graph_size = 232,
      graph_padding = 25,
      svg_height = 4 * (graph_size + graph_padding) + margin.top + 150,
      svg_width = 960;



  var svg = d3.select('svg#visualization')
        .attr('width', svg_width)
        .attr('height', svg_height)
      .append('g')
        .attr('transform', 'translate('+ margin.left + ',' + margin.top  + ')');

  svg.append('text')
    .attr('text-anchor','middle')
    .text('Minimum Education')
    .attr('transform','rotate(-90) translate(-' + (svg_height/2 - 100) + ',-120)')
    .style('fill','#888')
    .style('font-size','20px');

  svg.append('text')
    .attr('text-anchor','middle')
    .text('English Importance')
    .attr('transform','translate(' + (svg_width/2 - 105) + ',' + (svg_height - 80) + ')')
    .style('fill','#888')
    .style('font-size','20px');



  svg.selectAll(".x.axis")
    .data(english)
  .enter().append("g")
    .attr("class", "x axis")
    .attr("transform", function(d, i) { return "translate(" + i * (graph_size + graph_padding) + ",0)"; })
    .each(function(d, i){
      var x_svg = d3.select(this),
          translate_y = (graph_size + graph_padding) * education.length;

      x_svg.append('text')
        .attr('text-anchor','middle')
        .text('Skill Proximity')
        .attr('transform','translate(' + (graph_size / 2) +  ',' + (translate_y + 35) + ')')
        .style('fill','#888')
        .style('font-size','12px');

      x_svg.append('text')
        .attr('text-anchor','middle')
        .text(function(d){ return d.label; })
        .attr('transform','translate(' + (graph_size / 2) +  ',' + (translate_y + 60) + ')')
        .style('fill','#333')
        .style('font-size','14px');

    })


  svg.selectAll(".y.axis")
    .data(education)
  .enter().append("g")
    .attr("class", "y axis")
    .attr("transform", function(d, i) { return "translate(0," + i * (graph_size + graph_padding) + ")"; })
    .each(function(d, i){
      var y_svg = d3.select(this);

      y_svg.append('text')
        .attr('text-anchor','middle')
        .text('25th Percentile Earnings ($)')
        .attr('transform','rotate(-90) translate(-110,-65)')
        .style('fill','#888')
        .style('font-size','12px');

      y_svg.append('text')
        .attr('text-anchor','middle')
        .text(function(d){ return d.label; })
        .attr('transform','rotate(-90) translate(-110,-90)')
        .style('fill','#333')
        .style('font-size','14px');
    });


  var plot_tabindex = 0;

  education.forEach(function(edu, edu_index){
    english.forEach(function(eng, eng_index){
      var offset = plot_offset(edu_index, eng_index),
          c = 'edu-' + edu_index + ' eng-' + eng_index;

      svg.append('g')
        .attr('transform', 'translate(' + offset.x + ',' + offset.y + ')')
        .attr('class', 'cell ' + c)
      .append('rect')
        .attr('class','frame')
        .attr('tabindex', (plot_tabindex + 1) * 1000)
        .attr('width', graph_size)
        .attr('height', graph_size)
        .on('click', function(){
          d3.select(this).node().focus();
        });

      plot_tabindex += 1;
    });
  });


  var skill_format = d3.format('.2f'),
      earnings_format = d3.format('$,'),
      growth_format = d3.format(',');

  var tooltip = d3.select('#tooltip');


  var draw = function(data){
    var x_s = data.map(function(d){
          return d.skill_distance;
        }),
        x_extent = d3.extent(x_s),
        x_extent = [ Math.floor(x_extent[0]) , Math.ceil(x_extent[1]) ],
        x_scale = d3.scale.linear()
            .domain(x_extent)
            .range([0, graph_size]),
        x_axis = d3.svg.axis().scale(x_scale)
          .orient('bottom')
          .tickSize((graph_size + graph_padding) * education.length)
          .tickFormat(d3.format("d"));

    svg.selectAll('.x.axis').each(function(){
      d3.select(this).transition().call(x_axis);
    });

    var y_s = data.map(function(d){
          return d.earnings;
        }),
        y_extent = d3.extent(y_s)
        y_scale = d3.scale.linear()
            .domain(y_extent)
            .range([graph_size, 0]),
        y_axis = d3.svg.axis().scale(y_scale)
          .orient('left')
          .tickSize(-(graph_size + graph_padding) * english.length)
          .ticks(6);

    var r_s = data.map(function(d){
          return Math.abs(d.growth);
        }),
        r_max = d3.max(r_s)
        r_scale = d3.scale.pow().exponent(.5)
            .domain([0, r_max])
            .range([2, 15]),
        r_neg_color = 'rgb(214, 39, 40)',
        r_pos_color = 'rgb(44, 160, 44)',
        r_zero_color = '#999';


    svg.selectAll('.y.axis').each(function(){
      d3.select(this).transition().call(y_axis);
    });


    plot_tabindex = 0;

    education.forEach(function(edu, edu_index){
      english.forEach(function(eng, eng_index){
        var offset = plot_offset(edu_index, eng_index),
            cross_class = '.edu-' + edu_index + '.eng-' + eng_index;


        var g_data = data.filter(function(d){
              return d.education == edu_index &&  d3.min([Math.round(d.english) - 2, 2]) == eng_index;
            }).sort(function(a,b){
              return d3.ascending(+a.skill_distance, +b.skill_distance);
            });

        var skill_median = d3.median(g_data.map(function(d){
              return +d.skill_distance;
            })),
            skill_median_data = skill_median ? [skill_median] : [],
            earnings_median = d3.median(g_data.map(function(d){
              return +d.earnings;
            })),
            earnings_median_data = earnings_median ? [earnings_median] : [];

      var g = svg.select('g' + cross_class);


      var skill_median_line = g.selectAll('line.skill_median')
            .data(skill_median_data);

      skill_median_line.enter().append('line')
        .attr('class','skill_median')
        .style({
          'stroke-width': 1.5,
          'stroke': 'gray',
          'stroke-opacity': 0.5
        })
        .append('title').text('Median Skill Proximity');

      skill_median_line.transition()
        .attr('x1', x_scale(skill_median))
        .attr('y1', y_scale(y_extent[0]))
        .attr('x2', x_scale(skill_median))
        .attr('y2', y_scale(y_extent[1]));


      skill_median_line.exit().remove();

      var skill_median_label = g.selectAll('text.skill_median')
            .data(skill_median_data);

       skill_median_label.enter().append('text')
        .attr('class','skill_median')
        .attr('dx','0.5em')
        .attr('dy','1em')
        .style({
          'font-size': '10px',
          'fill': d3.rgb('gray').darker(),
          'fill-opacity': 0.5
        });

        skill_median_label.text(skill_format(skill_median))
          .transition()
          .attr('x', x_scale(skill_median))
          .attr('y', y_scale(y_extent[1]))

      skill_median_label.exit().remove();


      var earnings_median_line = g.selectAll('line.earnings_median')
              .data(earnings_median_data);

      earnings_median_line.enter().append('line')
        .attr('class','earnings_median')
        .style({
          'stroke-width': 1.5,
          'stroke': 'gray',
          'stroke-opacity': 0.5
        })
        .append('title').text('Median across Occupations');

      earnings_median_line.transition()
        .attr('x1', x_scale(x_extent[0]))
        .attr('y1', y_scale(earnings_median))
        .attr('x2', x_scale(x_extent[1]))
        .attr('y2', y_scale(earnings_median));


      earnings_median_line.exit().remove();


      var earnings_median_label = g.selectAll('text.earnings_median')
            .data(earnings_median_data);

       earnings_median_label.enter().append('text')
        .attr('class','earnings_median')
        .attr('dx','-0.25em')
        .attr('dy','-0.5em')
        .style({
          'font-size': '10px',
          'fill': d3.rgb('gray').darker(),
          'fill-opacity': 0.5,
          'text-anchor': 'end'
        });

        earnings_median_label.text(earnings_format(earnings_median))
          .transition()
          .attr('x', x_scale(x_extent[1]))
          .attr('y', y_scale(earnings_median));

      earnings_median_label.exit().remove();

      var over_event = function(d){
        var circle = d3.select(this).select('circle');

        circle.classed('active', true);

        circle.transition()
          .attr('r', +circle.attr('r') + 5);

        svg.selectAll('circle').filter(function(){
          return !d3.select(this).classed('active');
        }).classed('inactive', true);

        tooltip.style('visibility','visible');
        tooltip.html(titles[d.soc] + '<br>' + 
            'Skill Proximity: ' + skill_format(d.skill_distance) + '<br>' + 
            '25th Percentile Earnings: ' + earnings_format(d.earnings) + '<br>' + 
            'Projected Growth: ' + growth_format(d.growth)
          );
        tooltip.style('left', +circle.attr('cx') + margin.left + offset.x + 20 + 'px');
        tooltip.style('top', +circle.attr('cy') + margin.top +  offset.y + 'px');
      };

      var out_event = function(d){
        var circle = d3.select(this).select('circle');

        circle.transition()
          .attr('r', r_scale( Math.abs(d.growth) ));

        svg.selectAll('circle').filter(function(){
          return !d3.select(this).classed('active');
        }).classed('inactive', false)

        circle.classed('active',false);

        tooltip.style('visibility','hidden');
      };

      var links = g.selectAll('a')
        .data(g_data, function(d){ return d.soc; });

      var links_enter = links.enter()
        .append('a')
        .attr('target','_blank')
        .attr('xlink:href', function(d){
          return 'http://www.onetonline.org/link/summary/' + d.soc.toString().substr(0,2) + '-' + d.soc.toString().substr(2,4) + '.00';
        }).each(function(d){
          d3.select(this).append('circle')
            .attr('r', r_scale( Math.abs(d.growth) ))
            .style('fill',function(d){
              return d.growth == 0 ?  r_zero_color : (d.growth > 0 ? r_pos_color : r_neg_color);
            });
        })
        .on('focus', over_event)
        .on('mouseenter', over_event)
        .on('blur', out_event)
        .on('mouseleave', out_event)
  
        links.attr('tabindex', function(d,i){
          return i + 1001 * (plot_tabindex + 1);
        }).each(function(){
          var circle = d3.select(this).select('circle');
          circle.transition()
            .attr('cx', function(d){
              return x_scale(d.skill_distance);
            })
            .attr('cy', function(d){ 
              return y_scale(d.earnings);
            });
        });

        links.exit().remove();

        plot_tabindex++;
      });
    });
  }




  var setup = function(error, titles, skills, targets){
    window.titles = titles;

    var transformed_targets = {};

    targets.forEach(function(t){
      transformed_targets[t.soc] = { 
        education: t.education, 
        earnings: t.wage_25, 
        english: t.english ,
        growth: t.growth_2014_2024
      };
    });


    var socs = Object.keys(skills[0]).filter(function(k){ 
      return k != 'soc'; 
    });


    var select_tag = d3.select('#current_soc');


    var filter_and_draw = function(){
      var current_soc = +select_tag.node().value,
          data = skills.map(function(s){
            var t = transformed_targets[s.soc]
            return { soc: s.soc, skill_distance: +s[current_soc], education: +t.education, earnings: +t.earnings, english: +t.english, growth: +t.growth * 1000 };
          });

      draw(data);
    };
    
    select_tag.on('change', function(e){
      filter_and_draw();
    });

    select_tag.selectAll('option')
        .data(socs)
      .enter().append('option')
        .attr('value', function(d){ return d; })
        .text(function(d){ return titles[d] + ' (' + d + ')'; });    

    filter_and_draw();
  };



  queue()
    .defer(d3.json, './data/occupation_titles.json')
    .defer(d3.csv, './data/skill_distances.csv')
    .defer(d3.csv, './data/target_characteristics_all.csv')
    .await(setup);


})();