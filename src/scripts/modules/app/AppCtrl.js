require('./')
  .controller('AppCtrl', AppCtrl);

/**
 * @ngInject
 */
function AppCtrl($cordovaStatusbar) {
  ionic.Platform.ready(function() {
    if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
      $cordovaStatusbar.hide();
    }
  });
}
