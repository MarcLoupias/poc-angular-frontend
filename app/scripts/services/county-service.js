'use strict';

angular.module('pocAngularFrontendApp')
    .factory('countyService', function ($http, backendUrlService) {

        return {
            getCountiesWithPagination: function(_page, _perPage) {
                return $http.get(backendUrlService + '/counties', {
                    params:{
                        page:_page,
                        perPage:_perPage
                    },
                    withCredentials: true
                });
            },
            getCountiesWithFilterByName: function(_nameFilter) {
                return $http.get(backendUrlService + '/counties', {
                    params:{
                        filters:"name[like]" + _nameFilter
                    },
                    withCredentials: true
                });
            },
            putCounty: function(county) {
                return $http.put(backendUrlService + '/counties/' + county.id, county, {withCredentials: true});
            },
            postCounty: function(county) {
                return $http.post(backendUrlService + '/counties', county, {withCredentials: true});
            },
            deleteCounty: function(county) {
                return $http.delete(backendUrlService + '/counties/' + county.id, {withCredentials: true});
            }
        };
    });
