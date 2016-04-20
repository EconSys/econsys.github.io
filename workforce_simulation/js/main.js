require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});

require(['app_controller'], function(app){
  window.a = app();
  // a.init_with_data('./data/nurses_201512.csv?1234');
  a.init_with_data('./data/ops_data.csv?1234');
});