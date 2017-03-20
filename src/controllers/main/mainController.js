angular.module('github-dashboard').controller('MainCtrl', ['$scope', '$state', 'User',
  function($scope, $state, User) {

    $scope.userData = User.data;

    $state.go('login');

    // "Logout" button pressed
    $scope.logout = function() {
      User.logout();
      $state.go('login');
    }

  }
]);