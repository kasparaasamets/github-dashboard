(function(module) {
try {
  module = angular.module('appPartials');
} catch (e) {
  module = angular.module('appPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/homeView.html',
    '<div ng-controller="HomeCtrl">\n' +
    '\n' +
    '    <button ng-click="refreshDetails()" class="refresh-details-btn btn btn-success" ng-disabled="userData.updateInProgress">\n' +
    '        <span ng-if="!userData.updateInProgress">Refresh data</span>\n' +
    '        <span ng-if="userData.updateInProgress">Update in progress...</span>\n' +
    '    </button>\n' +
    '\n' +
    '    <ul class="nav nav-tabs">\n' +
    '        <li role="presentation" ui-sref-active="active">\n' +
    '            <a ui-sref="home({ repositoryGroup: \'my-repositories\' })">\n' +
    '                My repositories\n' +
    '                ({{ userData.myRepositories.length }})\n' +
    '            </a>\n' +
    '        </li>\n' +
    '        <li role="presentation" ui-sref-active="active">\n' +
    '            <a ui-sref="home({ repositoryGroup: \'followed-repositories\' })">\n' +
    '                Followed repositories\n' +
    '                ({{ userData.followedRepositories.length }})\n' +
    '            </a>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '\n' +
    '    <div class="alert alert-danger" role="alert" ng-if="errorMessage">\n' +
    '        {{ errorMessage }}\n' +
    '    </div>\n' +
    '\n' +
    '    <repositories-details repositories="userData.myRepositories" ng-show="repositoryGroup == \'my-repositories\'">\n' +
    '    </repositories-details>\n' +
    '\n' +
    '    <repositories-details repositories="userData.followedRepositories" ng-show="repositoryGroup == \'followed-repositories\'">\n' +
    '    </repositories-details>\n' +
    '\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('appPartials');
} catch (e) {
  module = angular.module('appPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('login/loginView.html',
    '<div ng-controller="LoginCtrl" class="col-xs-12 col-md-offset-3 col-md-6">\n' +
    '\n' +
    '    <p>Please provide your GitHub credentials.</p>\n' +
    '\n' +
    '    <div class="form-group">\n' +
    '        <label for="inputUsername">Username</label>\n' +
    '        <input ng-model="username" type="text" class="form-control" id="inputUsername">\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="form-group">\n' +
    '        <label for="inputPassword">Password</label>\n' +
    '        <input ng-model="password" type="password" class="form-control" id="inputPassword">\n' +
    '    </div>\n' +
    '\n' +
    '    <p>You can omit the password, but get very a low rate limit on API requests.</p>\n' +
    '\n' +
    '    <button ng-click="login()" class="btn btn-primary" ng-disabled="loading">\n' +
    '        <span ng-if="!loading">Go to my dashboard</span>\n' +
    '        <span ng-if="loading">Please wait...</span>\n' +
    '    </button>\n' +
    '\n' +
    '    <div class="alert alert-danger" role="alert" ng-if="errorMessage">\n' +
    '        {{ errorMessage }}\n' +
    '    </div>\n' +
    '\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('appPartials');
} catch (e) {
  module = angular.module('appPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('repositoriesDetails/repositoriesDetailsView.html',
    '<div class="row hidden-xs hidden-sm repository-table-headers">\n' +
    '    <div class="col-md-3">Title</div>\n' +
    '    <div class="col-md-3">Commits</div>\n' +
    '    <div class="col-md-3">Pull requests</div>\n' +
    '    <div class="col-md-3">Issues</div>\n' +
    '</div>\n' +
    '\n' +
    '<div ng-repeat="item in repositories" class="repository">\n' +
    '\n' +
    '    <div class="row">\n' +
    '\n' +
    '        <div class="col-xs-12 col-md-3 repository-title">\n' +
    '            {{item.name}}\n' +
    '        </div>\n' +
    '\n' +
    '        <div ng-if="item.details" class="details">\n' +
    '\n' +
    '            <div class="col-xs-12 col-md-3">\n' +
    '                <h3 class="hidden-md hidden-lg" ng-show="item.details.commits.length">\n' +
    '                    Commits\n' +
    '                </h3>\n' +
    '                <div ng-repeat="commit in item.details.commits">\n' +
    '                    <span>\n' +
    '                        {{ commit.commit.author.date | date:\'dd.MM.yyyy\' }}\n' +
    '                        {{ commit.author.login || commit.commit.author.name }}\n' +
    '                    </span>\n' +
    '                    <a href="{{ commit.html_url }}" title="{{ commit.commit.message }}" target="_blank">\n' +
    '                        {{ commit.commit.message }}\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="col-xs-12 col-md-3">\n' +
    '                <h3 class="hidden-md hidden-lg" ng-show="item.details.pullRequests.length">\n' +
    '                    Pull requests\n' +
    '                </h3>\n' +
    '                <div ng-repeat="pullRequest in item.details.pullRequests">\n' +
    '                    <span>\n' +
    '                        {{ commit.created_at | date:\'dd.MM.yyyy\' }}\n' +
    '                        {{ pullRequest.user.login }}\n' +
    '                    </span>\n' +
    '                    <a href="{{ pullRequest.html_url }}" title="{{ pullRequest.title }}" target="_blank">\n' +
    '                        {{ pullRequest.title }}\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="col-xs-12 col-md-3">\n' +
    '                <h3 class="hidden-md hidden-lg" ng-show="item.details.issues.length">\n' +
    '                    Issues\n' +
    '                </h3>\n' +
    '                <div ng-repeat="issue in item.details.issues">\n' +
    '                    <span>\n' +
    '                        {{ issue.created_at | date:\'dd.MM.yyyy\' }}\n' +
    '                        {{ issue.user.login }}\n' +
    '                    </span>\n' +
    '                    <a href="{{ issue.html_url }}" title="{{ issue.title }}" target="_blank">\n' +
    '                        {{ issue.title }}\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <hr>\n' +
    '\n' +
    '</div>');
}]);
})();
