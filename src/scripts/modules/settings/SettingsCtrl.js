require('./')
  .controller('SettingsCtrl', SettingsCtrl);

/**
 * @ngInject
 */
function SettingsCtrl(settingsService) {

  var vm = this;

  vm.resetLocation = resetLocation;

  var input = document.getElementById('location');
  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
      // store the location
      settingsService.setLocation({
        lat: place.geometry.location.lat(),
        long: place.geometry.location.lng()
      });
    } else {
      settingsService.setLocation(false);
    }

  });

  // simple function to reset location
  function resetLocation() {
    settingsService.setLocation(false);
    input.value = '';
  }

}
