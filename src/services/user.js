angular.module('github-dashboard').factory('User', ['$http', 'GithubClient', '$q',
  function($http, GithubClient, $q) {

    var userData = {};
    initUserData();

    function initUserData() {
      userData.myUserInfo = null;
      userData.myRepositories = null;
      userData.followedRepositories = null;
      userData.updateInProgress = false;
    }

    var service = {

      // Holds the user data and user repositories data from GitHub.
      data: userData,

      // Login with credentials.
      // Returns promise.
      login: function(username, password) {
        GithubClient.setCredentials(username, password);
        return service.updateUserData();
      },

      // Get user info and initialize repositories.
      // Returns promise.
      updateUserData: function() {
        var defer = $q.defer();
        GithubClient.getUserInfo().then(
          function(userInfo) {
            var promises = {
              myRepositories: GithubClient.getMyRepositories(userInfo),
              followedRepositories: GithubClient.getFollowedRepositories(userInfo)
            };
            $q.all(promises).then(
              function(results) {
                userData.myUserInfo = userInfo;
                userData.myRepositories = results.myRepositories;
                userData.followedRepositories = results.followedRepositories;
                defer.resolve();
              },
              defer.reject
            );
          },
          defer.reject
        );
        return defer.promise;
      },

      logout: function() {
        initUserData();
      }

    };

    return service;

  }
]);