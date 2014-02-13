'use strict';

angular.module('pocAngularFrontendApp')
    .controller('SearchCountyCtrl', function ($scope, countyService) {

        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.totalItems = 0;
        $scope.pending = false;

        $scope.search = function () {

            $scope.pending = true;

            countyService.getCountiesWithPagination( $scope.currentPage, $scope.itemsPerPage)
                .then(function (res) {
                    $scope.counties = res.data;
                    $scope.totalItems = parseInt(res.headers('x-total-count'));
                    $scope.pending = false;
                }, function(){
                    $scope.pending = false;
                }
            );
        };

        $scope.search();
    });
