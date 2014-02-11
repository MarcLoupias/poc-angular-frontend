'use strict';

angular.module('pocAngularFrontendApp')
    .controller('SearchCinemaByCountyCtrl', function ($scope, countyService, cinemaService) {

        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.totalItems = 0;

        $scope.getCounties = function(val) {

            var promise = countyService.getCountiesWithFilterByName( val )
                .then(function (res) {
                    var countiesNames = [];

                    for(var i in res.data) {

                        //countiesNames.push(res.data[i].name + " (" + res.data[i].code + ")");
                        countiesNames.push(res.data[i]);
                    }

                    return countiesNames;
                }
            );

            promise.$$v = promise;
            return promise;
        };

        $scope.onSelectCounty = function() {

            cinemaService.getCinemasByCountyName($scope.currentPage, $scope.itemsPerPage, $scope.selectedCounty.name)
                .then(function (res) {
                    $scope.cinemas = res.data;
                    $scope.totalItems = parseInt(res.headers('x-total-count'));
                }
            );

            /*alert($scope.selectedCounty.name + " (" + $scope.selectedCounty.code + ")");*/
        }
    });
