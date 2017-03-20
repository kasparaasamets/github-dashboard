angular.module('github-dashboard').controller('HomeCtrl', ['$scope', '$stateParams', '$location', '$window', 'GithubClient', 'User', '$q',
  function($scope, $stateParams, $location, $window, GithubClient, User, $q) {

    // Selected tab from router
    $scope.repositoryGroup = $stateParams.repositoryGroup;

    $scope.userData = User.data;

    // "Refresh details" button pressed
    $scope.refreshDetails = function() {
      User.updateUserData().then(function() {
        updateRepositoryDetails();
      }, function(error) {
        $scope.errorMessage = error.data && error.data.message || error.statusText;
      });
    };

    // Fill in pull requests, commits and issues for all repositories
    function updateRepositoryDetails() {
      $scope.userData.updateInProgress = true;
      var repository = getNextRepositoryToUpdate();
      if (!repository) {
        // All done
        $scope.userData.updateInProgress = false;
        return;
      }
      var promises = {
        pullRequests: GithubClient.getPullRequests(repository),
        commits: GithubClient.getCommits(repository),
        issues: GithubClient.getIssues(repository)
      };
      $q.all(promises).then(function(results) {
        repository.details = results;
        if ($scope.userData.updateInProgress) {
          // Iterate recursively
          updateRepositoryDetails();
        }
      }, function(error) {
        $scope.errorMessage = error.data && error.data.message || error.statusText;
        $scope.userData.updateInProgress = false;
      });
    }

    // Start updating immediately
    if (!$scope.userData.updateInProgress) {
      updateRepositoryDetails();
    }

    // Get first repository without details
    function getNextRepositoryToUpdate() {
      var repositoryCollections = [$scope.userData.myRepositories, $scope.userData.followedRepositories];
      for (var i = 0; i < repositoryCollections.length; i++) {
        for (var j = 0; j < repositoryCollections[i].length; j++) {
          if (!repositoryCollections[i][j].details) {
            return repositoryCollections[i][j];
          }
        }
      }
      return false;
    }

  }
]);