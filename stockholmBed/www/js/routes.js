angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('tabsController.page2', {
        url: '/stockholm_bed_&_breakfast',
        views: {
          'tab1': {
            templateUrl: 'templates/home.html',
            controller: 'page2Ctrl'
          }
        }
      })

      .state('tabsController.rum', {
        url: '/rooms',
        views: {
          'tab2': {
            templateUrl: 'templates/rooms.html',
            controller: 'rumCtrl'
          }
        }
      })

      .state('tabsController', {
        url: '/rooms',
        templateUrl: 'templates/tabsController.html',
        abstract: true
      })

      .state('tabsController.information', {
        url: '/rooms/details/:rId',
        views: {
          'tab2': {
            templateUrl: 'templates/information.html',
            controller: 'informationCtrl'
          }
        }
      })

      .state('tabsController.reservation', {
        url: '/reservation',
        views: {
          'tab2': {
            templateUrl: 'templates/reservation.html',
            controller: 'reservationCtrl'
          }
        }
      })

      .state('confirmation', {
        url: '/confirmation',
        templateUrl: 'templates/confirmation.html',
        controller: 'confirmationCtrl'
      })

    //Starts the homepage
    $urlRouterProvider.otherwise('/rooms/stockholm_bed_&_breakfast')
  });
