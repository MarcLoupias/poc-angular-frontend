'use strict';

angular.module('pocAngularFrontendApp')
    .factory('AppVersionService', function AppVersionService($http, backendUrlService) {
        return {
            getBackendVersion: function() {
                return $http.get(backendUrlService + '/version');
            },
            getBackendVersionFull: function() {
                return $http.get(backendUrlService + '/version-full', {
                    withCredentials: true
                });
            }
        };
    }
);
