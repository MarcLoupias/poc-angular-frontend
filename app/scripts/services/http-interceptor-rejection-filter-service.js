'use strict';

angular.module('pocAngularFrontendApp')
    .factory('httpInterceptorRejectionFilterService', function (backendUrlService) {

        /*
        rejection format example :

        {
            "data":"Authentifiez-vous pour utiliser ce service.",
            "status":401,
            "config":{
            "transformRequest":[null],
                "transformResponse":[null],
                "withCredentials":true,
                "method":"GET",
                "url":"http://127.0.0.1:8080/user-infos",
                "headers":{
                    "Accept":"application/json"
                }
            }
        }*/

        return {
            /**
             * Return true if the request is the origin of rejection
             * Return always false in case of bad param
             *
             * @param rejection the rejection object from $httpProvider
             * @param route the backend route without server url (ex: '/user-infos')
             * @param method the http method used
             * @returns {boolean}
             */
            filter: function (rejection, route, method) {

                if( (rejection === undefined || rejection === null) ||
                    (rejection.config === undefined || rejection.config === null) ||
                    (rejection.config.method === undefined || rejection.config.method === null) ||
                    (rejection.config.url === undefined || rejection.config.url === null)) {
                    return false;
                }

                if(route === undefined || route === null) {
                    return false;
                }

                if(method === undefined || method === null) {
                    return false;
                }

                return (rejection.config.method === method) && (rejection.config.url === (backendUrlService + route));
            }
        };
    });
