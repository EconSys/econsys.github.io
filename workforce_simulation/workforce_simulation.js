(function(){
  

  var model_set = {

    attrite: function(p){
      return (-3.53591791118152) + 
        0.0710540340675929 * p.age + 
        (p.age - 46.0676646706587) * (p.age - 46.0676646706587) * 0.00402070811193196 + 
        0.0295973843226025 * p.aptyrs +
        (p.grade ===  0 ? 0 : 0) + 
        (p.grade ===  5 ? 0.710543218584208 : 0) + 
        (p.grade ===  7 ? 1.42646473252347 : 0) + 
        (p.grade ===  9 ? 1.27199186154361 : 0) + 
        (p.grade ===  10 ? -1.77262891167621 : 0) + 
        (p.grade ===  11 ? 0.813612149226721 : 0) + 
        (p.grade ===  12 ? -25.9035316690211 : 0) + 
        (p.grade ===  13 ? 27.9667105865241 : 0) + 
        (p.grade ===  14 ? 2.16864902048647 : 0) + 
        (p.grade ===  15 ? 4.03048679563392 : 0) + 
        -0.0000255689340000314 * p.salary + 
        (p.sex === 1 ? -0.0298964770548015 : 0) + 
        (p.sex === 2 ? 0.0298964770548015 : 0);
    },


    expired_appt: function(p){
      return 6.41999413116966 +
        -0.0116277170155567 * p.age + 
        (p.age - 46.0676646706587) * (p.age -46.0676646706587) * -0.0041020595642378 + 
        0.0100392378840961 * p.aptyrs + 
        (p.grade === 0  ? 0 : 0) +
        (p.grade === 5  ? -2.59223075669038 : 0) +
        (p.grade === 7  ? -2.17709717396002 : 0) +
        (p.grade === 9  ? -1.85810296752446 : 0) +
        (p.grade === 10 ? 0.599024058959796 : 0) +
        (p.grade === 11 ? -1.43841936743677 : 0) +
        (p.grade === 12 ? -25.7284384389194 : 0) +
        (p.grade === 13 ? 29.3317941379952  : 0) +
        (p.grade === 14 ? 5.36262700994169  : 0) +
        (p.grade === 15 ? 8.80260777920972  : 0) +
        + -0.0000929157529118085 * p.salary +
        (p.sex === 1 ? -0.201139765974223 : 0) +
        (p.sex === 2 ? 0.201139765974223  : 0);
    },


    none: function(p){
      return 2.38370142876586 + 
        0.0294435365491173 * p.age + 
        (p.age - 46.0676646706587) * (p.age - 46.0676646706587) * -0.00164684720516949 + 
        0.121749811794812 * p.aptyrs +
        (p.grade === 0 ? 0 : 0) + 
        (p.grade === 5 ? 28.3817158523667 : 0) + 
        (p.grade === 7 ? 0.424560482303992 : 0) + 
        (p.grade === 9 ? 0.0288763250243859 : 0) + 
        (p.grade === 10 ? 26.8376636940497 : 0) + 
        (p.grade === 11 ? 0.351805792437098 : 0) + 
        (p.grade === 12 ? 0.10383236985516 : 0) + 
        (p.grade === 13 ? 27.4440091902355 : 0) + 
        (p.grade === 14 ? 26.9784563479923 : 0) + 
        (p.grade === 15 ? 29.3823313221308 : 0) + 
        -0.0000125424669235603 * p.salary + 
        (p.sex === 1 ? 0.0786103514950878 : 0) + 
        (p.sex === 2 ? -0.0786103514950878 : 0);
    },
    

    promotion: function(p){
      return  (-21.5060467029631) + 
        0.0166670881885584 * p.age + 
        (p.age - 46.0676646706587) * (p.age - 46.0676646706587) * -0.00167629054423954 + 
        0.116511832647963 * p.aptyrs + 
        (p.grade === 0 ? 0 : 0) + 
        (p.grade === 5 ? 25.9441362550014 : 0) + 
        (p.grade === 7 ? 28.3352155068613 : 0) + 
        (p.grade === 9 ? 30.6078838643141 : 0) + 
        (p.grade === 10 ? 30.0173390823575 : 0) + 
        (p.grade === 11 ? 31.6245635357112 : 0) + 
        (p.grade === 12 ? 33.490514668073 : 0) + 
        (p.grade === 13 ? 63.8826179864239 : 0) + 
        (p.grade === 14 ? 66.9867495745349 : 0) + 
        (p.grade === 15 ? 45.3466224539619 : 0) + 
        -0.000158023327143577 * p.salary + 
        (p.sex === 1 ? -0.230822663339075 : 0) + 
        (p.sex === 2 ? 0.230822663339075 : 0);
    },
    

    quit: function(){
      return 0;
    }
  }

  var logistic_modeler = {
    model: function(model_set, object){
      var states = Object.keys(model_set),
          p_s = {};
      
      for (var i = 0; i < states.length; i++) {
        var s = states[i];
        p_s[s] = this.compute_state(model_set, object, s);
      }

      return p_s;
    },

    compute_state: function(model_set, object, s){
      var states = Object.keys(model_set),
          p = 1.0;

      for(var i = 0; i < states.length; i++) {
        if(states[i] != s){
          p += Math.exp( model_set[states[i]](object) - model_set[s](object) );
        }
      }
      return 1.0/p;
    }
  };

  var logistic_simulator = {
    simulate: function(model_set, object){
      var states = Object.keys(model_set),
          r = Math.random(),
          a = 0,
          state,
          new_p_s = {};

      for(var i = 0, l = states.length; i < l; i++){
        var s = states[i],
            p = object[s];
        if(r > a){
          state = s;
          a += p;
        }

        new_p_s[s] = 0;
      }

      new_p_s[state] = 1;

      return { p_s: new_p_s, r: r, state: state }
    }
  }

  var base_year = 2012;

  var vis = {
    
    bar_height: 1.5,
    
    bar_padding: 0.5,
    
    width: 100,

    draw: function(data){
      var svg = d3.select('.simulation').append('svg'),
          height = data.length * (this.bar_height + this.bar_padding),
          self = this;
      
      svg.attr({
        width: this.width,
        height: height
      });

      var bars = svg.selectAll('.p-bar')
              .data(data, function(d, i){
                return i;
              })
            .enter().append('g')
            .attr('class','p-bar')
            .attr('transform', function(d,i){
              var y = i * (self.bar_height + self.bar_padding);
              return 'translate(0,' +  y + ')';
            });

      var colors = ['#d9d9d9','#74c476','#fdae6b',' #fd8d3c','#e6550d'];

      var stacks = bars.selectAll('rect')
              .data(this.map_intervals, this.key)
            .enter().append('rect')
              .attr('fill', function(d,i){
                return colors[i];
              })
              .attr('x', function(d){
                return d.start * self.width;
              })
              .attr('width', function(d){
                return d.width * self.width;
              })
              .attr({ y: 0, height: 0 })
              .transition()
                .attr({ height: this.bar_height });
      return svg;
    },

    update: function(svg, data){
      console.log('Updating.')
      var bars = svg.selectAll('.p-bar'),
          self = this;

      for(var i = 0, l = bars[0].length; i < l; i++){
        d3.select(bars[0][i]).selectAll('rect')
            .data(this.map_intervals, this.key)
          .transition()
            .ease('bounce')
            .delay(function(d){
              return i * 5;
            })
              .attr('x', function(d){
                return d.start * self.width;
              })
              .attr({ y: 0, height: this.bar_height })
              .attr('width', function(d){
                return d.width * self.width;
              });
      }
    },

    map_intervals: function(bar,i){
        var states = ['none','promotion','expired_appt','attrite','quit'],
            probs = states.map(function(s){ 
                return bar[s];
              }),
            intervals = probs.map(function(d,i){
                var s = 0;
                for(var j = 0; j < i; j++){
                  s += probs[j];
                };
                return { start: s, width: d, i: i};
              });
        return intervals;
    },


    key: function(d,i){
      return i;
    }

  }


  var summarize_grades = function(data){
    var grades = {};
    for(var i = 0, l = data.length; i < l; i++){
      var g = data[i].grade;
      grades.hasOwnProperty(g) ? grades[g] += 1 : grades[g] = 1;
    }
    return grades;
  }


  var summarize_states = function(data){
    var states = Object.keys(model_set),
        summary = {};
    for(var i = 0, l = data.length; i < l; i++){
      for(var j = 0, m = states.length; j < m; j++){
        var s = states[j];
        summary[s] = summary.hasOwnProperty(s) ? summary[s] + data[i][s] : 0 + data[i][s];
      }
    }
    return summary;
  }


  var evolve = function(data){

    return data.filter(function(d){
      return d.none == 1 || d.promotion == 1;
    }).map(function(d){
      d.age += 1;
      d.aptyrs += 1;
      d.run_year += 1;
      
      return d.promotion == 1 ? promote(d) : d;
    });
  }

  var promote = function(d){
    var grade_progression = [0,5,7,9,10,11,12,13,14,15],
        new_g = grade_progression.indexOf(d.grade) + 1;
    
    if(new_g < grade_progression.length)
      d.grade = grade_progression[new_g];

    return d;
  }


  var current_year = 0,
      svg,
      data;

  
  var years_vue,
      stats_vue,
      grades_vue;

  $(document).ready(function(){
    years_vue = new Vue({
      el: '#years-vue',
      data: {
        years: []
      }
    });
    var years = []
    for(var i = 0; i < 6; i++){
      years.push(base_year + i);
    }
    years_vue.years = years;

    stats_vue = new Vue({
      el: '#stats-vue',
      data: {
        stats: []
      }
    });
    grades_vue = new Vue({
      el: '#grades-vue',
      data: {
        grades: []
      }
    });
  }); 


  var model_and_draw = function(){
    data = data.map(function(d){
      var p_s = logistic_modeler.model(model_set, d);
      for(s in p_s){
        d[s] = p_s[s];
      }
      return d;
    })

    grades_vue.grades.push( summarize_grades(data) );
    
    svg = vis.draw(data);
  }

   

  var simulate = function(){

    data = data.map(function(d){
      var p_s = logistic_simulator.simulate(model_set, d).p_s;
      for(s in p_s){
        d[s] = p_s[s];
      }
      return d;
    });

    vis.update(svg, data);

    setTimeout(function(){
      stats_vue.stats.push( summarize_states(data) );
      if(current_year < 5){
        data = evolve(data)
        model_and_draw();
        setTimeout(function(){
          if(current_year < 5)
            simulate();
        }, 500);
      }
      
      current_year += 1;
    }, data.length * 6);
  }

  $(document).on('click','#simulate', function(e){
    simulate();
  });


  d3.csv('./current_year_data.csv', function(error, rows){
    var numeric = ['age','aptyrs','empid','grade','retirement_eligible_year','run_year','salary','sex'],
        rows = rows.map(function(d){
          numeric.forEach(function(n){ d[n] = +d[n]; });
          return d;
        });
    data = rows;
    model_and_draw();
  });

})();
