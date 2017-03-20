angular.module('github-dashboard').factory('GithubClient', ['$http', '$q', '$base64',
  function($http, $q, $base64) {

    var credentials = {
      username: null,
      basicAuth: null
    };

    // Brief pagination for dashboard overview
    var pagination = '?page=1&per_page=3';

    // Generate HTTP headers for request.
    function getHeaders() {
      var headers = {
        // Set GitHub API version
        'Accept': 'application/vnd.github.v3+json'
      };
      if (credentials.basicAuth) {
        headers['Authorization'] = 'Basic ' + credentials.basicAuth;
      }
      return headers;
    }

    // Remove placeholder from GitHub resource URL as we only need the general listing
    function clearPlaceholders(url) {
      return url.replace(/{[^\}]+}/g, '');
    }

    // Generic GET HTTP request
    // Returns promise
    function makeRequest(url) {
      var defer = $q.defer();
      $http.get(url, {'headers': getHeaders()}).then(
        function(response) {
          defer.resolve(response.data);
        }, function(error) {
          if (error.status === 404) {
            // Repositories with malformed names return 404, no reason to halt the process.
            defer.resolve({});
          } else {
            defer.reject(error);
          }
        }
      );
      return defer.promise;
    }

    // Generic GET HTTP request + pagination + placeholders from URL removed
    // Returns promise
    function makeDetailsRequest(url) {
      url = clearPlaceholders(url) + pagination;
      return makeRequest(url);
    }

    return {

      // Initialize the credentials that will be used for following requests
      setCredentials: function(username, password) {
        credentials.username = username;
        if (password) {
          credentials.basicAuth = $base64.encode(username + ':' + password);
        } else {
          credentials.basicAuth = null;
        }
      },

      // https://developer.github.com/v3/users/#get-a-single-user
      // Returns promise
      getUserInfo: function() {
        return makeRequest('https://api.github.com/users/' + credentials.username);
      },

      // https://developer.github.com/v3/repos/#list-user-repositories
      // Returns promise
      getMyRepositories: function(userInfo) {
        return makeRequest(userInfo.repos_url);
      },

      // https://developer.github.com/v3/activity/watching/#list-repositories-being-watched
      // Returns promise
      getFollowedRepositories: function(userInfo) {
        return makeRequest(userInfo.subscriptions_url);
      },

      // https://developer.github.com/v3/pulls/#list-pull-requests
      // Returns promise
      getPullRequests: function(repository) {
        return makeDetailsRequest(repository.pulls_url);
      },

      // https://developer.github.com/v3/issues/#list-issues-for-a-repository
      // Returns promise
      getIssues: function(repository) {
        return makeDetailsRequest(repository.issues_url);
      },

      // https://developer.github.com/v3/repos/commits/#list-commits-on-a-repository
      // Returns promise
      getCommits: function(repository) {
        return makeDetailsRequest(repository.commits_url);
      }

    }

  }
]);