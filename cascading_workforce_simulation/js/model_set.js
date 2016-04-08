define(function(){
    return {

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


    quit: function(){
      return 0;
    }
  }
});