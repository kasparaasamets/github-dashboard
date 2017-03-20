'use strict';
var angular = require('angular');
require('angular-ui-router');
require('angular-base64');
require('../dist/templateCachePartials');

var app = angular.module('github-dashboard', ['ui.router', 'base64', 'appPartials']);

require('app.states');
require('controllers/home/homeController');
require('controllers/login/loginController');
require('controllers/main/mainController');

require('directives/repositoriesDetails/repositoriesDetailsDirective');

require('services/githubClient');
require('services/user');
