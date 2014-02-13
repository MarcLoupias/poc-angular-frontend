'use strict';

angular.module('pocAngularFrontendApp')
    .factory('logoutService', function ($http, backendUrlService) {

        return {
            logout: function () {
                return $http.post(backendUrlService + '/users/logout', {}, {withCredentials: true});
            }
        };
    });
