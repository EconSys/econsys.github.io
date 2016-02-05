define(function(){

	Vue.component('data-bars', {

    props: ['bars','max','min','colors','editable','format'],

    template: '<div class="data-bar" v-for="item in bar_styles">' + 
                '<input class="label" v-if="editable" v-bind:style="label_styles[$key]" v-model="bars[$key] | d3-formatter number_format">' + 
                '<div class="label" v-else v-bind:style="label_styles[$key]">{{bars[$key] | d3-formatter number_format}}</div>' + 
                '<div class="bar-wrapper">' + 
                  '<div class="bar" v-bind:style="item"></div>' + 
                '</div>' + 
              '</div>',

    computed: {

      number_format: function(){
        return this.format ? this.format : ",.1f";
      },

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
        var max = this.max ? this.max : d3.max([d3.max(this.bar_values),0]),
            min = this.min ? this.min : d3.min([0,d3.min(this.bar_values)]);
        return d3.scale.linear()
          .domain([min,max])
          .range([0,100]);
      },

      bar_styles: function(){
        var s = {};

        for(var i = 0, l = this.bar_values.length; i < l; i++){
          var v = parseFloat(this.bar_values[i]),
              w = Math.abs(this.scale(v) - this.scale(0))
              m = v >= 0 ? this.scale(0) : this.scale(0) - w;

          s[this.bar_keys[i]] = { 
            'width': w + '%', 
            'margin-left': m + '%',
            'background-color': this.get_color(i)
          };
        }
        return s;
      },
      
      label_styles: function(){
        var s = {};
        for(var i = 0, l = this.bar_keys.length; i < l; i++){
          s[this.bar_keys[i]] = {
            color: d3.rgb(this.get_color(i)).darker(0.35)
          };
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