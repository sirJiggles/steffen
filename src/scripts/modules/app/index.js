module.exports = angular.module('app', [
  'ui.router',
  'ngAnimate',
  require('../index').name
]);

require('./config.js');
require('./AppCtrl.js');
