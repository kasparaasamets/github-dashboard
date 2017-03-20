angular.module('github-dashboard').controller('LoginCtrl', ['$scope', '$stateParams', '$location', '$window', 'GithubClient', 'User', '$state',
  function($scope, $stateParams, $location, $window, GithubClient, User, $state) {

    $scope.loading = false;
    $scope.errorMessage = '';

    $scope.login = function() {
      $scope.loading = true;
      User.login($scope.username, $scope.password).then(function() {
        $state.go('home', {});
      }, function(error) {
        $scope.errorMessage = error.data && error.data.message || error.statusText;
      }).finally(function() {
        $scope.loading = false;
      });
    };

  }
]);