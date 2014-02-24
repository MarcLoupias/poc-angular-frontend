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
            },
            getFrontendVersion: function() {
                return {
                    "name": "poc-angular-frontend",
                    "version": "0.1.0"
                }
            }
        };
    }
);
