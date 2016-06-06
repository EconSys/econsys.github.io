var promotion_model_formula = function(d){
  var logit = -3.5975, 
      grade_by_step = { 
        'ALL OTHER 610': -1.9071,
        'ALL OTHER 620': 3.7973,
        'ALL OTHER 621': 2.3871,
        'occ_610_grade_1_step_10': 1.9979,
        'occ_610_grade_1_step_11': 1.9472,
        'occ_610_grade_1_step_12': 1.8533,
        'occ_610_grade_1_step_13': 1.746,
        'occ_610_grade_1_step_14': 1.8436,
        'occ_610_grade_1_step_X': 1.9419,
        'occ_610_grade_1_step_02': 0.8672,
        'occ_610_grade_1_step_03': 0.8778,
        'occ_610_grade_1_step_04': 0.9807,
        'occ_610_grade_1_step_05': 1.5075,
        'occ_610_grade_1_step_06': 2.1198,
        'occ_610_grade_1_step_07': 2.3162,
        'occ_610_grade_1_step_08': 2.2397,
        'occ_610_grade_1_step_09': 2.1421,
        'occ_610_grade_1_step_01': 0.4135,
        'occ_610_grade_2_step_10': 0.3676,
        'occ_610_grade_2_step_11': 0.3549,
        'occ_610_grade_2_step_12': 0.3987,
        'occ_610_grade_2_step_13': 0.7338,
        'occ_610_grade_2_step_14': 1.6602,
        'occ_610_grade_2_step_X': 0.6425,
        'occ_610_grade_2_step_02': -0.1127,
        'occ_610_grade_2_step_03': -0.1319,
        'occ_610_grade_2_step_04': -0.0484,
        'occ_610_grade_2_step_05': 0.1377,
        'occ_610_grade_2_step_06': 0.2604,
        'occ_610_grade_2_step_07': 0.2736,
        'occ_610_grade_2_step_08': 0.0745,
        'occ_610_grade_2_step_09': 0.3639,
        'occ_610_grade_2_step_01': -0.0698,
        'occ_610_grade_3_step_10': -1.3124,
        'occ_610_grade_3_step_11': -1.2703,
        'occ_610_grade_3_step_12': -1.469,
        'occ_610_grade_3_step_13': -0.5018,
        'occ_610_grade_3_step_14': -0.861,
        'occ_610_grade_3_step_X': -2.0528,
        'occ_610_grade_3_step_02': -1.3079,
        'occ_610_grade_3_step_03': -1.0089,
        'occ_610_grade_3_step_04': -1.2066,
        'occ_610_grade_3_step_05': -0.9995,
        'occ_610_grade_3_step_06': -1.1702,
        'occ_610_grade_3_step_07': -1.3271,
        'occ_610_grade_3_step_08': -1.2123,
        'occ_610_grade_3_step_09': -1.3029,
        'occ_610_grade_3_step_01': -0.57,
        'occ_610_grade_4_step_10': -0.5954,
        'occ_610_grade_4_step_11': -0.0675,
        'occ_610_grade_4_step_12': -0.229,
        'occ_610_grade_4_step_13': 7.6882,
        'occ_610_grade_4_step_14': -16.628,
        'occ_610_grade_4_step_X': 0.3496,
        'occ_610_grade_4_step_02': -0.0596,
        'occ_610_grade_4_step_03': -0.8554,
        'occ_610_grade_4_step_04': -0.5211,
        'occ_610_grade_4_step_05': -0.3013,
        'occ_610_grade_4_step_06': -0.1853,
        'occ_610_grade_4_step_07': -0.1641,
        'occ_610_grade_4_step_08': -0.7492,
        'occ_610_grade_4_step_09': -0.903,
        'occ_610_grade_4_step_01': -0.0038,
        'occ_620_grade_4_step_10': 3.9552,
        'occ_620_grade_4_step_02': 3.842,
        'occ_620_grade_4_step_03': 3.5678,
        'occ_620_grade_4_step_04': 3.5111,
        'occ_620_grade_4_step_05': 3.4709,
        'occ_620_grade_4_step_06': 3.4429,
        'occ_620_grade_4_step_07': 3.7106,
        'occ_620_grade_4_step_08': 3.6164,
        'occ_620_grade_4_step_09': 2.3476,
        'occ_620_grade_4_step_01': 3.5166,
        'occ_620_grade_5_step_10': 2.7624,
        'occ_620_grade_5_step_02': 3.1788,
        'occ_620_grade_5_step_03': 3.0628,
        'occ_620_grade_5_step_04': 3.0487,
        'occ_620_grade_5_step_05': 2.8826,
        'occ_620_grade_5_step_06': 2.7921,
        'occ_620_grade_5_step_07': 2.876,
        'occ_620_grade_5_step_08': 2.8995,
        'occ_620_grade_5_step_09': 2.7046,
        'occ_620_grade_5_step_01': 3.2511,
        'occ_620_grade_6_step_10': -2.5989,
        'occ_620_grade_6_step_02': -0.5829,
        'occ_620_grade_6_step_03': -0.8814,
        'occ_620_grade_6_step_04': -1.2301,
        'occ_620_grade_6_step_05': -1.4492,
        'occ_620_grade_6_step_06': -1.3099,
        'occ_620_grade_6_step_07': -2.2201,
        'occ_620_grade_6_step_08': -1.7105,
        'occ_620_grade_6_step_09': -2.1311,
        'occ_620_grade_6_step_01': -0.7441,
        'occ_621_grade_4_step_10': 1.1612,
        'occ_621_grade_4_step_X': -7.3806,
        'occ_621_grade_4_step_02': 1.7225,
        'occ_621_grade_4_step_03': 1.0538,
        'occ_621_grade_4_step_04': 1.242,
        'occ_621_grade_4_step_05': 1.5809,
        'occ_621_grade_4_step_06': 2.2583,
        'occ_621_grade_4_step_07': 1.2569,
        'occ_621_grade_4_step_08': 2.4645,
        'occ_621_grade_4_step_09': 1.439,
        'occ_621_grade_4_step_01': 2.2934,
        'occ_621_grade_5_step_10': -1.6953,
        'occ_621_grade_5_step_02': -2.2745,
        'occ_621_grade_5_step_03': -2.0206,
        'occ_621_grade_5_step_04': -2.2207,
        'occ_621_grade_5_step_05': -3.0662,
        'occ_621_grade_5_step_06': -1.5646,
        'occ_621_grade_5_step_07': -2.0415,
        'occ_621_grade_5_step_08': -3.3429,
        'occ_621_grade_5_step_09': -1.8834,
        'occ_621_grade_5_step_01': -1.3629,
        'occ_621_grade_6_step_02': -2.4487,
        'occ_621_grade_6_step_03': -2.4376,
        'occ_621_grade_6_step_04': -2.8346,
        'occ_621_grade_6_step_05': -2.4438,
        'occ_621_grade_6_step_06': -4.7004,
        'occ_621_grade_6_step_07': 1.7093,
        'occ_621_grade_6_step_08': -6.5433,
        'occ_621_grade_6_step_09': -10.548,
        'occ_621_grade_6_step_01': -1.0205
      },
      grade_by_step_X_aptyrs = {
        'ALL OTHER 610': 0.0281,
        'ALL OTHER 620': -0.5232,
        'ALL OTHER 621': -0.1508,
        'occ_610_grade_1_step_01': 0.0379,
        'occ_610_grade_1_step_02': 0.0164,
        'occ_610_grade_1_step_03': 0.0693,
        'occ_610_grade_1_step_04': 0.0791,
        'occ_610_grade_1_step_05': 0.0341,
        'occ_610_grade_1_step_06': 0.0163,
        'occ_610_grade_1_step_07': 0.0453,
        'occ_610_grade_1_step_08': 0.0666,
        'occ_610_grade_1_step_09': 0.0453,
        'occ_610_grade_1_step_10': 0.0429,
        'occ_610_grade_1_step_11': 0.0309,
        'occ_610_grade_1_step_12': -0.0062,
        'occ_610_grade_1_step_13': 0.0159,
        'occ_610_grade_1_step_14': 0.0041,
        'occ_610_grade_1_step_X': -0.0223,
        'occ_610_grade_2_step_01': 0.0325,
        'occ_610_grade_2_step_02': 0.0235,
        'occ_610_grade_2_step_03': 0.0362,
        'occ_610_grade_2_step_04': 0.0212,
        'occ_610_grade_2_step_05': 0.0163,
        'occ_610_grade_2_step_06': -0.0139,
        'occ_610_grade_2_step_07': -0.0103,
        'occ_610_grade_2_step_08': 0.0014,
        'occ_610_grade_2_step_09': -0.0274,
        'occ_610_grade_2_step_10': -0.0213,
        'occ_610_grade_2_step_11': -0.0117,
        'occ_610_grade_2_step_12': -0.0122,
        'occ_610_grade_2_step_13': -0.0186,
        'occ_610_grade_2_step_14': -0.0104,
        'occ_610_grade_2_step_X': -0.0566,
        'occ_610_grade_3_step_01': 0.0416,
        'occ_610_grade_3_step_02': 0.0771,
        'occ_610_grade_3_step_03': 0.0559,
        'occ_610_grade_3_step_04': 0.0295,
        'occ_610_grade_3_step_05': -0.002,
        'occ_610_grade_3_step_06': 0.0129,
        'occ_610_grade_3_step_07': 0.0432,
        'occ_610_grade_3_step_08': 0.0126,
        'occ_610_grade_3_step_09': 0.0341,
        'occ_610_grade_3_step_10': 0.0377,
        'occ_610_grade_3_step_11': 0.0357,
        'occ_610_grade_3_step_12': 0.0119,
        'occ_610_grade_3_step_13': 0.0408,
        'occ_610_grade_3_step_14': 0.0436,
        'occ_610_grade_3_step_X': 0.0683,
        'occ_610_grade_4_step_01': 0.0609,
        'occ_610_grade_4_step_02': 0.0459,
        'occ_610_grade_4_step_03': 0.094,
        'occ_610_grade_4_step_04': 0.0818,
        'occ_610_grade_4_step_05': 0.0702,
        'occ_610_grade_4_step_06': 0.0548,
        'occ_610_grade_4_step_07': 0.0326,
        'occ_610_grade_4_step_08': 0.0597,
        'occ_610_grade_4_step_09': 0.0586,
        'occ_610_grade_4_step_10': 0.0481,
        'occ_610_grade_4_step_11': 0.014,
        'occ_610_grade_4_step_12': 0.037,
        'occ_610_grade_4_step_13': -0.5086,
        'occ_610_grade_4_step_14': 0.385,
        'occ_610_grade_4_step_X': -0.6471,
        'occ_620_grade_4_step_01': 0.1012,
        'occ_620_grade_4_step_02': -0.0862,
        'occ_620_grade_4_step_03': -0.0372,
        'occ_620_grade_4_step_04': -0.0734,
        'occ_620_grade_4_step_05': -0.0802,
        'occ_620_grade_4_step_06': 0.0238,
        'occ_620_grade_4_step_07': -0.0297,
        'occ_620_grade_4_step_08': 0.0504,
        'occ_620_grade_4_step_09': 0.1405,
        'occ_620_grade_4_step_10': -0.0643,
        'occ_620_grade_5_step_01': 0.0548,
        'occ_620_grade_5_step_02': -0.0816,
        'occ_620_grade_5_step_03': -0.0777,
        'occ_620_grade_5_step_04': -0.1128,
        'occ_620_grade_5_step_05': -0.051,
        'occ_620_grade_5_step_06': -0.0453,
        'occ_620_grade_5_step_07': -0.0419,
        'occ_620_grade_5_step_08': -0.0649,
        'occ_620_grade_5_step_09': -0.0283,
        'occ_620_grade_5_step_10': -0.0251,
        'occ_620_grade_6_step_01': 0.2503,
        'occ_620_grade_6_step_02': -0.0207,
        'occ_620_grade_6_step_03': 0.0269,
        'occ_620_grade_6_step_04': -0.0918,
        'occ_620_grade_6_step_05': -0.056,
        'occ_620_grade_6_step_06': -0.0927,
        'occ_620_grade_6_step_07': 0.0056,
        'occ_620_grade_6_step_08': -0.0203,
        'occ_620_grade_6_step_09': -0.0011,
        'occ_620_grade_6_step_10': 0.0603,
        'occ_621_grade_4_step_01': 0.0692,
        'occ_621_grade_4_step_02': 0.1226,
        'occ_621_grade_4_step_03': 0.0984,
        'occ_621_grade_4_step_04': 0.0455,
        'occ_621_grade_4_step_05': -0.0271,
        'occ_621_grade_4_step_06': -0.1075,
        'occ_621_grade_4_step_07': 0.0194,
        'occ_621_grade_4_step_08': -0.0728,
        'occ_621_grade_4_step_09': 0.0118,
        'occ_621_grade_4_step_10': 0.0433,
        'occ_621_grade_4_step_X': 0.3696,
        'occ_621_grade_5_step_01': 0.239,
        'occ_621_grade_5_step_02': 0.1452,
        'occ_621_grade_5_step_03': 0.1239,
        'occ_621_grade_5_step_04': 0.0601,
        'occ_621_grade_5_step_05': 0.1099,
        'occ_621_grade_5_step_06': -0.1418,
        'occ_621_grade_5_step_07': 0.0032,
        'occ_621_grade_5_step_08': 0.1089,
        'occ_621_grade_5_step_09': -1.4686,
        'occ_621_grade_5_step_10': -0.0408,
        'occ_621_grade_6_step_01': 0.0974,
        'occ_621_grade_6_step_02': 0.3105,
        'occ_621_grade_6_step_03': 0.2918,
        'occ_621_grade_6_step_04': -0.0755,
        'occ_621_grade_6_step_05': -0.0051,
        'occ_621_grade_6_step_06': 0.2367,
        'occ_621_grade_6_step_07': -0.5942,
        'occ_621_grade_6_step_08': 0.1866,
        'occ_621_grade_6_step_09': 0.0812
      },
      performance = {
        'High': 0.7218,
        'Low': -0.9504,
        'Moderate': 0.1095
      },
      vamc = {
        'Albuquerque, NM': -0.3578,
        'Alexandria, LA': -0.0068,
        'All Others': 0.3793,
        'Altoona, PA': -0.1801,
        'Amarillo, TX': 0.0623,
        'Anchorage, AK': 0.2132,
        'Ann Arbor, MI': -0.4035,
        'Asheville, NC': 0.3888,
        'Atlanta {Decatur}, GA': -0.3512,
        'Augusta, GA': -0.1531,
        'Baltimore HCS, MD': 0.0789,
        'Battle Creek, MI': 0.1003,
        'Bay Pines, FL': -0.2109,
        'Beckley, WV': 0.7833,
        'Bedford, MA': 0.2124,
        'Big Spring, TX': -0.9347,
        'Biloxi, MS': 0.1247,
        'Birmingham, AL': -0.5317,
        'Black Hills HCS, SD': 0.6666,
        'Boise, ID': 0.1125,
        'Boston HCS, MA': 0.3654,
        'Bronx, NY': -0.1782,
        'Buffalo, NY': 0.2962,
        'Butler, PA': 0.2831,
        'Central Texas HCS, TX': 0.0796,
        'Charleston, SC': -0.0279,
        'Cheyenne, WY': -0.4206,
        'Chicago HCS, IL': -0.4419,
        'Chillicothe, OH': 0.396,
        'Cincinnati, OH': 0.3559,
        'Clarksburg, WV': 0.5057,
        'Cleveland, OH': -0.0917,
        'Coatesville, PA': -0.0517,
        'Columbia, SC': -0.4487,
        'Columbus, OH': 0.4669,
        'Connecticut HCS, CT': 0.2083,
        'Dallas, TX': -0.2695,
        'Danville, IL': 0.4942,
        'Dayton, OH': 0.2656,
        'Denver, CO': 0.1924,
        'Detroit, MI': 0.2097,
        'Dublin, GA': -0.6068,
        'Durham, NC': -0.266,
        'El Paso, TX': 0.1992,
        'Erie, PA': 0.3699,
        'Fargo, ND': 1.073,
        'Fayetteville, AR': 0.6574,
        'Fayetteville, NC': 0.5128,
        'Fresno, CA': -0.2368,
        'Gainesville, FL': 0.0216,
        'Grand Junction, CO': 0.4645,
        'Hampton, VA': 0.1835,
        'Hines, IL': 0.1304,
        'Honolulu, HI': 0.0235,
        'Houston, TX': -0.4137,
        'Hudson Valley HCS, NY': -0.0224,
        'Huntington, WV': 0.0603,
        'Indianapolis, IN': 0.1965,
        'Iron Mountain, MI': 0.4929,
        'Jackson, MS': -0.4306,
        'Kansas City, MO': 0.1392,
        'Las Vegas, NV': 0.0156,
        'Lebanon, PA': 0.9717,
        'Lexington, KY': 0.001,
        'Little Rock, AR': 0.4908,
        'Loma Linda, CA': -0.5829,
        'Long Beach, CA': -0.1517,
        'Los Angeles HCS, CA': -0.3531,
        'Louisville, KY': 0.1116,
        'Madison, WI': -0.2619,
        'Manchester, NH': 0.5384,
        'Manila, PI': -5.7541,
        'Martinsburg, WV': -0.4608,
        'Memphis, TN': -0.0725,
        'Miami, FL': -0.2815,
        'Mid Tenn. HCS, TN': 0.1782,
        'Milwaukee, WI': 0.2972,
        'Minneapolis, MN': 0.3853,
        'Montana HCS, MT': 0.064,
        'Montgomery, AL': -0.097,
        'Mountain Home, TN': 0.2968,
        'Muskogee, OK': 0.302,
        'NY Harbor HCS, NY': -0.2591,
        'Nebraska-W Iowa, NE': 0.101,
        'New Jersey HCS, NJ': -0.9197,
        'New Orleans, LA': -0.087,
        'North Arizona HCS, AZ': 0.1215,
        'North Calif HCS, CA': 0.0898,
        'North Chicago, IL': -0.4589,
        'North Indiana HCS, IN': 0.3821,
        'Northampton, MA': 0.9286,
        'Northport, NY': -0.7006,
        'Oklahoma City, OK': 0.3729,
        'Orlando, FL': -0.0973,
        'Palo Alto, CA': 0.0027,
        'Philadelphia, PA': -0.0362,
        'Phoenix, AZ': 0.0134,
        'Pittsburgh, PA': 0.13,
        'Portland, OR': 0.1923,
        'Providence, RI': -0.1926,
        'Puget Sound HCS, WA': -0.4702,
        'Reno, NV': -0.2004,
        'Richmond, VA': -0.2133,
        'Roseburg, OR': 0.0356,
        'Saginaw, MI': -0.6793,
        'Salem, VA': 0.3818,
        'Salisbury, NC': 0.11,
        'Salt Lake City, UT': -0.1203,
        'San Diego, CA': 0.1899,
        'San Francisco, CA': -0.3222,
        'San Juan, PR': -0.5218,
        'Sheridan, WY': -0.0659,
        'Shreveport, LA': -0.2374,
        'Sioux Falls, SD': 0.5775,
        'South Arizona HCS, AZ': -0.8546,
        'South Texas HCS, TX': -0.2821,
        'Spokane, WA': 0.3399,
        'St. Cloud, MN': 0.8124,
        'St. Louis, MO': 0.1239,
        'Tampa, FL': -0.4678,
        'Texas Valley Coast HCS': 0.2377,
        'Togus, ME': 0.1129,
        'Tomah, WI': 0.5369,
        'Tuscaloosa, AL': 0.3359,
        'Walla Walla, WA': 0.6186,
        'Washington, DC': -0.5373,
        'West Palm Beach, FL': 0.1686,
        'White City, OR': 0.5024,
        'White River Jct., VT': 0.1218,
        'Wilkes-Barre, PA': -0.414
      },
      d_grade_by_step =  'occ_' + d.occ + '_grade_' + d.grade + '_step_' + d.step,
      c;

  c = grade_by_step[d_grade_by_step];
  logit += c ? c : grade_by_step['ALL OTHER ' + d.occ];

  c = grade_by_step_X_aptyrs[d_grade_by_step];
  logit += c ? c * d.aptyrs : grade_by_step_X_aptyrs['ALL OTHER ' + d.occ] * d.aptyrs;

  logit += performance[d.performance] || 0;

  logit += vamc[d.vamc] || 0;

  logit += d.unemployment * 100 * 0.0296;

  logit += d.aptyrs * -0.073;

  return 1/(1 + Math.exp(-logit));
}