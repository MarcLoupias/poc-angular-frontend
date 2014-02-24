'use strict';

angular.module('pocAngularFrontendApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap',
        'ngGrid'
    ])
    .config(function ($routeProvider, $httpProvider) {

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
            .when('/crud-cinema', {
              templateUrl: 'views/crud-cinema.html',
              controller: 'CrudCinemaCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        // it is MANDATORY to declare dependencies like this for the $httpProvider for the grunt build process
        // if not, the dist output is malformed and angular will not work
        $httpProvider.interceptors.push(
            ['$q', 'angularUiAlertService', 'httpInterceptorRejectionFilterService',
                function($q, angularUiAlertService, httpInterceptorRejectionFilterService) {
            return {
                'requestError': function(rejection) {
                    alert('requestError -> rejection=' + JSON.stringify(rejection));
                    return $q.reject(rejection);
                },
                'responseError': function(rejection) {
                    if(httpInterceptorRejectionFilterService.filter(rejection, '/user-infos', 'GET')){
                        return $q.reject(rejection);
                    }

                    angularUiAlertService.addErrorAlert('Erreur ' + rejection.status + ' - ' + rejection.data);

                    return $q.reject(rejection);
                }
            };
        }]);
    });
