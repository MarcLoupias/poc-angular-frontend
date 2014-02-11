'use strict';

angular.module('pocAngularFrontendApp')
    .factory('logoutService', function ($http, backendUrlService) {

        return {
            logout: function (successCallbackFn, errorCallbackFn) {
                return $http.post(backendUrlService + '/users/logout', {}, {withCredentials: true})
                    .success(successCallbackFn)
                    .error(errorCallbackFn);
            }
        };
    });
