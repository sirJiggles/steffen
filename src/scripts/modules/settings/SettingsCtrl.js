require('./')
  .controller('SettingsCtrl', SettingsCtrl);

/**
 * @ngInject
 */
function SettingsCtrl(settingsService) {

  var vm = this;

  vm.resetLocation = resetLocation;
  vm.locationUpdate = locationUpdate;
  
  // simple function to reset location
  function resetLocation() {
    settingsService.setLocation(false);
    input.value = '';
  }

  function locationUpdate() {
    if (vm.place.geometry) {
      // store the location
      settingsService.setLocation({
        lat: vm.place.geometry.location.lat(),
        long: vm.place.geometry.location.lng()
      });
    } else {
      settingsService.setLocation(false);
    }
  }

}
