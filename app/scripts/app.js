/* global app: true */
/* exported app */

'use strict';

/**
 * @ngdoc overview
 * @name angRedApp
 * @description
 * # angRedApp
 *
 * Main module of the application.
 */
var app = angular
  .module('angRedApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .constant('FIREBASE_URL', 'https://ang-red.firebaseio.com/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl',
        resolve: {
          "currentAuth": ['AuthFB', function(AuthFB) {
            return AuthFB.$requireAuth();
          }]
        }
      })
      .when('/posts/:postId', {
        templateUrl: 'views/postview.html',
        controller: 'PostviewCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  // Firebase Factory that generates $firebaseAuth instance
  app.factory('AuthFB', ['$firebaseAuth', function($firebaseAuth) {
    var ref = new Firebase('https://attendancemciapp.firebaseio.com/');
    return $firebaseAuth(ref);
  }]);

  app.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === 'AUTH_REQUIRED') {
        $location.path('/login');
      }
    });
  }]);
