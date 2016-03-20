(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// main entry point for the app
require('./modules/app');

},{"./modules/app":5}],2:[function(require,module,exports){
require('./')
  .controller('AppCtrl', AppCtrl);

/**
 * @ngInject
 */
function AppCtrl() {
  // @TODO insert content
}

},{"./":5}],3:[function(require,module,exports){
module.exports = "<ui-view></ui-view>";

},{}],4:[function(require,module,exports){
require('./')
  .config(config);

/**
 * @ngInject
 */
function config($stateProvider, $urlRouterProvider) {

  $stateProvider.state('app', {
    abstract: true,
    template: require('./app.html'),
    controller: 'AppCtrl as vm'
  });

  $urlRouterProvider.when('', '/');
}
config.$inject = ["$stateProvider", "$urlRouterProvider"];

},{"./":5,"./app.html":3}],5:[function(require,module,exports){
module.exports = angular.module('app', [
  'ui.router',
  'ngAnimate',
  require('../index').name
]);

require('./config.js');
require('./AppCtrl.js');

},{"../index":9,"./AppCtrl.js":2,"./config.js":4}],6:[function(require,module,exports){
require('./')
  .controller('IndexCtrl', IndexCtrl);

/**
 * @ngInject
 */
function IndexCtrl() {

  var vm = this,
      box = angular.element(document.querySelector('.shadow__box')),
      castDistance = 30,
      color = 0,
      castTop = 0,
      castLeft = 0,
      step = 3;

  // vars used for creating the shadow rules
  var shadow = '',
      opacity,
      top,
      left,
      trail;

  var azimuth = getSunLocation();

  // TODO offest the deg based on direction you are facing
  castTop = -Math.sin(azimuth);
  castLeft = -Math.cos(azimuth);

  for (var i = 1; i <= castDistance; i++) {
    // opacity is based on how much of the shadow is left to be cast
    percentOfNumbersUsed = ((castDistance - i) / castDistance) * 100;
    opacity = (percentOfNumbersUsed / 5000);
    // calculate using the deg the cast direction
    top = (castTop * i) * step;
    left = (castLeft * i) * step;
    trail = (i !== castDistance) ? ',' : '';
    shadow += 'rgba('+color+','+color+','+color+','+opacity+') '+top+'px '+left+'px 1px 3px'+trail;
  }

  box.css('box-shadow', shadow);

}

function getSunLocation() {
  // var times = SunCalc.getTimes(new Date(), 51.5, -0.1);
  var position = SunCalc.getPosition(new Date(), 51.5, -0.1);
  // console.log(position);
  // convert the position into degrees
  return position.azimuth;
  // return (position.azimuth * 180 / Math.PI + 180) % 360;
}

},{"./":9}],7:[function(require,module,exports){
require('./')
  .config(config);

/**
 * @ngInject
 */
function config($stateProvider) {
  $stateProvider
    .state('index', {
      url: '/',
      parent: 'app',
      controller: 'IndexCtrl as vm',
      template: require('./index.html')
    });
}
config.$inject = ["$stateProvider"];

},{"./":9,"./index.html":8}],8:[function(require,module,exports){
module.exports = "<div class=shadow><div class=shadow__box id=box></div></div>";

},{}],9:[function(require,module,exports){
module.exports = angular.module('app.index', [
  'ui.router',
  'ngAnimate'
]);

require('./config.js');
require('./IndexCtrl.js');

},{"./IndexCtrl.js":6,"./config.js":7}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9nYXJldGhmdWxsZXIvRGV2ZWxvcG1lbnQvc3RlZmZlbi9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2dhcmV0aGZ1bGxlci9EZXZlbG9wbWVudC9zdGVmZmVuL3NyYy9zY3JpcHRzL2Zha2VfNTUzOGI4MjAuanMiLCIvVXNlcnMvZ2FyZXRoZnVsbGVyL0RldmVsb3BtZW50L3N0ZWZmZW4vc3JjL3NjcmlwdHMvbW9kdWxlcy9hcHAvQXBwQ3RybC5qcyIsIi9Vc2Vycy9nYXJldGhmdWxsZXIvRGV2ZWxvcG1lbnQvc3RlZmZlbi9zcmMvc2NyaXB0cy9tb2R1bGVzL2FwcC9hcHAuaHRtbCIsIi9Vc2Vycy9nYXJldGhmdWxsZXIvRGV2ZWxvcG1lbnQvc3RlZmZlbi9zcmMvc2NyaXB0cy9tb2R1bGVzL2FwcC9jb25maWcuanMiLCIvVXNlcnMvZ2FyZXRoZnVsbGVyL0RldmVsb3BtZW50L3N0ZWZmZW4vc3JjL3NjcmlwdHMvbW9kdWxlcy9hcHAvaW5kZXguanMiLCIvVXNlcnMvZ2FyZXRoZnVsbGVyL0RldmVsb3BtZW50L3N0ZWZmZW4vc3JjL3NjcmlwdHMvbW9kdWxlcy9pbmRleC9JbmRleEN0cmwuanMiLCIvVXNlcnMvZ2FyZXRoZnVsbGVyL0RldmVsb3BtZW50L3N0ZWZmZW4vc3JjL3NjcmlwdHMvbW9kdWxlcy9pbmRleC9jb25maWcuanMiLCIvVXNlcnMvZ2FyZXRoZnVsbGVyL0RldmVsb3BtZW50L3N0ZWZmZW4vc3JjL3NjcmlwdHMvbW9kdWxlcy9pbmRleC9pbmRleC5odG1sIiwiL1VzZXJzL2dhcmV0aGZ1bGxlci9EZXZlbG9wbWVudC9zdGVmZmVuL3NyYy9zY3JpcHRzL21vZHVsZXMvaW5kZXgvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gbWFpbiBlbnRyeSBwb2ludCBmb3IgdGhlIGFwcFxucmVxdWlyZSgnLi9tb2R1bGVzL2FwcCcpO1xuIiwicmVxdWlyZSgnLi8nKVxuICAuY29udHJvbGxlcignQXBwQ3RybCcsIEFwcEN0cmwpO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5mdW5jdGlvbiBBcHBDdHJsKCkge1xuICAvLyBAVE9ETyBpbnNlcnQgY29udGVudFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjx1aS12aWV3PjwvdWktdmlldz5cIjtcbiIsInJlcXVpcmUoJy4vJylcbiAgLmNvbmZpZyhjb25maWcpO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5mdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdhcHAnLCB7XG4gICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vYXBwLmh0bWwnKSxcbiAgICBjb250cm9sbGVyOiAnQXBwQ3RybCBhcyB2bSdcbiAgfSk7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLndoZW4oJycsICcvJyk7XG59XG5jb25maWcuJGluamVjdCA9IFtcIiRzdGF0ZVByb3ZpZGVyXCIsIFwiJHVybFJvdXRlclByb3ZpZGVyXCJdO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAndWkucm91dGVyJyxcbiAgJ25nQW5pbWF0ZScsXG4gIHJlcXVpcmUoJy4uL2luZGV4JykubmFtZVxuXSk7XG5cbnJlcXVpcmUoJy4vY29uZmlnLmpzJyk7XG5yZXF1aXJlKCcuL0FwcEN0cmwuanMnKTtcbiIsInJlcXVpcmUoJy4vJylcbiAgLmNvbnRyb2xsZXIoJ0luZGV4Q3RybCcsIEluZGV4Q3RybCk7XG5cbi8qKlxuICogQG5nSW5qZWN0XG4gKi9cbmZ1bmN0aW9uIEluZGV4Q3RybCgpIHtcblxuICB2YXIgdm0gPSB0aGlzLFxuICAgICAgYm94ID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGFkb3dfX2JveCcpKSxcbiAgICAgIGNhc3REaXN0YW5jZSA9IDMwLFxuICAgICAgY29sb3IgPSAwLFxuICAgICAgY2FzdFRvcCA9IDAsXG4gICAgICBjYXN0TGVmdCA9IDAsXG4gICAgICBzdGVwID0gMztcblxuICAvLyB2YXJzIHVzZWQgZm9yIGNyZWF0aW5nIHRoZSBzaGFkb3cgcnVsZXNcbiAgdmFyIHNoYWRvdyA9ICcnLFxuICAgICAgb3BhY2l0eSxcbiAgICAgIHRvcCxcbiAgICAgIGxlZnQsXG4gICAgICB0cmFpbDtcblxuICB2YXIgYXppbXV0aCA9IGdldFN1bkxvY2F0aW9uKCk7XG5cbiAgLy8gVE9ETyBvZmZlc3QgdGhlIGRlZyBiYXNlZCBvbiBkaXJlY3Rpb24geW91IGFyZSBmYWNpbmdcbiAgY2FzdFRvcCA9IC1NYXRoLnNpbihhemltdXRoKTtcbiAgY2FzdExlZnQgPSAtTWF0aC5jb3MoYXppbXV0aCk7XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPD0gY2FzdERpc3RhbmNlOyBpKyspIHtcbiAgICAvLyBvcGFjaXR5IGlzIGJhc2VkIG9uIGhvdyBtdWNoIG9mIHRoZSBzaGFkb3cgaXMgbGVmdCB0byBiZSBjYXN0XG4gICAgcGVyY2VudE9mTnVtYmVyc1VzZWQgPSAoKGNhc3REaXN0YW5jZSAtIGkpIC8gY2FzdERpc3RhbmNlKSAqIDEwMDtcbiAgICBvcGFjaXR5ID0gKHBlcmNlbnRPZk51bWJlcnNVc2VkIC8gNTAwMCk7XG4gICAgLy8gY2FsY3VsYXRlIHVzaW5nIHRoZSBkZWcgdGhlIGNhc3QgZGlyZWN0aW9uXG4gICAgdG9wID0gKGNhc3RUb3AgKiBpKSAqIHN0ZXA7XG4gICAgbGVmdCA9IChjYXN0TGVmdCAqIGkpICogc3RlcDtcbiAgICB0cmFpbCA9IChpICE9PSBjYXN0RGlzdGFuY2UpID8gJywnIDogJyc7XG4gICAgc2hhZG93ICs9ICdyZ2JhKCcrY29sb3IrJywnK2NvbG9yKycsJytjb2xvcisnLCcrb3BhY2l0eSsnKSAnK3RvcCsncHggJytsZWZ0KydweCAxcHggM3B4Jyt0cmFpbDtcbiAgfVxuXG4gIGJveC5jc3MoJ2JveC1zaGFkb3cnLCBzaGFkb3cpO1xuXG59XG5cbmZ1bmN0aW9uIGdldFN1bkxvY2F0aW9uKCkge1xuICAvLyB2YXIgdGltZXMgPSBTdW5DYWxjLmdldFRpbWVzKG5ldyBEYXRlKCksIDUxLjUsIC0wLjEpO1xuICB2YXIgcG9zaXRpb24gPSBTdW5DYWxjLmdldFBvc2l0aW9uKG5ldyBEYXRlKCksIDUxLjUsIC0wLjEpO1xuICAvLyBjb25zb2xlLmxvZyhwb3NpdGlvbik7XG4gIC8vIGNvbnZlcnQgdGhlIHBvc2l0aW9uIGludG8gZGVncmVlc1xuICByZXR1cm4gcG9zaXRpb24uYXppbXV0aDtcbiAgLy8gcmV0dXJuIChwb3NpdGlvbi5hemltdXRoICogMTgwIC8gTWF0aC5QSSArIDE4MCkgJSAzNjA7XG59XG4iLCJyZXF1aXJlKCcuLycpXG4gIC5jb25maWcoY29uZmlnKTtcblxuLyoqXG4gKiBAbmdJbmplY3RcbiAqL1xuZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdpbmRleCcsIHtcbiAgICAgIHVybDogJy8nLFxuICAgICAgcGFyZW50OiAnYXBwJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdJbmRleEN0cmwgYXMgdm0nLFxuICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaW5kZXguaHRtbCcpXG4gICAgfSk7XG59XG5jb25maWcuJGluamVjdCA9IFtcIiRzdGF0ZVByb3ZpZGVyXCJdO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9c2hhZG93PjxkaXYgY2xhc3M9c2hhZG93X19ib3ggaWQ9Ym94PjwvZGl2PjwvZGl2PlwiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwLmluZGV4JywgW1xuICAndWkucm91dGVyJyxcbiAgJ25nQW5pbWF0ZSdcbl0pO1xuXG5yZXF1aXJlKCcuL2NvbmZpZy5qcycpO1xucmVxdWlyZSgnLi9JbmRleEN0cmwuanMnKTtcbiJdfQ==
