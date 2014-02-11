'use strict';

angular.module('pocAngularFrontendApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/search', {
                templateUrl: 'views/search-cinema.html',
                controller: 'SearchCinemaCtrl'
            })
            .when('/search-county', {
                templateUrl: 'views/search-county.html',
                controller: 'SearchCountyCtrl'
            })
            .when('/search-cinema-by-county', {
                templateUrl: 'views/search-cinema-by-county.html',
                controller: 'SearchCinemaByCountyCtrl'
            })
            .when('/app-version', {
                templateUrl: 'views/app-version.html',
                controller: 'AppVersionCtrl'
            })
            .when('/crud-county', {
              templateUrl: 'views/crud-county.html',
              controller: 'CrudCountyCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
