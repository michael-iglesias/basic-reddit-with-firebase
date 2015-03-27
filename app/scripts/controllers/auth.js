'use strict';

app.controller('AuthCtrl', function ($window, $scope, $location, Auth) {

  if(Object.keys(Auth.user).length !== 0) {
    $location.path('/');
    $window.location.reload();
  }

  $scope.register = function () {
    Auth.register($scope.user).then(function(userData) {
      $location.path('/login');
    });
  }; // register

  $scope.login = function() {
    Auth.login($scope.user).then(function(authData) {
      angular.copy(authData, Auth.user);
      console.log(Auth.user);
      $location.path('/');
    });
  }; // login
});
