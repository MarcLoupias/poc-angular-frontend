'use strict';

angular.module('pocAngularFrontendApp')
    .factory('loginService', function ($http, backendUrlService) {

        return {
            buildLoginAttempt: function(_login, _email, _pwd) {
                return {
                    login: _login,
                    email: _email,
                    password: _pwd
                };
            },
            login: function (loginAttempt) {
                return $http.post(backendUrlService + '/users/login', loginAttempt, {withCredentials: true});
            }
        };
    });
