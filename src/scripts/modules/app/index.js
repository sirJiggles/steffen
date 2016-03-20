module.exports = angular.module('app', [
  'ui.router',
  'ionic',
  'ngCordova',
  'ngAnimate',
  require('../index').name,
  require('../settings').name,
  require('../settings-service').name
]);

require('./config.js');
require('./AppCtrl.js');
