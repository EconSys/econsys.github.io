define(['helpers/transition_end'], function(transition_end){
  var grade_controller = {

    element: '#grades-vue',

    clear: function(){
      d3.select(this.element).selectAll('.chart').remove();
      this.max = 0;
      this.svgs = [];
    },

    max: 0,
    
    svgs: [],

    bar_height: 12,
    
    bar_padding: 2.5,

    bar_class: '.grade-bar',

    label_class: '.grade-label',
    
    margin: { top: 0, right: 10, bottom: 0, left: 10},

    element_width: 150,

    label_width: 25,

    label_format: d3.format('.1f'),

    width: function(){
      return this.element_width - this.margin.left - this.margin.right;
    },

    height: function(data){
      var h = data.length * (this.bar_height + this.bar_padding);
      return h + this.margin.top + this.margin.bottom;
    },


    label: function(label_text){
      var label_width = 80,
          labels = d3.select(this.element).append('svg')
            .attr('class','labels')
            .attr({ width: label_width, height: this.height(label_text) }),
          self = this;

      labels.selectAll('text')
          .data(label_text)
        .enter().append('text')
          .attr('transform', function(d,i){
            var y = i * (self.bar_height + self.bar_padding) + self.bar_height - 2;
            return 'translate(' + label_width + ',' +  y + ')';
          })
          .text(function(d){
            return d;
          })
          .attr({
            'text-anchor': 'end',
            'font-size': this.bar_height - 1
          })
          .style('fill', 'steel_blue');

    },

    draw: function(data, callback){
      if(d3.select(this.element).select('.labels').empty()){
        console.log(data)
        this.label(data.map(function(d){
          return 'GS-' + d.grade;
        }));
      }

      var svg = this.svgs[app.current_year];

      if(svg){
        console.log('Updating SVG');
        this.update(svg, data, callback);
        return svg;
      }

      svg = d3.select(this.element).append('svg')
              .attr('class','chart')
              .attr({ width: this.element_width, height: this.height(data) }) 
            .append('g')
              .attr('class','chart-layer')
              .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')'),

          height = data.length * (this.bar_height + this.bar_padding),
          m = d3.max(data, function(d){
            return d.count;
          }),
          self = this;

      // Rescale other graphs if the max changes
      if(this.max < m){
        this.max = m;
        this.svgs.forEach(function(s){
          self.update(s, d3.select(s).data());
        });
      }

      var scale = d3.scale.linear()
        .domain([0, this.max])
        .range([0, this.width()]);

      svg.selectAll(this.bar_class)
          .data(data, this.key)
        .enter().append('rect')
        .attr('class','grade-bar')
        .attr('transform', function(d,i){
          var x = self.label_width + 2,
              y = i * (self.bar_height + self.bar_padding);
          return 'translate(' + x + ',' +  y + ')';
        })
        .attr('height', this.bar_height)
        .attr('width', function(d){
          return scale(d.count)
        })
        .style('fill', '#6baed6');

      var font_size = self.bar_height - 1;
      svg.selectAll(this.label_class)
          .data(data, this.key)
        .enter().append('text')
        .attr('class','grade-label')
        .text(function(d,i){
          return self.label_format(d.count);
        })
        .attr('x', self.label_width)
        .attr('y', function(d,i){
          return i * (self.bar_height + self.bar_padding) + font_size;
        })
        .style({ 
          'fill': '#6baed6',
          'font-size': font_size,
          'text-anchor': 'end'
        });

      this.svgs.push(svg);
    },

    update: function(svg, data, callback){
      var scale = d3.scale.linear()
            .domain([0, this.max])
            .range([0, this.width()])
          self = this;
      
      svg.selectAll(this.bar_class)
        .data(data, this.key)
        .transition()
          .ease('bounce')
          .attr('width', function(d){
            return scale(d.count);
          })
          .call(transition_end, function(){
            if(callback)
              callback();
          });

      svg.selectAll(this.label_class)
          .data(data, this.key)
        .text(function(d,i){
          return self.label_format(d.count);
        });

    },

    key: function(d,i){
      return d.grade;
    },

    summarize: function(data){
      var grades = {};
      for(var i = 0, l = data.length; i < l; i++){
        var g = data[i].grade;
        grades.hasOwnProperty(g) ? grades[g] += 1 : grades[g] = 1;
      }
      return Object.keys(grades).map(function(k){
        return { grade: k, count: grades[k] };
      });
    }

  }
  
  return function(app){
    return grade_controller;
  }

});