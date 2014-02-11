'use strict';

angular.module('pocAngularFrontendApp')
  .factory('cinemaService', function ($http, backendUrlService) {

        return {
            getCinemasWithPagination: function(_page, _perPage) {
                return $http.get(backendUrlService + '/cinemas', {
                    params:{
                        page:_page,
                        perPage:_perPage
                    },
                    withCredentials: true
                });
            },
            getCinemasByCountyName: function(_page, _perPage, _countyName) {
                return $http.get(backendUrlService + '/cinemas/byCountyName', {
                    params:{
                        page:_page,
                        perPage:_perPage,
                        countyName:_countyName
                    },
                    withCredentials: true
                });
            }
        };
  });
