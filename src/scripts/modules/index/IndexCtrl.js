require('./')
  .controller('IndexCtrl', IndexCtrl);

/**
 * @ngInject
 */
function IndexCtrl($cordovaDeviceOrientation) {

  var vm = this,
      castDistance = 50,
      color = 0,
      castTop = 0,
      castLeft = 0,
      compass = angular.element(document.querySelector('.compass')),
      box = angular.element(document.querySelector('.shadow__box')),
      step = 3,
      compassRotate = 0;

  // vars used for creating the shadow rules
  var shadow = '',
      opacity,
      top,
      left,
      trail;

  updateShadow(0);

  ionic.Platform.ready(function() {
    watchCompass();
  });
  var deg = 0;
  // tetsing spinning
  // window.setInterval(function() {
  //   deg = deg + 10;
  //   compass.css({transform: 'rotate('+deg+'deg)'});
  //   updateShadow(deg);
  // }, 500);


  function watchCompass() {
    var options = {
      frequency: 3000,
      filter: true
    };

    var watch = $cordovaDeviceOrientation.watchHeading(options).then(
      null,
      function(error) {
        // An error occurred
      },
      function(result) {   // updates constantly (depending on frequency value)
        compassRotate = result.magneticHeading;
        // update compass
        compass.css({transform: 'rotate('+compassRotate+'deg)'});
        // update shadow (dependant on direction)
        updateShadow(compassRotate);

      }
    );
  }

  function updateShadow(deg) {
    var azimuth = getSunLocation();
    var sunDeg = (azimuth * 180 / Math.PI);
    var relativeDeg = deg - sunDeg;
    // var radians = relativeDeg * 180 / Math.PI;
    // console.log(radians);
    azimuth = (-relativeDeg / 180 * Math.PI);

    castTop = Math.sin(azimuth);
    castLeft = -Math.cos(azimuth);

    shadow = '';

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

    box.css({boxShadow: shadow});
  }

  function getSunLocation() {
    // var times = SunCalc.getTimes(new Date(), 51.5, -0.1);
    var position = SunCalc.getPosition(new Date(), 51.5, -0.1);
    return position.azimuth;
  }

}
