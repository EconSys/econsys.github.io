var involuntary_model_formula = function(d){
  var logit = -4.5338, 
      grade_by_step = {
        'ALL OTHER 610': 3.7997,
        'ALL OTHER 620': 0.6397,
        'ALL OTHER 621': 2.0477,
        occ_610_grade_1_step_10: 0.3365,
        occ_610_grade_1_step_11: 0.1217,
        occ_610_grade_1_step_12: 0.5558,
        occ_610_grade_1_step_13: 0.0247,
        occ_610_grade_1_step_14: 0.2722,
        occ_610_grade_1_step_X: 0.6731,
        occ_610_grade_1_step_02: 0.0555,
        occ_610_grade_1_step_03: -0.1044,
        occ_610_grade_1_step_04: -0.0613,
        occ_610_grade_1_step_05: 0.2202,
        occ_610_grade_1_step_06: 0.1214,
        occ_610_grade_1_step_07: 0.1076,
        occ_610_grade_1_step_08: 0.2755,
        occ_610_grade_1_step_09: 0.4146,
        occ_610_grade_1_step_01: 0.0484,
        occ_610_grade_2_step_10: -0.1991,
        occ_610_grade_2_step_11: -0.5008,
        occ_610_grade_2_step_12: -0.0316,
        occ_610_grade_2_step_13: -0.0161,
        occ_610_grade_2_step_14: 0.1486,
        occ_610_grade_2_step_X: -1.3625,
        occ_610_grade_2_step_02: -0.0789,
        occ_610_grade_2_step_03: 0.0504,
        occ_610_grade_2_step_04: 0.0515,
        occ_610_grade_2_step_05: -0.0513,
        occ_610_grade_2_step_06: -0.0289,
        occ_610_grade_2_step_07: -0.3193,
        occ_610_grade_2_step_08: -0.094,
        occ_610_grade_2_step_09: -0.0318,
        occ_610_grade_2_step_01: 0.0576,
        occ_610_grade_3_step_10: 0.0223,
        occ_610_grade_3_step_11: 0.1243,
        occ_610_grade_3_step_12: -0.0659,
        occ_610_grade_3_step_13: -0.0444,
        occ_610_grade_3_step_14: -0.2182,
        occ_610_grade_3_step_X: -2.411,
        occ_610_grade_3_step_02: 0.3621,
        occ_610_grade_3_step_03: -1.5274,
        occ_610_grade_3_step_04: -0.0959,
        occ_610_grade_3_step_05: -0.9691,
        occ_610_grade_3_step_06: 0.1912,
        occ_610_grade_3_step_07: -0.4889,
        occ_610_grade_3_step_08: 0.2307,
        occ_610_grade_3_step_09: 0.074,
        occ_610_grade_3_step_01: -0.7958,
        occ_610_grade_4_step_10: 1.4565,
        occ_610_grade_4_step_11: 0.1942,
        occ_610_grade_4_step_12: 0.6225,
        occ_610_grade_4_step_13: -5.3633,
        occ_610_grade_4_step_14: -5.9963,
        occ_610_grade_4_step_X: -5.5184,
        occ_610_grade_4_step_02: 2.1258,
        occ_610_grade_4_step_03: -6.604,
        occ_610_grade_4_step_04: -0.2884,
        occ_610_grade_4_step_05: 1.1025,
        occ_610_grade_4_step_06: 0.8844,
        occ_610_grade_4_step_07: -0.0816,
        occ_610_grade_4_step_08: -0.4251,
        occ_610_grade_4_step_09: 0.2774,
        occ_610_grade_4_step_01: -0.0004,
        occ_620_grade_4_step_10: 1.0103,
        occ_620_grade_4_step_02: 0.8527,
        occ_620_grade_4_step_03: 0.9341,
        occ_620_grade_4_step_04: 0.5718,
        occ_620_grade_4_step_05: 0.9388,
        occ_620_grade_4_step_06: 0.474,
        occ_620_grade_4_step_07: -0.0435,
        occ_620_grade_4_step_08: 0.9561,
        occ_620_grade_4_step_09: -5.9705,
        occ_620_grade_4_step_01: 0.5908,
        occ_620_grade_5_step_10: 0.0534,
        occ_620_grade_5_step_02: 0.7055,
        occ_620_grade_5_step_03: 0.4318,
        occ_620_grade_5_step_04: 0.8345,
        occ_620_grade_5_step_05: 0.4955,
        occ_620_grade_5_step_06: 0.3987,
        occ_620_grade_5_step_07: 0.3438,
        occ_620_grade_5_step_08: 0.6681,
        occ_620_grade_5_step_09: 1.167,
        occ_620_grade_5_step_01: 0.9492,
        occ_620_grade_6_step_10: -0.0294,
        occ_620_grade_6_step_02: 0.1972,
        occ_620_grade_6_step_03: 0.6823,
        occ_620_grade_6_step_04: 0.3985,
        occ_620_grade_6_step_05: 0.4474,
        occ_620_grade_6_step_06: 0.3983,
        occ_620_grade_6_step_07: 0.4102,
        occ_620_grade_6_step_08: 0.1822,
        occ_620_grade_6_step_09: -0.1296,
        occ_620_grade_6_step_01: 0.3414,
        occ_621_grade_4_step_10: 0.8272,
        occ_621_grade_4_step_X: -5.4913,
        occ_621_grade_4_step_02: 0.8136,
        occ_621_grade_4_step_03: 1.0726,
        occ_621_grade_4_step_04: 0.3977,
        occ_621_grade_4_step_05: 1.4212,
        occ_621_grade_4_step_06: 0.1781,
        occ_621_grade_4_step_07: -0.8802,
        occ_621_grade_4_step_08: -0.23,
        occ_621_grade_4_step_09: 2.4455,
        occ_621_grade_4_step_01: 1.6928,
        occ_621_grade_5_step_10: -0.1007,
        occ_621_grade_5_step_02: 0.1937,
        occ_621_grade_5_step_03: 0.6697,
        occ_621_grade_5_step_04: 0.2483,
        occ_621_grade_5_step_05: 0.5248,
        occ_621_grade_5_step_06: 0.9576,
        occ_621_grade_5_step_07: 0.7506,
        occ_621_grade_5_step_08: -0.0023,
        occ_621_grade_5_step_09: -1.4917,
        occ_621_grade_5_step_01: 1.3607,
        occ_621_grade_6_step_02: -1.2208,
        occ_621_grade_6_step_03: 3.1443,
        occ_621_grade_6_step_04: -0.4782,
        occ_621_grade_6_step_05: 0.5117,
        occ_621_grade_6_step_06: -1.5265,
        occ_621_grade_6_step_07: -0.4508,
        occ_621_grade_6_step_08: 3.5559,
        occ_621_grade_6_step_09: -2.1175,
        occ_621_grade_6_step_01: -0.2591
      },
      grade_by_step_X_aptyrs = { 
        'ALL OTHER 610': -0.3388,
        'ALL OTHER 620': -0.0109,
        'ALL OTHER 621': -0.0563,
        'occ_610_grade_1_step_01': 0.1708,
        'occ_610_grade_1_step_02': 0.067,
        'occ_610_grade_1_step_03': 0.1335,
        'occ_610_grade_1_step_04': 0.1031,
        'occ_610_grade_1_step_05': 0.1381,
        'occ_610_grade_1_step_06': 0.0277,
        'occ_610_grade_1_step_07': 0.0597,
        'occ_610_grade_1_step_08': -0.0176,
        'occ_610_grade_1_step_09': 0.0511,
        'occ_610_grade_1_step_10': 0.0958,
        'occ_610_grade_1_step_11': 0.1114,
        'occ_610_grade_1_step_12': 0.0676,
        'occ_610_grade_1_step_13': 0.1277,
        'occ_610_grade_1_step_14': 0.0577,
        'occ_610_grade_1_step_X': 0.0135,
        'occ_610_grade_2_step_01': 0.0629,
        'occ_610_grade_2_step_02': 0.0845,
        'occ_610_grade_2_step_03': -0.0146,
        'occ_610_grade_2_step_04': 0.0471,
        'occ_610_grade_2_step_05': 0.0745,
        'occ_610_grade_2_step_06': 0.0719,
        'occ_610_grade_2_step_07': 0.0801,
        'occ_610_grade_2_step_08': 0.0471,
        'occ_610_grade_2_step_09': 0.0694,
        'occ_610_grade_2_step_10': 0.0712,
        'occ_610_grade_2_step_11': 0.0665,
        'occ_610_grade_2_step_12': 0.0465,
        'occ_610_grade_2_step_13': 0.0654,
        'occ_610_grade_2_step_14': 0.0591,
        'occ_610_grade_2_step_X': 0.0993,
        'occ_610_grade_3_step_01': 0.0487,
        'occ_610_grade_3_step_02': 0.026,
        'occ_610_grade_3_step_03': 0.1611,
        'occ_610_grade_3_step_04': -0.1104,
        'occ_610_grade_3_step_05': 0.0678,
        'occ_610_grade_3_step_06': 0.0178,
        'occ_610_grade_3_step_07': 0.0613,
        'occ_610_grade_3_step_08': 0.0572,
        'occ_610_grade_3_step_09': 0.0217,
        'occ_610_grade_3_step_10': 0.0708,
        'occ_610_grade_3_step_11': 0.0004,
        'occ_610_grade_3_step_12': 0.0479,
        'occ_610_grade_3_step_13': 0.0044,
        'occ_610_grade_3_step_14': 0.0671,
        'occ_610_grade_3_step_X': 0.1496,
        'occ_610_grade_4_step_01': -0.2667,
        'occ_610_grade_4_step_02': -0.5277,
        'occ_610_grade_4_step_03': 0.0564,
        'occ_610_grade_4_step_04': -0.0057,
        'occ_610_grade_4_step_05': 0.0118,
        'occ_610_grade_4_step_06': 0.0079,
        'occ_610_grade_4_step_07': 0.065,
        'occ_610_grade_4_step_08': -0.0372,
        'occ_610_grade_4_step_09': 0.065,
        'occ_610_grade_4_step_10': -0.6952,
        'occ_610_grade_4_step_11': -0.0386,
        'occ_610_grade_4_step_12': -0.0315,
        'occ_610_grade_4_step_13': 0.0693,
        'occ_610_grade_4_step_14': 0.0921,
        'occ_610_grade_4_step_X': 0.0671,
        'occ_620_grade_4_step_01': -0.0972,
        'occ_620_grade_4_step_02': -0.7762,
        'occ_620_grade_4_step_03': -0.197,
        'occ_620_grade_4_step_04': 0.155,
        'occ_620_grade_4_step_05': -0.1186,
        'occ_620_grade_4_step_06': 0.0926,
        'occ_620_grade_4_step_07': 0.0806,
        'occ_620_grade_4_step_08': 0.0841,
        'occ_620_grade_4_step_09': 0.0639,
        'occ_620_grade_4_step_10': -0.2745,
        'occ_620_grade_5_step_01': -0.2457,
        'occ_620_grade_5_step_02': -0.023,
        'occ_620_grade_5_step_03': -0.2065,
        'occ_620_grade_5_step_04': -0.0719,
        'occ_620_grade_5_step_05': 0.1262,
        'occ_620_grade_5_step_06': 0.1041,
        'occ_620_grade_5_step_07': 0.1097,
        'occ_620_grade_5_step_08': -0.0373,
        'occ_620_grade_5_step_09': -0.1473,
        'occ_620_grade_5_step_10': 0.0825,
        'occ_620_grade_6_step_01': 0.153,
        'occ_620_grade_6_step_02': -0.1869,
        'occ_620_grade_6_step_03': -0.2662,
        'occ_620_grade_6_step_04': -0.0692,
        'occ_620_grade_6_step_05': 0.0594,
        'occ_620_grade_6_step_06': 0.032,
        'occ_620_grade_6_step_07': 0.0524,
        'occ_620_grade_6_step_08': 0.0648,
        'occ_620_grade_6_step_09': 0.075,
        'occ_620_grade_6_step_10': 0.0613,
        'occ_621_grade_4_step_01': 0.3648,
        'occ_621_grade_4_step_02': 0.225,
        'occ_621_grade_4_step_03': 0.0902,
        'occ_621_grade_4_step_04': 0.0731,
        'occ_621_grade_4_step_05': -0.0479,
        'occ_621_grade_4_step_06': 0.0338,
        'occ_621_grade_4_step_07': 0.1791,
        'occ_621_grade_4_step_08': 0.094,
        'occ_621_grade_4_step_09': -0.0129,
        'occ_621_grade_4_step_10': 0.0869,
        'occ_621_grade_4_step_X': 0.0705,
        'occ_621_grade_5_step_01': 0.1329,
        'occ_621_grade_5_step_02': 0.2222,
        'occ_621_grade_5_step_03': 0.1738,
        'occ_621_grade_5_step_04': 0.1545,
        'occ_621_grade_5_step_05': 0.0801,
        'occ_621_grade_5_step_06': 0.0096,
        'occ_621_grade_5_step_07': 0.0462,
        'occ_621_grade_5_step_08': 0.0897,
        'occ_621_grade_5_step_09': 0.1564,
        'occ_621_grade_5_step_10': 0.0881,
        'occ_621_grade_6_step_01': 0.0937,
        'occ_621_grade_6_step_02': 0.2249,
        'occ_621_grade_6_step_03': -3.2111,
        'occ_621_grade_6_step_04': 0.2968,
        'occ_621_grade_6_step_05': 0.0705,
        'occ_621_grade_6_step_06': 0.1819,
        'occ_621_grade_6_step_07': 0.1037,
        'occ_621_grade_6_step_08': -0.218,
        'occ_621_grade_6_step_09': 0.1297
      },
      performance = {
        'High': -1.2195,
        'Low': 1.3899,
        'Moderate': -0.2412
      },
      vamc = {
        'Albuquerque, NM': 0.0494,
        'Alexandria, LA': 0.3575,
        'All Others': -0.8163,
        'Altoona, PA': -1.2983,
        'Amarillo, TX': 0.147,
        'Anchorage, AK': 0.8633,
        'Ann Arbor, MI': 0.5493,
        'Asheville, NC': -0.3586,
        'Atlanta {Decatur}, GA': -0.4398,
        'Augusta, GA': 0.4585,
        'Baltimore HCS, MD': 0.7261,
        'Battle Creek, MI': 0.9377,
        'Bay Pines, FL': -0.1747,
        'Beckley, WV': 0.1205,
        'Bedford, MA': -0.0115,
        'Big Spring, TX': -0.098,
        'Biloxi, MS': 0.0578,
        'Birmingham, AL': 0.4169,
        'Black Hills HCS, SD': -0.2091,
        'Boise, ID': 0.1144,
        'Boston HCS, MA': -0.2486,
        'Bronx, NY': 0.313,
        'Buffalo, NY': 0.3671,
        'Butler, PA': 0.0451,
        'Central Texas HCS, TX': 0.1973,
        'Charleston, SC': 0.2254,
        'Cheyenne, WY': 0.7848,
        'Chicago HCS, IL': -0.1274,
        'Chillicothe, OH': -0.21,
        'Cincinnati, OH': 0.6867,
        'Clarksburg, WV': -0.0864,
        'Cleveland, OH': 0.0503,
        'Coatesville, PA': 0.3756,
        'Columbia, SC': -0.3236,
        'Columbus, OH': -0.0992,
        'Connecticut HCS, CT': -0.2108,
        'Dallas, TX': 0.3372,
        'Danville, IL': -0.0976,
        'Dayton, OH': 0.6648,
        'Denver, CO': -0.257,
        'Detroit, MI': 0.6678,
        'Dublin, GA': 0.2169,
        'Durham, NC': -0.0309,
        'El Paso, TX': 1.1596,
        'Erie, PA': 0.672,
        'Fargo, ND': -0.2129,
        'Fayetteville, AR': -0.3497,
        'Fayetteville, NC': 0.5936,
        'Fresno, CA': -0.4301,
        'Gainesville, FL': -0.4146,
        'Grand Junction, CO': 0.2037,
        'Hampton, VA': 0.1395,
        'Hines, IL': -0.0021,
        'Honolulu, HI': 0.7479,
        'Houston, TX': 0.3351,
        'Hudson Valley HCS, NY': 0.4893,
        'Huntington, WV': 0.465,
        'Indianapolis, IN': 0.0915,
        'Iron Mountain, MI': -0.668,
        'Jackson, MS': -0.3923,
        'Kansas City, MO': -0.006,
        'Las Vegas, NV': -0.5563,
        'Lebanon, PA': 0.2138,
        'Lexington, KY': 0.138,
        'Little Rock, AR': 0.0885,
        'Loma Linda, CA': -0.0497,
        'Long Beach, CA': -0.2225,
        'Los Angeles HCS, CA': 0.0618,
        'Louisville, KY': 0.2512,
        'Madison, WI': -0.7228,
        'Manchester, NH': 0.6996,
        'Manila, PI': -6.022,
        'Martinsburg, WV': 0.4429,
        'Memphis, TN': 0.0702,
        'Miami, FL': 0.1481,
        'Mid Tenn. HCS, TN': 0.2553,
        'Milwaukee, WI': -0.0106,
        'Minneapolis, MN': 0.0081,
        'Montana HCS, MT': -0.2749,
        'Montgomery, AL': -0.0784,
        'Mountain Home, TN': -0.1444,
        'Muskogee, OK': 0.5409,
        'NY Harbor HCS, NY': -0.3428,
        'Nebraska-W Iowa, NE': 0.0456,
        'New Jersey HCS, NJ': -0.5755,
        'New Orleans, LA': -0.4524,
        'North Arizona HCS, AZ': -0.0631,
        'North Calif HCS, CA': -0.062,
        'North Chicago, IL': -0.1494,
        'North Indiana HCS, IN': -0.1597,
        'Northampton, MA': 0.4717,
        'Northport, NY': -0.1245,
        'Oklahoma City, OK': 0.4225,
        'Orlando, FL': -0.3507,
        'Palo Alto, CA': -0.322,
        'Philadelphia, PA': 0.2643,
        'Phoenix, AZ': 0.8523,
        'Pittsburgh, PA': 0.2158,
        'Portland, OR': -0.23,
        'Providence, RI': -0.5367,
        'Puget Sound HCS, WA': 0.1345,
        'Reno, NV': -0.2015,
        'Richmond, VA': 0.2769,
        'Roseburg, OR': -0.0188,
        'Saginaw, MI': -0.754,
        'Salem, VA': -0.127,
        'Salisbury, NC': 0.2263,
        'Salt Lake City, UT': -0.2422,
        'San Diego, CA': -0.1372,
        'San Francisco, CA': 0.2228,
        'San Juan, PR': -0.5632,
        'Sheridan, WY': 0.2658,
        'Shreveport, LA': -0.7762,
        'Sioux Falls, SD': 0.0041,
        'South Arizona HCS, AZ': -0.574,
        'South Texas HCS, TX': 0.1095,
        'Spokane, WA': 0.5744,
        'St. Cloud, MN': -0.6497,
        'St. Louis, MO': 0.0195,
        'Tampa, FL': -0.3449,
        'Texas Valley Coast HCS': 0.2763,
        'Togus, ME': 1.1469,
        'Tomah, WI': -0.0335,
        'Tuscaloosa, AL': -0.5032,
        'Walla Walla, WA': -0.5113,
        'Washington, DC': 0.2281,
        'West Palm Beach, FL': -0.7368,
        'White City, OR': 0.5927,
        'White River Jct., VT': 0.678,
        'Wilkes-Barre, PA': 0.0413
      },
      d_grade_by_step =  'occ_' + d.occ + '_grade_' + d.grade + '_step_' + d.step,
      c;

  c = grade_by_step[d_grade_by_step];
  logit += c ? c : grade_by_step['ALL OTHER ' + d.occ];

  c = grade_by_step_X_aptyrs[d_grade_by_step];
  logit += c ? c * d.aptyrs : grade_by_step_X_aptyrs['ALL OTHER ' + d.occ] * d.aptyrs;

  logit += performance[d.performance] || 0;

  logit += vamc[d.vamc] || 0;

  logit += d.unemployment * 100 * 0.0499;

  logit += d.aptyrs * -0.0845;

  return 1/(1 + Math.exp(-logit));
}