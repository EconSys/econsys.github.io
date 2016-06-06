(function(){

  var education = [
        { values: [0], label: 'No formal educational credential' },
        { values: [1], label: 'High school diploma or equivalent' },
        { values: [2], label: 'Postsecondary nondegree award' },
        { values: [3], label: 'Some college, no degree' }
      ],
      english = [
        { values: [2], label: '2' },
        { values: [3], label: '3' },
        { values: [4,5], label: '4-5' }
      ];


  var plot_offset = function(edu_index, eng_index){
    var offset = {};

    offset.x = eng_index * (graph_size + graph_padding);
    offset.y = edu_index * (graph_size + graph_padding);

    return offset;
  };


  var margin = { left: 130, top: 25, bottom: 100, right: 50 },
      graph_size = 232,
      graph_padding = 25,
      svg_height = 4 * (graph_size + graph_padding) + margin.top + 150,
      svg_width = 960;



  var svg = d3.select('svg#visualization')
        .attr('width', svg_width)
        .attr('height', svg_height)
      .append('g')
        .attr('transform', 'translate('+ margin.left + ',' + margin.top  + ')');



  svg.selectAll(".x.axis")
    .data(english)
  .enter().append("g")
    .attr("class", "x axis")
    .attr("transform", function(d, i) { return "translate(" + (english.length - i - 1) * (graph_size + graph_padding) + ",0)"; })


  svg.selectAll(".y.axis")
    .data(education)
  .enter().append("g")
    .attr("class", "y axis")
    .attr("transform", function(d, i) { return "translate(0," + i * (graph_size + graph_padding) + ")"; })
    .each(function(){
      var y_svg = d3.select(this);

      y_svg.append('text')
        .attr('text-anchor','middle')
        .text(function(d){ return d.label; })
        .attr('transform','rotate(-90) translate(-110,-90)')
        .style('fill','#888')
        .style('font-size','14px');

      y_svg.append('text')
        .attr('text-anchor','middle')
        .text('Median Income ($)')
        .attr('transform','rotate(-90) translate(-110,-65)')
        .style('fill','#888')
        .style('font-size','12px');
    })


  education.forEach(function(edu, edu_index){
    english.forEach(function(eng, eng_index){
      var offset = plot_offset(edu_index, eng_index);

      svg.append("rect")
        .attr("class", "frame")
        .attr("x", offset.x)
        .attr("y", offset.y)
        .attr("width", graph_size)
        .attr("height", graph_size);
    });
  });


  var skill_format = d3.format('0f');



  var draw = function(data, x_extent, y_extent){

    var x_scale = d3.scale.linear()
            .domain(x_extent)
            .range([0, graph_size]),
        x_axis = d3.svg.axis().scale(x_scale)
          .orient('bottom')
          .tickSize((graph_size + graph_padding) * education.length)
          .tickFormat(skill_format);

    svg.selectAll('.x.axis').each(function(){
      d3.select(this).call(x_axis);
    });

    var y_scale = d3.scale.linear()
            .domain(y_extent)
            .range([graph_size, 0]),
        y_axis = d3.svg.axis().scale(y_scale)
          .orient('left')
          .tickSize(-(graph_size + graph_padding) * english.length)
          .ticks(6);

    svg.selectAll('.y.axis').each(function(){
      d3.select(this).call(y_axis);
    });



    data.forEach(function(d){
      var eng_index = d3.min([Math.round(d.english) - 2, 2]);
      d.offset = plot_offset(d.education, eng_index)
    })

    var circles = svg.selectAll('circle')
      .data(data, function(d){ return d.soc; });
    
    circles.enter().append('circle')
      .attr('r', 5)
      .style('fill','steelblue')
      .style('opacity',0.5);


    circles.transition()
      .attr('cx', function(d){
        return x_scale(d.skill_distance) + d.offset.x;
      })
      .attr('cy', function(d){ 
        return y_scale(d.median_income) + d.offset.y;
      });

    circles.exit().remove();


    d3.select('#table')
  }

  var get_skills_extent = function(skills){
    var extents = skills.map(function(s){
          var distances = [];
          Object.keys(s).forEach(function(k){
            if(k != 'soc')
              distances.push(+s[k]);
          });
          return d3.extent(distances);
        });
    console.log(extents);

    return d3.extent([].concat.apply([], extents));
  }


  var setup = function(error, skills, targets){
    window.skills = skills;

    var transformed_targets = {};

    targets.forEach(function(t){
      transformed_targets[t.soc] = { 
        education: t.education, 
        median_income: t.median_income, 
        english: 
        t.english  
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
            return { soc: s.soc, skill_distance: +s[current_soc], education: +t.education, median_income: +t.median_income, english: +t.english  };
          }),
          x_extent = get_skills_extent(skills),
          y_extent = d3.extent(targets.map(function(t){ return +t.median_income }));

      console.log(x_extent);
      draw(data, x_extent, y_extent);
    };
    
    select_tag.on('change', function(e){
      filter_and_draw();
    });

    select_tag.selectAll('option')
        .data(socs)
      .enter().append('option')
        .attr('value', function(d){ return d; })
        .text(function(d){ return d; });    

    filter_and_draw();
  };



  queue()
    .defer(d3.csv, './data/skill_distances.csv')
    .defer(d3.csv, './data/target_characteristics.csv')
    .await(setup);


})();