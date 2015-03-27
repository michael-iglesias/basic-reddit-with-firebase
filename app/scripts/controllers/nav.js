'use strict';

app.controller('NavCtrl', function($scope, $location, Post, Auth) {
  $scope.post = {url: 'http://', title: ''};
  $scope.isLoggedIn = Auth.isLoggedIn();

    $scope.submitPost = function () {
      Post.createPost($scope.post).then(function (ref) {
        $location.path('/posts/' + ref.name());
        $scope.post = {url: 'http://', title: ''};
      });
    };

    $scope.logout = function() {
      Auth.logout();
    };
});
