require('./')
  .service('settingsService', settingsService);

/**
 * @ngInject
 */
function settingsService() {

  var settings;

  // Interface for the service
  return {
    getLocation: getLocation,
    setLocation: setLocation
  };

  // Getters
  function getLocation() {
    return getAttr('location', false);
  }

  // function for the getters to make sure data that is 0 is valid
  function getAttr(name, normal) {
    var data = getData();
    data = data[name];
    return (data !== undefined) ? data : normal;
  }

  // Setters
  function setLocation(position) {
    setAttr('location', position);
  }

  // used by all the setters
  function setAttr(name, value) {
    var data = getData() || {};
    data[name] = value;
    storeData(data);
  }

  function getData() {
    // if we previously got the store return last value of it
    if (settings) {
      return settings;
    }

    // else try get the data
    var data = JSON.parse(localStorage.getItem('steffen'));
    if (data === null) {
      return false;
    }
    settings = data;
    return data;
  }

  function storeData(data) {
    localStorage.setItem('steffen', JSON.stringify(data));
    // update settings (as there was a modification)
    settings = data;
  }

  function saveData(data) {
    // for everything supplied adjust it in the local store
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var storage = getData() || {};
        storage[key] = data[key];
        storeData(storage);
      }
    }
  }

}
