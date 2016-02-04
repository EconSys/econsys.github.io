define(['helpers/transition_end'], function(transition_end) {
  var simulation_controller = function(spec){
    
    var self = {
      element: 'body',
      bar_height: 0.5,
      bar_padding: 0.5,
      margin: { top: 0, right: 5, bottom: 0, left: 5},
      element_width: 148
    };

    for(var p in spec){
      if(spec.hasOwnProperty(p))
        self[p] = spec[p];
    }

    self.clear = function(){
      d3.select(this.element).html('');
    };
    

    self.width = function(){
      return this.element_width - this.margin.left - this.margin.right;
    };

    self.height = function(data){
      var h = data.length * (this.bar_height + this.bar_padding);
      return h + this.margin.top + this.margin.bottom;
    };

    self.draw = function(data){
      var svg = d3.select(this.element).append('svg')
              .attr({ width: this.element_width, height: this.height(data)})
            .append('g')
              .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

      var bars = svg.selectAll('.p-bar')
              .data(data, self.key)
            .enter().append('g')
            .attr('class','p-bar')
            .attr('transform', function(d,i){
              var y = i * (self.bar_height + self.bar_padding);
              return 'translate(0,' +  y + ')';
            });

      var stacks = bars.selectAll('rect')
              .data(function(d,i){
                  return self.map_intervals(self.app.state_keys, d, i);
                }, self.key)
            .enter().append('rect')
              .attr('fill', function(d,i){
                return self.app.state_colors[ self.app.state_keys[i] ];
              })
              .attr('x', function(d){
                return d.start * self.width();
              })
              .attr('width', function(d){
                return d.width * self.width();
              })
              .attr({ y: 0, height: this.bar_height })

      return svg;
    };

    self.update = function(svg, data, callback){
      // We'll animate the first few updates. Then we'll just update the rest for efficiency.
      var parent = d3.select(svg.node().parentNode),
          current_height = parseFloat( parent.attr('height') ),
          data_height = self.height(data);
      if(data_height > current_height)
        parent.attr('height', data_height);

      var bars = svg.selectAll('.p-bar')
          .data(data, self.key),
          // animate_first = 300,
          // animate_bars = d3.selectAll (bars[0].slice(0, animate_first) ),
          // no_animate_bars = d3.selectAll( bars[0].slice(animate_first) ),
          delay_ms = 4;

      setTimeout(callback, bars.length * delay_ms + 250);

      // setTimeout(function(){
      //   no_animate_bars.selectAll('rect')
      //     .data(function(d,i){
      //       return self.map_intervals(self.app.state_keys, d, i);
      //     }, self.key)
      //   .attr('x', function(d){
      //     return d.start * self.width();
      //   })
      //   .attr({ y: 0, height: self.bar_height })
      //   .attr('width', function(d){
      //     return d.width * self.width();
      //   });

      //   if(callback)
      //     callback();
      // }, animate_bars[0].length * delay_ms + 250);

      // var bars = svg.selectAll('.p-bar')
      // bars.data(data, self.key);

      bars.exit().remove();

      bars.enter().append('g')
        .attr('class','p-bar')
        .attr('transform', function(d,i){
          var y = i * (self.bar_height + self.bar_padding);
          return 'translate(0,' +  y + ')';
        });



      for(var i = 0, l = bars[0].length; i < l; i++){
        var stacks = d3.select(bars[0][i]).selectAll('rect')
            .data(function(d,i){
              return self.map_intervals(self.app.state_keys, d, i);
            }, self.key);

        stacks.enter().append('rect')
          .attr('fill', function(d,i){
            return self.app.state_colors[ self.app.state_keys[i] ];
          })
          .attr('x', function(d){
            return d.start * self.width();
          })
          .attr('width', function(d){
            return d.width * self.width();
          })
          .attr({ y: 0, height: this.bar_height });


        stacks.transition()
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
        
    };

    self.map_intervals = function(states, bar, i){
      var probs = states.map(function(s){ 
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
    };


    self.key = function(d,i){
      return i;
    };

    return self;
  }

  return function(spec){
    return simulation_controller(spec);
  }
})