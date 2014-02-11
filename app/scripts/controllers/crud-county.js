'use strict';

angular.module('pocAngularFrontendApp')
    .controller('CrudCountyCtrl', function ($scope, countyService) {

        $scope.search = function () {

            countyService.getCountiesWithPagination( $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize)
                .then(function (res) {
                    $scope.myData = res.data;
                    $scope.totalServerItems = parseInt(res.headers('x-total-count'));
                }
            );
        };

        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [10, 20],
            pageSize: 10,
            currentPage: 1
        };

        $scope.search();

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && (newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize)) {
                $scope.search();
            }
        }, true);

        $scope.gridOptionsCrudCounty = {
            data: 'myData',
            multiSelect: false,
            columnDefs: [
                {field:'id', displayName:'Id'},
                {field:'code', displayName:'Code'},
                {field:'name', displayName:'Name'}
            ],
            enablePaging: true,
            showFooter: true,
            totalServerItems:'totalServerItems',
            pagingOptions: $scope.pagingOptions
        };

        $scope.pagingOptions.currentPage = 1;
    });
