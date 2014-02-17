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
            },
            putCinema: function(cinema) {
                return $http.put(backendUrlService + '/cinemas/' + cinema.id, cinema, {withCredentials: true});
            },
            postCinema: function(cinema) {
                return $http.post(backendUrlService + '/cinemas', cinema, {withCredentials: true});
            },
            deleteCinema: function(cinema) {
                return $http.delete(backendUrlService + '/cinemas/' + cinema.id, {withCredentials: true});
            }
        };
  });
