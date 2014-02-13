'use strict';

angular.module('pocAngularFrontendApp')
    .value('userService', {
        login: undefined,
        email: undefined,
        logged: false,
        setLogout: function() {
            this.login = undefined;
            this.email = undefined;
            this.logged = false;
        },
        setLogin: function(_login, _email) {
            this.login = _login;
            this.email = _email;
            this.logged = true;
        }
    })
    .factory('userRestService', function ($http, backendUrlService) {

        return {
            getUser: function() {
                return $http.get(backendUrlService + '/user-infos', {
                    withCredentials: true
                });
            }
        };
    });
