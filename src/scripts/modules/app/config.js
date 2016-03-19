require('./')
  .config(config);

/**
 * @ngInject
 */
function config($stateProvider, $urlRouterProvider) {

  $stateProvider.state('app', {
    abstract: true,
    template: require('./app.html'),
    controller: 'AppCtrl as vm'
  });

  $urlRouterProvider.when('', '/');
}
