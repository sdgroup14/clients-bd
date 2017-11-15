(function() {
  'use strict';

  angular
    .module('espot', [
      'ui.router',
      'ngAnimate',
      'espot.index',
      'espot.search',
      'espot.kitchen',
      'espot.kitchen-result',
      'espot.kitchen-list',
      'espot.special-offers',
      'espot.institution',
      'espot.map',
      'espot.institution-info',
      'espot.institution-menu',
      'espot.institution-map',
      'espot.institution-reviews'
    ])
    .controller('AppCtrl', AppCtrl)
    .config(Config);


  AppCtrl.$inject = ['$scope', '$rootScope', '$timeout', '$transitions'];

  function AppCtrl($scope, $rootScope, $timeout, $transitions) {



  };

  Config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function Config($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('root', {
        url: '/',
        controller: AppCtrl,
        redirectTo: 'index',
      });
  };

})();