'use strict';

app.factory('Auth', function($firebase, $firebaseAuth, FIREBASE_URL, $rootScope, $location, $window) {
  var ref = new Firebase(FIREBASE_URL);
  var simpleLogin = $firebaseAuth(ref);

  var authObj = {

    register: function(user) {
      return simpleLogin.$createUser({
        email: user.email,
        password: user.password
      })
      .then(function(userData) {
        return userData;
      });
    }, // register

    login: function(user) {
      return simpleLogin.$authWithPassword({
        email: user.email,
        password: user.password
      });
    }, // login

    resolveUser: function() {
      return simpleLogin.$getAuth();
    }, // resolveUser

    isLoggedIn: function() {
      if(simpleLogin.$getAuth()) {
        return true;
      } else {
        return false;
      }
    }, // isLoggedIn

    logout: function() {
      angular.copy({}, authObj.user);
      simpleLogin.$unauth();
      $location.path('/login');
      $window.location.reload();
    }, // logout

    user: {}
  }; // Auth

  return authObj;

}); // Auth
