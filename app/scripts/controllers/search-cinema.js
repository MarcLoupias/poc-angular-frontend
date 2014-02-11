'use strict';

angular.module('pocAngularFrontendApp')
    .controller('SearchCinemaCtrl', function ($scope, cinemaService) {

        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.totalItems = 0;

        $scope.search = function () {

            cinemaService.getCinemasWithPagination( $scope.currentPage, $scope.itemsPerPage)
                .then(function (res) {
                    $scope.cinemas = res.data;
                    $scope.totalItems = parseInt(res.headers('x-total-count'));
                }
            );
        };

        $scope.search();
    });
