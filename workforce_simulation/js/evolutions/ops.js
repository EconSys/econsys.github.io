define(function(){
    var evolution = function(spec){
        
        var self = {};

        for(var p in spec){
          if(spec.hasOwnProperty(p))
            self[p] = spec[p];
        }

        self.evolve = function(data){
          var self = this;
          
          return data.filter(function(d){
            return d.none == 1 || d.promotion == 1;
          }).map(function(d){
            d.age += 1;
            d.aptyrs += 1;
            d.run_year += 1;
            
            return d.promotion == 1 ? self.promote(d) : d;
          });
        };


        self.promote = function(d){
          var grade_progression = [0,5,7,9,10,11,12,13,14,15],
            new_g = grade_progression.indexOf(d.grade) + 1;
        
          if(new_g < grade_progression.length)
            d.grade = grade_progression[new_g];

          return d;
        };

        
        self.hire = function(e){
            e.age = this.simulate_age(e.grade);
            e.sex = this.simulate_sex(e.grade)
            e.salary = this.simulate_salary(e.grade)
            e.aptyrs = 0;
            return e;
        };

        self.simulate_sex = function(grade){
            var params = {
                0: 0.484375,
                5: 0.333333333,
                7: 0.607594937,
                9: 0.880503145,
                10: 1,
                11: 0.863570392,
                12: 0.884955752,
                13: 0.957983193,
                14: 0.833333333,
                15: 1
            };
            return jStat.uniform.sample(0,1) > params[grade] ? 1 : 2;
        };

        self.simulate_age = function(grade){
            var params = {
                0: { mean: 30.703125, std_dev: 7.495257687 },
                5: { mean: 41.75, std_dev: 9.955583176 },
                7: { mean: 40.62025317, std_dev:9.621239505 },
                9: { mean: 39.13836478, std_dev:9.20613306 },
                10: { mean: 38.05357143, std_dev: 9.628404272 },
                11: { mean: 40.91582003, std_dev:9.737030548 },
                12: { mean: 41.66666667, std_dev:9.33995257 },
                13: { mean: 44.2605042, std_dev:7.271330031 },
                14: { mean: 44.33333333, std_dev:10.26969652 },
                15: { mean: 47, std_dev: 0.1 }
            };
            return jStat.normal.sample(params[grade].mean, params[grade].std_dev);
        };

        self.simulate_salary = function(grade){
            var params = {
                0: { mean: 35760.2222, std_dev: 1839.96149},
                5: { mean: 32420.75, std_dev: 3124.19767},
                7: { mean: 40967.6957, std_dev: 3326.41829},
                9: { mean: 52257.0645, std_dev: 5524.77234},
                10: { mean: 52257.0645, std_dev: 5524.77234},
                11: { mean: 66019.9907, std_dev: 7739.55976},
                12: { mean: 77490.2326, std_dev: 8712.73043},
                13: { mean: 91808.1667, std_dev: 7643.66995},
                14: { mean: 128238, std_dev: 1},
                15: { mean: 155500, std_dev: 1}
            };
            return jStat.normal.sample(params[grade].mean, params[grade].std_dev);
        };


        self.event_models = {
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

            voluntary: function(p){
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

            retirement: function(p){
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

            involuntary: function(){
              return 0;
            }
        };


        return self;
    };


  return function(spec){
    return evolution(spec);
  };
});