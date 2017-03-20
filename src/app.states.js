angular.module('github-dashboard')
  .config(function($stateProvider) {

    var loginState = {
      name: 'login',
      url: '/login',
      templateUrl: 'login/loginView.html'
    };

    var homeState = {
      name: 'home',
      url: '/home/{repositoryGroup}',
      params: {
        repositoryGroup: 'my-repositories'
      },
      templateUrl: 'home/homeView.html'
    };

    $stateProvider.state(loginState);
    $stateProvider.state(homeState);

  }
);

