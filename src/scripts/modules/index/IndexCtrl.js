require('./')
  .controller('IndexCtrl', IndexCtrl);

/**
 * @ngInject
 */
function IndexCtrl(
  $cordovaDeviceOrientation,
  $cordovaGeolocation,
  $interval) {

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
      times,
      sunsetIn,
      sunriseIn,
      top,
      left,
      trail,
      lat,
      long;

  // Arrays for the different backgrounds that can be possible
  var dawns = ['sand-babe','beach-towel','sky-blush','kentucky-dawn','slate-sunrise','blue-peach','pixy-dust','rainbow-pudding'],
      days = ['pale-elm','pastel-daylight','dolphin','field-day','seafoam-sun','brilliant-sky','mountain-time','candy-day'],
      sunsets = ['bruised-grape','violet-blush','lavender-skies','purple-sunset','brownie','tequila-sunset','sutro','berry-juice'],
      nights = ['indigo-magic','lady-night','mauve-hour','magic-hour','grape-soda','coyier-magic','baseball-field','miami-strip'];


  vm.background = 'sand-babe';
  vm.rising = false;

  // get the at long of the user
  $cordovaGeolocation.getCurrentPosition({
    timeout: 10000,
    enableHighAccuracy: true
  }).then(function(position){
    lat = position.coords.latitude;
    long = position.coords.longitude;

    // store the times only once (when sunrise etc)
    times = SunCalc.getTimes(new Date(), lat, long);
    sunsetIn = new Date(times.sunset);
    sunriseIn = new Date(times.sunrise);

    // sunset / rise ticker
    tick();
    $interval(function() {
      tick();
    }, 1000);

    updateScreen();
    $interval(function() {
      updateScreen();
    }, 300000);

  });

  ionic.Platform.ready(function() {
    watchCompass();
  });

  // this is called every five mins for things like bg
  function updateScreen() {
    updateShadow(0);
    // Pick the gradient for the background
    var now = new Date();
    var gradient = '';

    if (now > times.dawn && now < times.sunriseEnd) {
      gradient = pickRandomItem(dawns);
    } else if(now > times.sunriseEnd && now < times.sunsetStart) {
      gradient = pickRandomItem(days);
    } else if(now < times.sunsetStart && now < times.sunsetEnd) {
      gradient = pickRandomItem(sunsets);
    } else {
      gradient = pickRandomItem(nights);
    }

    vm.background = gradient;
  }

  function pickRandomItem(array) {
    return array[Math.floor(Math.random()*array.length)];
  }

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
    azimuth = (-relativeDeg / 180 * Math.PI);

    castTop = Math.sin(azimuth);
    castLeft = -Math.cos(azimuth);

    // reset shadow before casting a new one
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
    var position = SunCalc.getPosition(new Date(), lat, long);
    return position.azimuth;
  }

  // the ticker for the sunset / sunrise countdown
  function tick() {
    var now = new Date();
    var diff = 0;

    if (now < sunsetIn) {
      vm.setText = 'Sunset in';
      vm.rising = false;
      diff = sunsetIn - now;
    } else {
      vm.setText = 'Sunrise in';
      diff = sunriseIn - now;
      vm.rising = true;
    }

    diff = diff - 3600000;

    // not sure why and extra hour is getting added on  ...
    vm.countdown = new Date(diff);
  }

}
