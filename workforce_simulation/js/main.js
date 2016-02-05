require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});

require(['app_controller'], function(app){
  window.a = app();
  a.init_with_data('./current_year_data.csv?123');
});