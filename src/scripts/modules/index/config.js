require('./')
  .config(config);

/**
 * @ngInject
 */
function config($stateProvider) {
  $stateProvider
    .state('index', {
      url: '/',
      cache: false,
      parent: 'app',
      controller: 'IndexCtrl as vm',
      template: require('./index.html')
    });
}
