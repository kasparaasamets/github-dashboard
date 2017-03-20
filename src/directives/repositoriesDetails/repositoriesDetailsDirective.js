angular.module('github-dashboard').directive('repositoriesDetails', [function() {

  return {
    restrict: 'E',
    templateUrl: 'repositoriesDetails/repositoriesDetailsView.html',
    transclude: true,
    scope: {
      repositories: '='
    }
  }

}]);