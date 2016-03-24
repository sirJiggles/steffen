require('./')
  .controller('SettingsCtrl', SettingsCtrl);

/**
 * @ngInject
 */
function SettingsCtrl(settingsService) {

  var vm = this;

  vm.resetLocation = resetLocation;
  vm.locationUpdate = locationUpdate;

  // set the text of the input if it is there
  var place = settingsService.getLocation();
  if (place) {
    vm.place = place.name;
  }

  // simple function to reset location
  function resetLocation() {
    settingsService.setLocation(false);
    vm.place = '';
  }

  function locationUpdate() {
    if (vm.place.geometry) {
      // store the location
      settingsService.setLocation({
        position: {
          lat: vm.place.geometry.location.lat(),
          long: vm.place.geometry.location.lng()
        },
        name: vm.place.formatted_address
      });
    } else {
      settingsService.setLocation(false);
    }
  }

}
