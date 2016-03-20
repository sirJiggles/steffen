module.exports = angular.module('app', [
  'ui.router',
  'ionic',
  'ngAnimate',
  require('../index').name,
  require('../settings').name
]);

require('./config.js');
require('./AppCtrl.js');
