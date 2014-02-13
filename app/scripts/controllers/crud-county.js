'use strict';

angular.module('pocAngularFrontendApp')
    .controller('CrudCountyCtrl', function ($scope, countyService, angularUiAlertService) {

        $scope.pending = false;

        $scope.search = function () {

            $scope.pending = true;

            countyService.getCountiesWithPagination( $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize)
                .then(function (res) {
                    $scope.myData = res.data;
                    $scope.totalServerItems = parseInt(res.headers('x-total-count'));
                    $scope.pending = false;
                }, function() {
                    $scope.pending = false;
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

        $scope.oldEntity = undefined;

        var cellName = '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" />';

        $scope.gridOptionsCrudCounty = {
            data: 'myData',
            multiSelect: false,
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: false,
            columnDefs: [
                {field:'id', displayName:'Id', visible: false},
                {field:'code', displayName:'Code', enableCellEdit:true},
                {
                    field:'name', displayName:'Name', enableCellEdit:true,
                    editableCellTemplate: cellName
                }
            ],
            enablePaging: true,
            showFooter: true,
            totalServerItems:'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            afterSelectionChange: function(row, event) {
                /*console.log('afterSelectionChange callback fired arg = ' + JSON.stringify(row));*/
                /*console.log("deal with row " + row.rowIndex);*/
                console.log('afterSelectionChange callback fired');
            },
            beforeSelectionChange: function(row) {
                console.log('beforeSelectionChange callback fired arg = ' + JSON.stringify(row.entity));
                $scope.oldEntity = angular.copy(row.entity);

                return true;
            }
        };

        $scope.pagingOptions.currentPage = 1;

        $scope.$on('ngGridEventData', function(gridId) {

            var toto = gridId;
            //console.log('ngGridEventData fired gridId = ' + JSON.stringify(gridId.targetScope.row));
            //angularUiAlertService.addInfoAlert('before cell edit : ' + event.targetScope.row.entity.id);

            /*countyService.putCounty(event.targetScope.row.entity).then(function(res) {
                angularUiAlertService.addInfoAlert('before cell edit : ' + event.targetScope.row.entity.id);
            });*/
        });

        $scope.$on('ngGridEventEndCellEdit', function(event) {

            if(!angular.equals($scope.oldEntity, event.targetScope.row.entity)) {
                countyService.putCounty(event.targetScope.row.entity).then(function(res) {
                    angularUiAlertService.addSuccessAlert('Le département ' + event.targetScope.row.entity.name + ' a été modifié avec succès.');
                });
            }
        });
    });
