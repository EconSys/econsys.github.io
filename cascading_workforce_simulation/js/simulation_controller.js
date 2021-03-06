define(['helpers/transition_end'], function(transition_end) {
  var simulation_controller = {

    element: '.simulation',

    clear: function(){
      d3.select(this.element).html('');
    },
    
    bar_height: 1,
    
    bar_padding: 0.5,

    margin: { top: 0, right: 5, bottom: 0, left: 5},

    element_width: 148,

    width: function(){
      return this.element_width - this.margin.left - this.margin.right;
    },

    height: function(data){
      var h = data.length * (this.bar_height + this.bar_padding);
      return h + this.margin.top + this.margin.bottom;
    },

    draw: function(data){
      var svg = d3.select(this.element).append('svg')
              .attr({ width: this.element_width, height: this.height(data)})
            .append('g')
              .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')'),
          height = data.length * (this.bar_height + this.bar_padding),
          self = this;
      
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

      var stacks = bars.selectAll('rect')
              .data(this.map_intervals, this.key)
            .enter().append('rect')
              .attr('fill', function(d,i){
                return app.state_colors[ app.states[i] ];
              })
              .attr('x', function(d){
                return d.start * self.width();
              })
              .attr('width', function(d){
                return d.width * self.width();
              })
              .attr({ y: 0, height: 0 })
              .transition()
                .attr({ height: this.bar_height });
      return svg;
    },

    update: function(svg, data, callback){
      // We'll animate the first few updates. Then we'll just update the rest for efficiency.

      var animate_first = 300,
          bars = svg.selectAll('.p-bar'),
          animate_bars = d3.selectAll (bars[0].slice(0, animate_first) ),
          no_animate_bars = d3.selectAll( bars[0].slice(animate_first) ),
          delay_ms = 4,
          self = this;

      setTimeout(function(){
        no_animate_bars.selectAll('rect')
          .data(self.map_intervals, self.key)
        .attr('x', function(d){
          return d.start * self.width();
        })
        .attr({ y: 0, height: self.bar_height })
        .attr('width', function(d){
          return d.width * self.width();
        });

        if(callback)
          callback();
      }, animate_bars[0].length * delay_ms + 250);

      for(var i = 0, l = animate_bars[0].length; i < l; i++){
        d3.select(animate_bars[0][i]).selectAll('rect')
            .data(this.map_intervals, this.key)
          .transition()
            .ease('bounce')
            .delay(function(d){
              return i * delay_ms;
            })
            .attr('x', function(d){
              return d.start * self.width();
            })
            .attr({ y: 0, height: this.bar_height })
            .attr('width', function(d){
              return d.width * self.width();
            });
      }

        
    },

    map_intervals: function(bar,i){
      var probs = app.states.map(function(s){ 
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

  return function(app){
    return simulation_controller;
  }
})