'use strict';

angular.module('pocAngularFrontendApp')
    .factory('AppVersionService', function AppVersionService($http, backendUrlService) {
        return {
            getVersion: function(successCallbackFn, errorCallbackFn) {
                return $http({method: 'GET', url: backendUrlService + '/version'})
                .success(successCallbackFn)
                .error(errorCallbackFn);
            },
            getVersionFull: function(successCallbackFn, errorCallbackFn) {
                return $http({method: 'GET', url: backendUrlService + '/version-full', withCredentials: true})
                    .success(successCallbackFn)
                    .error(errorCallbackFn);
            }
        };
    }
);
