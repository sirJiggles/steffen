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
