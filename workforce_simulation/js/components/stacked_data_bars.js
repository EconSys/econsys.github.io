define(function(){

	Vue.component('stacked-data-bars', {

    props: ['bars','max','colors'],

    template: '<div class="stacked-data-bar">' + 
                  '<div class="bar" v-for="(index, item) in bar_styles" track-by="$index" v-bind:style="item"></div>' + 
              '</div>',

    computed: {

      bar_keys: function(){
        return Object.keys(this.bars);
      },

      bar_values: function(){
        var keys = this.bar_keys,
            self = this;
        return keys.map(function(k){
          return self.bars[k];
        });
      },

      scale: function(){
        var max = this.max ? this.max : d3.sum(this.bar_values);
        return d3.scale.linear()
          .domain([0,max])
          .range([0,100]);
      },

      bar_styles: function(){
        var s = [],
            t_h = 0;

        for(var i = 0, l = this.bar_values.length; i < l; i++){
          var v = parseFloat(this.bar_values[i]),
              h = Math.abs(this.scale(v) - this.scale(0));
                        // m = v >= 0 ? this.scale(0) : this.scale(0) - w;
          s.push({ 
            'height': h + '%', 
            'bottom': t_h + '%',
            'background-color': this.get_color(i)
          });
          t_h += h;
        }
        return s;
      },
      
      label_styles: function(){
        var s = [];
        for(var i = 0, l = this.bar_values.length; i < l; i++){
          s.push({
            color: d3.rgb(this.get_color(i)).darker(0.35)
          })
        }
        return s;
      }

    },

    methods: {

      get_color: function(i){
        if(!this.colors)
          return 'lightgray';
        else if(this.colors.constructor === String)
          return this.colors;
        else if(this.colors.constructor === Object)
          return this.colors[this.bar_keys[i]];
        else if(this.colors.constructor === Array)
          return this.colors[i];
        else 
          return 'lightgray';
      }

    }
  });

});