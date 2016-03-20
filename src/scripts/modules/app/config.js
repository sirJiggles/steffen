require('./')
  .config(config);

/**
 * @ngInject
 */
function config(
  $stateProvider,
  $urlRouterProvider,
  $ionicConfigProvider) {

  $stateProvider.state('app', {
    abstract: true,
    template: require('./app.html'),
    controller: 'AppCtrl as vm'
  });

  $ionicConfigProvider.tabs.position('bottom');

  $urlRouterProvider.when('', '/');
}
