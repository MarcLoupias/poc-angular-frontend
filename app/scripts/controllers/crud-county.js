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

        $scope.deleteDepartement = function(entity) {
            if(confirm('Supprimer le département ' + entity.name + ' ?')) {
                $scope.pending = true;
                countyService.deleteCounty(entity).then(function () {
                    $scope.pending = false;
                    angularUiAlertService.addSuccessAlert('Le département ' + entity.name + ' a été supprimé.');
                    $scope.search();
                });
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

        var cellTemplateActionBtnDelete =
            '<button type="button" class="btn btn-danger grid-action-button" ng-click="deleteDepartement(row.entity)">' +
            '<span class="glyphicon glyphicon-remove"></span>' +
            '</button>';

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
                },
                {field:'actionBtnDelete', displayName:'', width: 40, cellTemplate:cellTemplateActionBtnDelete}
            ],
            enablePaging: true,
            showFooter: true,
            totalServerItems:'totalServerItems',
            pagingOptions: $scope.pagingOptions
        };

        $scope.pagingOptions.currentPage = 1;

        $scope.isCollapsed = true;
    })

    .controller('CrudCountyNewCountyCtrl', function ($scope, countyService, angularUiAlertService,
                                                     bootstrapFormValidationHelperService) {

        $scope.bootstrapHelper = bootstrapFormValidationHelperService;

        $scope.resetCrudNewCountyForm = function() {
            $scope.county = {};
        };

        $scope.save = function(county) {
            $scope.formPostPending = true;

            countyService.postCounty(county).then(
                function () {
                    angularUiAlertService.addSuccessAlert('Le département ' + county.name + ' a été ajouté.');
                    $scope.resetCrudNewCountyForm();
                    $scope.search();
                    $scope.formPostPending = false;
                }
            );
        };
    });
