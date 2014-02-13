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
            .otherwise({
                redirectTo: '/'
            });

        $httpProvider.interceptors.push(function($q, angularUiAlertService, httpInterceptorRejectionFilterService) {
            return {
                'requestError': function(rejection) {
                    alert('requestError -> rejection=' + JSON.stringify(rejection));
                    return $q.reject(rejection);
                },
                'responseError': function(rejection) {
                    //alert('responseError -> rejection=' + JSON.stringify(rejection));

                    if(httpInterceptorRejectionFilterService.filter(rejection, '/user-infos', 'GET')){
                        return $q.reject(rejection);
                    }

                    angularUiAlertService.addErrorAlert('Erreur ' + rejection.status + ' - ' + rejection.data);

                    return $q.reject(rejection);
                }
            };
        });
    });
