var model_formula = function(d){
  var c = -28.93320997;

  if(d.vamc == 'ALL OTHER'){
  	if(d.occ == '610'){
  		c += 0.83439235;
  		c += d.tenure * 0.015451692;
  	}
  	else if (d.occ == '620'){
  		c += 0.833713794;
  		c += d.tenure * 0.01323057;
  	} else {
  		c += 1.722244049;
  		c += d.tenure * tenure_capped	-0.013857785;
  	}
  } 

  if(d.occ == '610'){
    if(d.grade == 1){
      if(d.step == '10')
        c += 1.389078356;
      if(d.step == '11')
        c += 0.660343053;
      if(d.step == '12')
        c += 0.93095039;
      if(d.step == '13')
        c += 1.185066428;
      if(d.step == '14')
        c += 1.358914065;
      if(d.step == 'X')
          c += .278989905;
      if(d.step == '01')
        c += d.tenure * 0.16069199;
      if(d.step == '02')
        c += d.tenure * 0.327245136;
      if(d.step == '03')
        c += d.tenure * -0.055029597;
      if(d.step == '04')
        c += d.tenure * -0.270412892;
      if(d.step == '05')
        c += d.tenure * 0.066148579;
      if(d.step == '06')
        c += d.tenure * 0.033183539;
      if(d.step == '07')
        c += d.tenure * -0.008960523;
      if(d.step == '08')
        c += d.tenure * 0.030599111;
      if(d.step == '09')
        c += d.tenure * 0.013965135;
      if(d.step == '10')
        c += d.tenure * -0.019147992;
      if(d.step == '11')
        c += d.tenure * 0.040442268;
      if(d.step == '12')
        c += d.tenure * 0.026958158;
      if(d.step == '13')
        c += d.tenure * 0.014333293;
      if(d.step == '14')
        c += d.tenure * 0.006429117;
      if(d.step == 'X')
        c +=  d.tenure * 0.007228009;
      if(d.step == '02')
        c += -10.684253;
      if(d.step == '03')
        c += 0.996921578;
      if(d.step == '04')
        c += 1.739218072;
      if(d.step == '05')
        c += -0.205619248;
      if(d.step == '06')
        c += 0.636260613;
      if(d.step == '07')
        c += 1.000814483;
      if(d.step == '08')
        c += 0.654672823;
      if(d.step == '09')
        c += 0.830549228;
      if(d.step == '01')
        c += -4.321533862;
    }
    else if(d.grade == 2){
        if(d.step == '10')
          c +=  1.292525586;
        if(d.step == '11')
          c +=  0.93278106;
        if(d.step == '12')
          c +=  1.024514732;
        if(d.step == '13')
          c +=  0.981719261;
        if(d.step == '14')
          c +=  1.103718709;
        if(d.step == 'X')
            c +=1.124364524;
        if(d.step == '01')
          c +=  d.tenure *  -0.068805083;
        if(d.step == '02')
          c +=  d.tenure *  -0.001872422;
        if(d.step == '03')
          c +=  d.tenure *  -0.000917935;
        if(d.step == '04')
          c +=  d.tenure *  0.009009467;
        if(d.step == '05')
          c +=  d.tenure *  0.010263215;
        if(d.step == '06')
          c +=  d.tenure *  0.007091415;
        if(d.step == '07')
          c +=  d.tenure *  0.016243098;
        if(d.step == '08')
          c +=  d.tenure *  0.001739601;
        if(d.step == '09')
          c +=  d.tenure *  0.002836206;
        if(d.step == '10')
          c +=  d.tenure *  0.004195177;
        if(d.step == '11')
          c +=  d.tenure *  0.020107113;
        if(d.step == '12')
          c +=  d.tenure *  0.01515976;
        if(d.step == '13')
          c +=  d.tenure *  0.00855838;
        if(d.step == '14')
          c +=  d.tenure *  0.013769416;
        if(d.step == 'X')
            c += d.tenure * 0.012272495;
        if(d.step == '02')
          c +=  0.990236284;
        if(d.step == '03')
          c +=  1.157726051;
        if(d.step == '04')
          c +=  0.91492948;
        if(d.step == '05')
          c +=  1.031076992;
        if(d.step == '06')
          c +=  0.962950918;
        if(d.step == '07')
          c +=  0.944854817;
        if(d.step == '08')
          c +=  1.142727429;
        if(d.step == '09')
          c +=  1.16542303;
        if(d.step == '01')
          c +=  1.479174353 ;
    }
    else if (d.grade == 3){
        if(d.step == '10')
          c +=  0.699913011;
        if(d.step == '11')
          c +=  0.919538135;
        if(d.step == '12')
          c +=  1.119384889;
        if(d.step == '13')
          c +=  0.791545909;
        if(d.step == '14')
          c +=  0.540538879;
        if(d.step == 'X')
            c +=1.564760956;
        if(d.step == '01')
          c +=  d.tenure *  0.063162121;
        if(d.step == '02')
          c +=  d.tenure *  0.125047024;
        if(d.step == '03')
          c +=  d.tenure *  -0.075091087;
        if(d.step == '04')
          c +=  d.tenure *  -0.005389509;
        if(d.step == '05')
          c +=  d.tenure *  0.017202812;
        if(d.step == '06')
          c +=  d.tenure *  -0.015933774;
        if(d.step == '07')
          c +=  d.tenure *  0.008311039;
        if(d.step == '08')
          c +=  d.tenure *  0.011946589;
        if(d.step == '09')
          c +=  d.tenure *  -0.000388405;
        if(d.step == '10')
          c +=  d.tenure *  0.024759291;
        if(d.step == '11')
          c +=  d.tenure *  0.010777243;
        if(d.step == '12')
          c +=  d.tenure *  0.008149526;
        if(d.step == '13')
          c +=  d.tenure *  0.016879103;
        if(d.step == '14')
          c +=  d.tenure *  0.033779355;
        if(d.step == 'X')
            c += d.tenure * -0.014661236;
        if(d.step == '02')
          c +=  -1.011648481;
        if(d.step == '03')
          c +=  1.446984059;
        if(d.step == '04')
          c +=  1.072937805;
        if(d.step == '05')
          c +=  0.420299871;
        if(d.step == '06')
          c +=  1.204042551;
        if(d.step == '07')
          c +=  0.804791062;
        if(d.step == '08')
          c +=  0.892107013;
        if(d.step == '09')
          c +=  0.961176368;
        if(d.step == '01')
          c +=  -0.38834726;
    }
    else if (d.grade == 4){
      if(d.step == '10')
        c +=  1.581048764;
      if(d.step == '11')
        c +=  1.362016139;
      if(d.step == '12')
        c +=  1.220993334;
      if(d.step == '13')
        c +=  -8.362169419;
      if(d.step == '14')
        c +=  14.49286748;
      if(d.step == 'X')
          c +=1.370880945;
      if(d.step == '01')
        c +=  d.tenure *  -0.382676371;
      if(d.step == '02')
        c +=  d.tenure *  -0.010276433;
      if(d.step == '03')
        c +=  d.tenure *  0.090763121;
      if(d.step == '04')
        c +=  d.tenure *  0.015102834;
      if(d.step == '05')
        c +=  d.tenure *  -0.003022398;
      if(d.step == '06')
        c +=  d.tenure *  0.072287952;
      if(d.step == '07')
        c +=  d.tenure *  0.009649489;
      if(d.step == '08')
        c +=  d.tenure *  -0.030299681;
      if(d.step == '09')
        c +=  d.tenure *  0.035820118;
      if(d.step == '10')
        c +=  d.tenure *  -0.017487129;
      if(d.step == '11')
        c +=  d.tenure *  0.009588353;
      if(d.step == '12')
        c +=  d.tenure *  0.006841401;
      if(d.step == '13')
        c +=  d.tenure *  0.078769332;
      if(d.step == '14')
        c +=  d.tenure *  -0.739178349;
      if(d.step == 'X')
          c += d.tenure * -0.362444169;
      if(d.step == '02')
        c +=  0.849861953;
      if(d.step == '03')
        c +=  -1.298534377;
      if(d.step == '04')
        c +=  0.495867209;
      if(d.step == '05')
        c +=  1.177643539;
      if(d.step == '06')
        c +=  -0.777565044;
      if(d.step == '07')
        c +=  0.871188603;
      if(d.step == '08')
        c +=  1.826613571;
      if(d.step == '09')
        c +=  0.401487657;
      if(d.step == '01')
        c +=  3.070929033;
    }

  }
  else if(d.occ == '620'){
    if(d.grade == 4){
      if(d.step == '10')
        c +=  1.336513466;
      if(d.step == '01')
        c += d.tenure * -0.186746999;
      if(d.step == '02')
        c += d.tenure * -0.39742758;
      if(d.step == '03')
        c += d.tenure * -0.493501323;
      if(d.step == '04')
        c += d.tenure * -0.00252515;
      if(d.step == '05')
        c += d.tenure * 0.028745118;
      if(d.step == '06')
        c += d.tenure * 5.492704211;
      if(d.step == '07')
        c += d.tenure * -0.197810713;
      if(d.step == '08')
        c += d.tenure * -0.151469316;
      if(d.step == '09')
        c += d.tenure * 0.491872665;
      if(d.step == '10')
        c += d.tenure * 0.061866107;
      if(d.step == '02')
        c +=  2.385350477;
      if(d.step == '03')
        c +=  0.368574349;
      if(d.step == '04')
        c +=  2.104037393;
      if(d.step == '05')
        c +=  -1.550661874;
      if(d.step == '06')
        c +=  -130.7087572;
      if(d.step == '07')
        c +=  -4.491763276;
      if(d.step == '08')
        c +=  -4.34791541;
      if(d.step == '09')
        c +=  -8.482399157;
      if(d.step == '01')
        c +=  -4.28319326;
    }
    else if(d.grade == 5){
      if(d.step == '10')
        c +=  1.375551959;
      if(d.step == '01')
        c += d.tenure * -0.130147704;
      if(d.step == '02')
        c += d.tenure * -0.205806146;
      if(d.step == '03')
        c += d.tenure * -0.213719048;
      if(d.step == '04')
        c += d.tenure * -0.072317308;
      if(d.step == '05')
        c += d.tenure * 0.009445883;
      if(d.step == '06')
        c += d.tenure * -0.021220911;
      if(d.step == '07')
        c += d.tenure * -0.021134496;
      if(d.step == '08')
        c += d.tenure * 0.078427722;
      if(d.step == '09')
        c += d.tenure * -0.033408234;
      if(d.step == '10')
        c += d.tenure * -0.010171167;
      if(d.step == '02')
        c +=  1.451894119;
      if(d.step == '03')
        c +=  1.993129691;
      if(d.step == '04')
        c +=  1.739806965;
      if(d.step == '05')
        c +=  0.23898086;
      if(d.step == '06')
        c +=  1.194904156;
      if(d.step == '07')
        c +=  1.574229485;
      if(d.step == '08')
        c +=  0.655788965;
      if(d.step == '09')
        c +=  1.860273509;
      if(d.step == '01')
        c +=  -4.78845783;
    }
    else if(d.grade == 6){
      if(d.step == '10')
        c +=  1.216872822;
      if(d.step == '01')
        c += d.tenure * 0.196789152;
      if(d.step == '02')
        c += d.tenure * 0.114030632;
      if(d.step == '03')
        c += d.tenure * 0.081120042;
      if(d.step == '04')
        c += d.tenure * 0.042722203;
      if(d.step == '05')
        c += d.tenure * -0.003966923;
      if(d.step == '06')
        c += d.tenure * -0.012549128;
      if(d.step == '07')
        c += d.tenure * -0.024766941;
      if(d.step == '08')
        c += d.tenure * 0.002740684;
      if(d.step == '09')
        c += d.tenure * 0.018304915;
      if(d.step == '10')
        c += d.tenure * 0.001932671;
      if(d.step == '02')
        c +=  0.944601965;
      if(d.step == '03')
        c +=  0.309065135;
      if(d.step == '04')
        c +=  1.005257636;
      if(d.step == '05')
        c +=  1.535235273;
      if(d.step == '06')
        c +=  1.684743527;
      if(d.step == '07')
        c +=  1.828006181;
      if(d.step == '08')
        c +=  1.297276402;
      if(d.step == '09')
        c +=  0.837307893;
      if(d.step == '01')
        c +=  1.141131904;
    }
  }
  else if (d.occ == '621'){
    if(d.grade == 4){
      if(d.step == '10')
        c +=  1.803252958;
      if(d.step == 'X')
          c +=42.29000727;
      if(d.step == '01')
        c += d.tenure * -0.770875182;
      if(d.step == '02')
        c += d.tenure * -0.0205681;
      if(d.step == '03')
        c += d.tenure * 0.014962961;
      if(d.step == '04')
        c += d.tenure * -0.023256369;
      if(d.step == '05')
        c += d.tenure * 0.00684475;
      if(d.step == '06')
        c += d.tenure * -0.046779847;
      if(d.step == '07')
        c += d.tenure * -0.102529075;
      if(d.step == '08')
        c += d.tenure * -0.239236236;
      if(d.step == '09')
        c += d.tenure * 0.034913986;
      if(d.step == '10')
        c += d.tenure * -0.026277795;
      if(d.step == 'X')
          c += d.tenure * 0;
      if(d.step == '02')
        c +=  -0.396688342;
      if(d.step == '03')
        c +=  0.438745861;
      if(d.step == '04')
        c +=  1.708876296;
      if(d.step == '05')
        c +=  1.467528089;
      if(d.step == '06')
        c +=  1.839512142;
      if(d.step == '07')
        c +=  2.820197342;
      if(d.step == '08')
        c +=  3.944358236;
      if(d.step == '09')
        c +=  0.237342391;
      if(d.step == '01')
        c +=  0.723536122;
    }
    else if(d.grade == 5){
      if(d.step == '10')
        c +=  1.112861656;
      if(d.step == '01')
        c += d.tenure * 0.12636413;
      if(d.step == '02')
        c += d.tenure * 0.065221137;
      if(d.step == '03')
        c += d.tenure * -0.014127706;
      if(d.step == '04')
        c += d.tenure * -0.040074037;
      if(d.step == '05')
        c += d.tenure * -0.016185579;
      if(d.step == '06')
        c += d.tenure * -0.031600406;
      if(d.step == '07')
        c += d.tenure * 0.0072962;
      if(d.step == '08')
        c += d.tenure * 0.000199706;
      if(d.step == '09')
        c += d.tenure * 0.027098259;
      if(d.step == '10')
        c += d.tenure * 0.002601889;
      if(d.step == '02')
        c +=  -0.461187937;
      if(d.step == '03')
        c +=  1.158465181;
      if(d.step == '04')
        c +=  1.738776228;
      if(d.step == '05')
        c +=  1.483810919;
      if(d.step == '06')
        c +=  1.657867429;
      if(d.step == '07')
        c +=  1.136457958;
      if(d.step == '08')
        c +=  1.235670468;
      if(d.step == '09')
        c +=  0.682987878;
      if(d.step == '01')
        c +=  -0.836795605;
    }
    else if(d.grade == 6){
      if(d.step == '01')
        c += d.tenure * 0.01286909;
      if(d.step == '02')
        c += d.tenure * 0.176376925;
      if(d.step == '03')
        c += d.tenure * -0.503496015;
      if(d.step == '04')
        c += d.tenure * -0.088161649;
      if(d.step == '05')
        c += d.tenure * 0.03159517;
      if(d.step == '06')
        c += d.tenure * -0.111314622;
      if(d.step == '07')
        c += d.tenure * -0.183396224;
      if(d.step == '08')
        c += d.tenure * 0.050285241;
      if(d.step == '09')
        c += d.tenure * -0.107132723;
      if(d.step == '02')
        c +=  2.349344518;
      if(d.step == '03')
        c +=  3.685922842;
      if(d.step == '04')
        c +=  1.977290912;
      if(d.step == '05')
        c +=  0.721787629;
      if(d.step == '06')
        c +=  2.896776642;
      if(d.step == '07')
        c +=  3.892954592;
      if(d.step == '08')
        c +=  -0.008024771;
      if(d.step == '09')
        c +=  3.819451235;
      if(d.step == '01')
        c +=  -4.883868012;
    }
  }


  if(d.review == 'High'){
    c += 0.01517883;
  }
  else if(d.review == 'Low')	{
    c += 1.056923409;
  }
  else if(d.review == 'Moderate'){
    c += 0.250715302;
  }


  if(d.vamc == 'Albuquerque, NM'){
  	c += 0.153316793;
  }
  else if(d.vamc == 'Alexandria, LA'){
  	c += 0.010146358;
  }
  else if(d.vamc == 'All Others'){
  	c += -0.250467789;
  }
  else if(d.vamc == 'Altoona, PA'){
  	c += -0.000617636;
  }
  else if(d.vamc == 'Amarillo, TX'){
  	c += 0.35760967;
  }
  else if(d.vamc == 'Anchorage, AK'){
  	c += -0.19279105;
  }
  else if(d.vamc == 'Ann Arbor, MI'){
  	c += -0.07319852;
  }
  else if(d.vamc == 'Asheville, NC'){
  	c += 0.150436417;
  }
  else if(d.vamc == 'Atlanta {Decatur}, GA'){
  	c += -0.474644855;
  }
  else if(d.vamc == 'Augusta, GA'){
  	c += 0.216096806;
  }
  else if(d.vamc == 'Baltimore HCS, MD'){
  	c += -0.080612951;
  }
  else if(d.vamc == 'Battle Creek, MI'){
  	c += 0.338056016;
  }
  else if(d.vamc == 'Bay Pines, FL'){
  	c += 0.235053027;
  }
  else if(d.vamc == 'Beckley, WV'){
  	c += 0.416693759;
  }
  else if(d.vamc == 'Bedford, MA'){
  	c += -0.41597619;
  }
  else if(d.vamc == 'Big Spring, TX'){
  	c += -0.221810669;
  }
  else if(d.vamc == 'Biloxi, MS'){
  	c += -0.072734668;
  }
  else if(d.vamc == 'Birmingham, AL'){
  	c += 0.233332077;
  }
  else if(d.vamc == 'Black Hills HCS, SD'){
  	c += 0.121502619;
  }
  else if(d.vamc == 'Boise, ID'){
  	c += 0.257921451;
  }
  else if(d.vamc == 'Boston HCS, MA'){
  	c += -0.30327785;
  }
  else if(d.vamc == 'Bronx, NY'){
  	c += -0.181782456;
  }
  else if(d.vamc == 'Buffalo, NY'){
  	c += 0.16424224;
  }
  else if(d.vamc == 'Butler, PA'){
  	c += 0.571439281;
  }
  else if(d.vamc == 'Central Texas HCS, TX'){
  	c += -0.014523073;
  }
  else if(d.vamc == 'Charleston, SC'){
  	c += 0.268272449;
  }
  else if(d.vamc == 'Cheyenne, WY'){
  	c += 0.227667211;
  }
  else if(d.vamc == 'Chicago HCS, IL'){
  	c += -0.550814232;
  }
  else if(d.vamc == 'Chillicothe, OH'){
  	c += 0.327609426;
  }
  else if(d.vamc == 'Cincinnati, OH'){
  	c += -0.017646906;
  }
  else if(d.vamc == 'Clarksburg, WV'){
  	c += -0.048263698;
  }
  else if(d.vamc == 'Cleveland, OH'){
  	c += -0.226145174;
  }
  else if(d.vamc == 'Coatesville, PA'){
  	c += 0.49971003;
  }
  else if(d.vamc == 'Columbia, SC'){
  	c += 0.06172717;
  }
  else if(d.vamc == 'Columbus, OH'){
  	c += 0.010877342;
  }
  else if(d.vamc == 'Connecticut HCS, CT'){
  	c += -0.252175571;
  }
  else if(d.vamc == 'Dallas, TX'){
  	c += -0.20810563;
  }
  else if(d.vamc == 'Danville, IL'){
  	c += 0.506373396;
  }
  else if(d.vamc == 'Dayton, OH'){
  	c += -0.023644715;
  }
  else if(d.vamc == 'Denver, CO'){
  	c += 0.374581594;
  }
  else if(d.vamc == 'Detroit, MI'){
  	c += -0.086482035;
  }
  else if(d.vamc == 'Dublin, GA'){
  	c += -0.178671699;
  }
  else if(d.vamc == 'Durham, NC'){
  	c += -0.011877087;
  }
  else if(d.vamc == 'El Paso, TX'){
  	c += 0.113585908;
  }
  else if(d.vamc == 'Erie, PA'){
  	c += 0.005419426;
  }
  else if(d.vamc == 'Fargo, ND'){
  	c += 0.057036102;
  }
  else if(d.vamc == 'Fayetteville, AR'){
  	c += 0.633715565;
  }
  else if(d.vamc == 'Fayetteville, NC'){
  	c += 0.234027713;
  }
  else if(d.vamc == 'Fresno, CA'){
  	c += 0.168727059;
  }
  else if(d.vamc == 'Gainesville, FL'){
  	c += 0.124845268;
  }
  else if(d.vamc == 'Grand Junction, CO'){
  	c += 0.463968888;
  }
  else if(d.vamc == 'Hampton, VA'){
  	c += -0.510225937;
  }
  else if(d.vamc == 'Hines, IL'){
  	c += -0.267042083;
  }
  else if(d.vamc == 'Honolulu, HI'){
  	c += -0.295345326;
  }
  else if(d.vamc == 'Houston, TX'){
  	c += -0.238492706;
  }
  else if(d.vamc == 'Hudson Valley HCS, NY'){
  	c += -0.285537088;
  }
  else if(d.vamc == 'Huntington, WV'){
  	c += 0.522031661;
  }
  else if(d.vamc == 'Indianapolis, IN'){
  	c += 0.092093879;
  }
  else if(d.vamc == 'Iron Mountain, MI'){
  	c += 0.298772852;
  }
  else if(d.vamc == 'Jackson, MS'){
  	c += -0.192520297;
  }
  else if(d.vamc == 'Kansas City, MO'){
  	c += 0.019768146;
  }
  else if(d.vamc == 'Las Vegas, NV'){
  	c += 0.249092442;
  }
  else if(d.vamc == 'Lebanon, PA'){
  	c += 0.258538592;
  }
  else if(d.vamc == 'Lexington, KY'){
  	c += 0.248717456;
  }
  else if(d.vamc == 'Little Rock, AR'){
  	c += 0.1444355;
  }
  else if(d.vamc == 'Loma Linda, CA'){
  	c += -0.187181658;
  }
  else if(d.vamc == 'Long Beach, CA'){
  	c += -0.398703253;
  }
  else if(d.vamc == 'Los Angeles HCS, CA'){
  	c += -0.492383022;
  }
  else if(d.vamc == 'Louisville, KY'){
  	c += 0.132452482;
  }
  else if(d.vamc == 'Madison, WI'){
  	c += 0.218183241;
  }
  else if(d.vamc == 'Manchester, NH'){
  	c += -0.313012255;
  }
  else if(d.vamc == 'Manila, PI'){
  	c += -3.819397656;
  }
  else if(d.vamc == 'Martinsburg, WV'){
  	c += 0.071205101;
  }
  else if(d.vamc == 'Memphis, TN'){
  	c += -0.600373026;
  }
  else if(d.vamc == 'Miami, FL'){
  	c += -0.165403972;
  }
  else if(d.vamc == 'Mid Tenn. HCS, TN'){
  	c += 0.095302386;
  }
  else if(d.vamc == 'Milwaukee, WI'){
  	c += 0.047390897;
  }
  else if(d.vamc == 'Minneapolis, MN'){
  	c += -0.117214703;
  }
  else if(d.vamc == 'Montana HCS, MT'){
  	c += 0.048291988;
  }
  else if(d.vamc == 'Montgomery, AL'){
  	c += 0.15765682;
  }
  else if(d.vamc == 'Mountain Home, TN'){
  	c += 0.386733242;
  }
  else if(d.vamc == 'Muskogee, OK'){
  	c += 0.297553445;
  }
  else if(d.vamc == 'NY Harbor HCS, NY'){
  	c += -0.760683445;
  }
  else if(d.vamc == 'Nebraska-W Iowa, NE'){
  	c += 0.290808196;
  }
  else if(d.vamc == 'New Jersey HCS, NJ'){
  	c += -0.521079348;
  }
  else if(d.vamc == 'New Orleans, LA'){
  	c += -0.561267216;
  }
  else if(d.vamc == 'North Arizona HCS, AZ'){
  	c += 0.352137543;
  }
  else if(d.vamc == 'North Calif HCS, CA'){
  	c += -0.495998208;
  }
  else if(d.vamc == 'North Chicago, IL'){
  	c += -0.353640802;
  }
  else if(d.vamc == 'North Indiana HCS, IN'){
  	c += 0.326285048;
  }
  else if(d.vamc == 'Northampton, MA'){
  	c += 0.109799621;
  }
  else if(d.vamc == 'Northport, NY'){
  	c += -0.465246187;
  }
  else if(d.vamc == 'Oklahoma City, OK'){
  	c += -0.081317014;
  }
  else if(d.vamc == 'Orlando, FL'){
  	c += -0.189080886;
  }
  else if(d.vamc == 'Palo Alto, CA'){
  	c += -0.301969462;
  }
  else if(d.vamc == 'Philadelphia, PA'){
  	c += -0.199552509;
  }
  else if(d.vamc == 'Phoenix, AZ'){
  	c += 0.040504533;
  }
  else if(d.vamc == 'Pittsburgh, PA'){
  	c += 0.108978271;
  }
  else if(d.vamc == 'Portland, OR'){
  	c += -0.009840109;
  }
  else if(d.vamc == 'Providence, RI'){
  	c += -0.016881717;
  }
  else if(d.vamc == 'Puget Sound HCS, WA'){
  	c += -0.046930745;
  }
  else if(d.vamc == 'Reno, NV'){
  	c += 0.147535553;
  }
  else if(d.vamc == 'Richmond, VA'){
  	c += -0.037996472;
  }
  else if(d.vamc == 'Roseburg, OR'){
  	c += 0.526746293;
  }
  else if(d.vamc == 'Saginaw, MI'){
  	c += 0.437741301;
  }
  else if(d.vamc == 'Salem, VA'){
  	c += -0.041090156;
  }
  else if(d.vamc == 'Salisbury, NC'){
  	c += 0.309230598;
  }
  else if(d.vamc == 'Salt Lake City, UT'){
  	c += -0.10807832;
  }
  else if(d.vamc == 'San Diego, CA'){
  	c += -0.416280922;
  }
  else if(d.vamc == 'San Francisco, CA'){
  	c += -0.381826568;
  }
  else if(d.vamc == 'San Juan, PR'){
  	c += 0.452475874;
  }
  else if(d.vamc == 'Sheridan, WY'){
  	c += 0.042737155;
  }
  else if(d.vamc == 'Shreveport, LA'){
  	c += 0.362084814;
  }
  else if(d.vamc == 'Sioux Falls, SD'){
  	c += 0.146495139;
  }
  else if(d.vamc == 'South Arizona HCS, AZ'){
  	c += 0.765369778;
  }
  else if(d.vamc == 'South Texas HCS, TX'){
  	c += 0.092572333;
  }
  else if(d.vamc == 'Spokane, WA'){
  	c += 0.089828875;
  }
  else if(d.vamc == 'St. Cloud, MN'){
  	c += 0.422861279;
  }
  else if(d.vamc == 'St. Louis, MO'){
  	c += 0.134595836;
  }
  else if(d.vamc == 'Tampa, FL'){
  	c += -0.016764972;
  }
  else if(d.vamc == 'Texas Valley Coast HCS'){
  	c += -0.305018689;
  }
  else if(d.vamc == 'Togus, ME'){
  	c += 0.253406824;
  }
  else if(d.vamc == 'Tomah, WI'){
  	c += 0.493017894;
  }
  else if(d.vamc == 'Tuscaloosa, AL'){
  	c += 0.338564784;
  }
  else if(d.vamc == 'Walla Walla, WA'){
  	c += 0.536396751;
  }
  else if(d.vamc == 'Washington, DC'){
  	c += -0.614736087;
  }
  else if(d.vamc == 'West Palm Beach, FL'){
  	c += -0.303313471;
  }
  else if(d.vamc == 'White City, OR'){
  	c += 0.72135792;
  }
  else if(d.vamc == 'White River Jct., VT'){
  	c += -0.367067758;
  }
  else if(d.vamc == 'Wilkes-Barre, PA'){
  	c += -0.140056096;
  }



  c += d.age * 0.520537481;
  c += d.age * d.age * -0.001971271;
  c += d.unemployment * 100 * -0.03562674;
  c += d.tenure * 0.366612123;
  c += d.tenure * d.age * -0.004264868;
  c += d.tenure * d.tenure * -0.001450424;


  return 1/(1 + Math.exp(-c));
}
