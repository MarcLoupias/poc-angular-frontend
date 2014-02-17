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

        $scope.fnUnchangedCode = function() {
            return true;
        };

        $scope.fnValidCode = function(entity) {
            countyService.putCounty(entity).then(
                function () {
                    angularUiAlertService.addSuccessAlert('Le département ' + entity.name + ' a été mis à jour.');
                }
            );
        };

        $scope.fnInvalidCode = function(entity) {
            angularUiAlertService.addWarningAlert('Saisie invalide. Le département '+ entity.name + ' n\'a pas été mis à jour.');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        var cellNameEditable =
            '<cell-template-input-text model=COL_FIELD required="true" min-length="3" ' +
                'max-length="30" ' +
                'unchanged-callback="fnUnchangedCode()" ' +
                'valid-callback="fnValidCode(row.entity)" ' +
                'invalid-callback="fnInvalidCode(row.entity)" ' +
                '></cell-template-input-text>';

        var cellCodeEditable =
            '<cell-template-input-text model=COL_FIELD required="true" min-length="1" ' +
                'max-length="3" pattern="\'/^[0-9]+$/\'" pattern-error-msg="\'Nombre obligatoire\'" ' +
                'unchanged-callback="fnUnchangedCode()" ' +
                'valid-callback="fnValidCode(row.entity)" ' +
                'invalid-callback="fnInvalidCode(row.entity)" ' +
                '>' +
                '</cell-template-input-text>';

        var cellNameDisplay =
            '<div class="ngCellText" ng-class="col.colIndex()">{{row.getProperty(col.field)}}</div>';

        var cellCodeDisplay =
            '<div class="ngCellText" ng-class="col.colIndex()">{{row.getProperty(col.field)}}</div>';

        $scope.gridOptionsCrudCounty = {
            i18n: 'fr',
            data: 'myData',
            multiSelect: false,
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: false,
            columnDefs: [
                {field:'id', displayName:'Id', visible: false},
                {
                    field:'code', displayName:'Code', enableCellEdit:true,
                    cellTemplate: cellCodeDisplay, editableCellTemplate: cellCodeEditable
                },
                {
                    field:'name', displayName:'Nom', enableCellEdit:true,
                    cellTemplate: cellNameDisplay, editableCellTemplate: cellNameEditable
                }
            ],
            enablePaging: true,
            showFooter: true,
            totalServerItems:'totalServerItems',
            pagingOptions: $scope.pagingOptions
        };

        $scope.pagingOptions.currentPage = 1;
    })

    .controller('CrudCountyNewCountyCtrl', function ($scope, countyService, angularUiAlertService) {
        $scope.isCollapsed = true;
    });
