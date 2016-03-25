require('./')
  .controller('IndexCtrl', IndexCtrl);

/**
 * @ngInject
 */
function IndexCtrl(
  $cordovaDeviceOrientation,
  $cordovaGeolocation,
  settingsService,
  $interval) {

  // init all our vars
  var vm = this,
      castDistance = 40,
      color = 0,
      castTop = 0,
      castLeft = 0,
      compass = angular.element(document.querySelector('.compass')),
      box = angular.element(document.querySelector('.shadow__box')),
      step = 3,
      compassRotate = 0,
      shadow = '',
      opacity,
      times,
      top,
      left,
      trail,
      lat,
      sunrise = false,
      sunset = false,
      backgroundOne = 'sand-babe',
      backgroundTwo = 'kentucky-dawn',
      bgMode = 1,
      long;

  // Arrays for the different backgrounds that can be possible
  var dawns = ['sand-babe','beach-towel','sky-blush','kentucky-dawn','slate-sunrise','blue-peach','pixy-dust','rainbow-pudding'],
      days = ['pale-elm','pastel-daylight','dolphin','field-day','seafoam-sun','brilliant-sky','mountain-time','candy-day'],
      sunsets = ['bruised-grape','violet-blush','lavender-skies','purple-sunset','brownie','tequila-sunset','sutro','berry-juice'],
      nights = ['indigo-magic','lady-night','mauve-hour','magic-hour','grape-soda','coyier-magic','baseball-field','miami-strip'];

  // lame that we need to do this but we cant animate bg gradients in CSS
  vm.getBackgroundOne = getBackgroundOne;
  vm.getBackgroundTwo = getBackgroundTwo;

  // boolean for the day
  vm.day = true;

  var settingsLatLong = settingsService.getLocation();

  if (!settingsLatLong) {
    // get the at long of the user
    $cordovaGeolocation.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then(function(position){
      run({
        lat: position.coords.latitude,
        long: position.coords.longitude
      });
    });

  } else {
    run(settingsLatLong.position);
  }

  ionic.Platform.ready(function() {
    watchCompass();
  });

  function run(position) {
    lat = position.lat;
    long = position.long;

    // store the times only once (when sunrise etc)
    times = SunCalc.getTimes(new Date(), lat, long);

    // function to set if night or day
    checkIfNight();

    // sunset / rise ticker
    tick();
    $interval(function() {
      tick();
    }, 1000);

    updateScreen();
    $interval(function() {
      updateScreen();
    }, 20000);
  }

  function checkIfNight() {
    // check if it is night
    var now = new Date();
    if (now > times.sunset || now < times.sunrise) {
      vm.day = false;
    }

    // so we dont duplicate creating this
    return now;
  }

  // this is called every few mins for things like bg
  function updateScreen() {
    updateShadow(compassRotate);
    // Pick the gradient for the background
    var now = new Date(),
        newBackground;

    if (now > times.dawn && now < times.sunriseEnd) {
      sunrise = true;
      newBackground = pickRandomItem(dawns);
    } else if(now > times.sunriseEnd && now < times.sunsetStart) {
      newBackground = pickRandomItem(days);
      sunrise = false;
      sunset = false;
    } else if(now > times.sunsetStart && now < times.sunset) {
      sunset = true;
      newBackground = pickRandomItem(sunsets);
    } else {
      newBackground = pickRandomItem(nights);
      sunrise = false;
      sunset = false;
    }

    if (bgMode === 2) {
      backgroundOne = newBackground;
      bgMode = 1;
    } else {
      bgMode = 2;
      backgroundTwo = newBackground;
    }
  }

  function getBackgroundOne() {
    return (bgMode === 1) ? backgroundOne : 'fade-out '+backgroundOne;
  }

  function getBackgroundTwo() {
    return (bgMode === 2) ? backgroundTwo : 'fade-out '+backgroundTwo;
  }

  // pick a random for gradient
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
      function(result) {
        compassRotate = result.magneticHeading;
        // update compass
        compass.css({transform: 'rotate('+compassRotate+'deg)'});
        // update shadow (dependant on direction)
        updateShadow(compassRotate);
      }
    );
  }

  function updateShadow(deg) {
    var position = (vm.day) ? getSunPosition() : getMoonPosition();

    var azimuth = position.azimuth;
    var sunDeg = (azimuth * 180 / Math.PI);
    var relativeDeg = deg - sunDeg;
    azimuth = (-relativeDeg / 180 * Math.PI);

    // create direction vector for the shadow
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

  // get sun from lib
  function getSunPosition() {
    return SunCalc.getPosition(new Date(), lat, long);
  }

  // get moon from lib
  function getMoonPosition() {
    return SunCalc.getMoonPosition(new Date(), lat, long);
  }

  // the ticker for the sunset / sunrise countdown
  function tick() {
    var diff = 0;

    // re check the now stamp
    var now = checkIfNight();

    if (vm.day) {
      if (sunrise) {
        vm.setText = 'Sunrise!';
      } else if (sunset) {
        vm.setText = 'Sunset!';
      } else {
        vm.setText = 'Sunset in';
        diff = times.sunsetStart - now;
      }
    } else {
      vm.setText = 'Sunrise in';
      diff = times.sunrise - now;
    }

    if (diff) {
      // strange that we need to remove an hour ..
      diff = diff - 3600000;
      vm.countdown = new Date(diff);
    } else {
      vm.countdown = false;
    }
  }

}
