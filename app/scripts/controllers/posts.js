'use strict';

app.controller('PostsCtrl', function($scope, $location, Post) {
  $scope.posts = Post.all;
  $scope.post = {url: 'http://', title: ''};

  $scope.submitPost = function() {
    Post.createPost($scope.post).then(function(record) {
      $location.path('/posts/' + record.name());
    });
  };

  $scope.deletePost = function(post) {
    Post.delete(post);
  };
});
