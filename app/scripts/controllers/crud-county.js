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

        var cellNameEditable
            =   '<cell-template model=COL_FIELD input=COL_FIELD entity=row.entity></cell-template>' +
            'COL_FIELD = {{row.getProperty(col.field)}} row.entity = {{row.entity}}';

        var cellNameDisplay
            = '<div class="ngCellText" ng-class="col.colIndex()">{{row.getProperty(col.field)}}'
            + ' COL_FIELD = {{row.getProperty(col.field)}} row.entity = {{row.entity}}</div>';

        $scope.gridOptionsCrudCounty = {
            data: 'myData',
            multiSelect: false,
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: false,
            rowHeight: 60,
            columnDefs: [
                {field:'id', displayName:'Id', visible: false},
                {field:'code', displayName:'Code', enableCellEdit:true},
                {
                    field:'name', displayName:'Name', enableCellEdit:true,
                    cellTemplate: cellNameDisplay,
                    editableCellTemplate: cellNameEditable
                }
            ],
            enablePaging: true,
            showFooter: true,
            totalServerItems:'totalServerItems',
            pagingOptions: $scope.pagingOptions/*,
            afterSelectionChange: function() {
                console.log('afterSelectionChange callback fired');
            },
            beforeSelectionChange: function(row) {
                console.log('beforeSelectionChange callback fired arg = ' + JSON.stringify(row.entity));
                $scope.oldEntity = angular.copy(row.entity);

                return true;
            }*/
        };

        $scope.pagingOptions.currentPage = 1;

        /*$scope.$on('ngGridEventEndCellEdit', function(event) {

            console.log('ngGridEventEndCellEdit fired');

            if(event.targetScope.validForm) {
                if(!angular.equals($scope.oldEntity, event.targetScope.entity)) {
                    countyService.putCounty(event.targetScope.entity).then(function(res) {
                        angularUiAlertService.addSuccessAlert('Le département ' + event.targetScope.entity.name + ' a été modifié avec succès.');
                    });
                }
            } else {
                event.targetScope.entity = $scope.oldEntity;
            }
        });*/

        $scope.$on('ngGridEventEndCellEdit', function(event) {
            console.log('ngGridEventEndCellEdit fired');
            //var entity = event.targetScope.entity;
            //event.currentScope.entity = event.targetScope.entity;
            /*var entity = event.currentScope.entity;*/
         });
    });
