var app = angular.module('pivotalAngular', ['ui.router', 'controllers', 'services']);
//set up app routing
app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');
  //set up app states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl'
    });
});
