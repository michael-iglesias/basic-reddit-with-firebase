'use strict';

app.factory('Post', function($firebaseArray, $firebaseObject, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL + 'posts');
  var posts = $firebaseArray(ref);

  var Post = {
    all: posts,

    createPost: function(obj) {
      return posts.$add(obj);
    },

    get: function(id) {
      var recordRef = new Firebase(FIREBASE_URL + 'posts/' + id);
      return $firebaseObject(recordRef);
    },

    delete: function(post) {
      return posts.$remove(post);
    }
  }; // Post{}

  return Post;
});
