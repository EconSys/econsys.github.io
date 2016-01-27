define(function(){
	
  var state_controller = {

    element: '#states-vue',

    clear: function(){
      d3.select(this.element).selectAll('.chart').remove();
      this.max = 0;
      this.svgs = [];
    },

    max: 0,
    
    svgs: [],

    bar_height: 10,
    
    bar_padding: 1,

    bar_class: '.state-bar',
    
    margin: { top: 0, right: 5, bottom: 0, left: 5},

    element_width: 100,

    width: function(){
      return this.element_width - this.margin.left - this.margin.right;
    },

    height: function(data){
      var h = data.length * (this.bar_height + this.bar_padding);
      return h + this.margin.top + this.margin.bottom;
    },

    label: function(states){
      var label_width = 60,
          labels = d3.select(this.element).append('svg')
            .attr('class','labels')
            .attr({ width: label_width, height: this.height(states) }),
          self = this;

      labels.selectAll('text')
          .data(states)
        .enter().append('text')
          .attr('transform', function(d,i){
            var y = i * (self.bar_height + self.bar_padding) + self.bar_height - 1;
            return 'translate(' + label_width + ',' +  y + ')';
          })
          .text(function(d){
            return d;
          })
          .attr({
            'text-anchor': 'end',
            'font-size': this.bar_height - 1
          })
          .style('fill', function(d){
            console.log(d);
            return app.state_colors[d];
          });

    },

    draw: function(data){
      if(d3.select(this.element).select('.labels').empty())
        this.label(app.states);

      var svg = this.svgs[app.current_year];
      if(svg){
        console.log('Updating SVG');
        this.update(svg, data);
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
              var y = i * (self.bar_height + self.bar_padding);
              return 'translate(0,' +  y + ')';
            })
            .attr('height', this.bar_height)
            .attr('width', function(d){
              return scale(d.count)
            })
            .style('fill', function(d,i){
              console.log(d);
              return app.state_colors[ d.state ];
            });

      this.svgs.push(svg);
    },

    update: function(svg, data){
      console.log(data);
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
    },

    key: function(d,i){
      return d.state;
    },

    summarize: function(data){
      var states = Object.keys(app.model_set),
          summary = {};
      for(var i = 0, l = data.length; i < l; i++){
        for(var j = 0, m = states.length; j < m; j++){
          var s = states[j];
          summary[s] = summary.hasOwnProperty(s) ? summary[s] + data[i][s] : 0 + data[i][s];
        }
      }
      return Object.keys(summary).map(function(k){
        return { state: k, count: summary[k] };
      });
    }

  };

  return function(app){
    state_controller.app = app;
    return state_controller;
  }

})