'use strict';

angular.module('pocAngularFrontendApp')
    .controller('CrudCinemaCtrl', function ($scope, cinemaService, angularUiAlertService, angularUiConfirmModalService) {

        $scope.pending = false;

        $scope.search = function () {

            $scope.pending = true;

            cinemaService.getCinemasWithPagination( $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize)
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

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && (newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize)) {
                $scope.search();
            }
        }, true);

        $scope.deleteCinema = function(entity) {

            angularUiConfirmModalService.confirm('Supprimer le cinéma ' + entity.name + ' ?')
                .then(function () {
                    $scope.pending = true;
                    cinemaService.deleteCinema(entity).then(
                        function () {
                            $scope.pending = false;
                            angularUiAlertService.addSuccessAlert('Le cinéma ' + entity.name + ' a été supprimé.');
                            $scope.search();
                        },
                        function () {
                            $scope.pending = false;
                        }
                    );
                },
                function () {
                    $scope.pending = false;
                }
            );
        };

        $scope.fnUnchangedCode = function() {
            return true;
        };

        $scope.fnValidCode = function(entity) {
            cinemaService.putCinema(entity).then(
                function () {
                    angularUiAlertService.addSuccessAlert('Le cinéma ' + entity.name + ' a été mis à jour.');
                }
            );
        };

        $scope.fnInvalidCode = function(entity) {
            angularUiAlertService.addWarningAlert('Saisie invalide. Le cinéma '+ entity.name + ' n\'a pas été mis à jour.');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        var cellNameEditable =
            '<cell-template-input-text model=COL_FIELD required="true" min-length="1" ' +
                'max-length="255" ' +
                'unchanged-callback="fnUnchangedCode()" ' +
                'valid-callback="fnValidCode(row.entity)" ' +
                'invalid-callback="fnInvalidCode(row.entity)" ' +
                '></cell-template-input-text>';

        var cellNameDisplay =
            '<div class="ngCellText" ng-class="col.colIndex()">{{row.getProperty(col.field)}}</div>';

        var cellScreenEditable =
            '<cell-template-input-number model=COL_FIELD required="true" min="1" ' +
                'max="200" ' +
                'unchanged-callback="fnUnchangedCode()" ' +
                'valid-callback="fnValidCode(row.entity)" ' +
                'invalid-callback="fnInvalidCode(row.entity)" ' +
                '></cell-template-input-number>';

        var cellScreenDisplay =
            '<div class="ngCellText" ng-class="col.colIndex()">{{row.getProperty(col.field)}}</div>';

        var cellSeatEditable =
            '<cell-template-input-number model=COL_FIELD required="true" min="1" ' +
                'max="10000" ' +
                'unchanged-callback="fnUnchangedCode()" ' +
                'valid-callback="fnValidCode(row.entity)" ' +
                'invalid-callback="fnInvalidCode(row.entity)" ' +
                '></cell-template-input-number>';

        var cellSeatDisplay =
            '<div class="ngCellText" ng-class="col.colIndex()">{{row.getProperty(col.field)}}</div>';

        var cellTemplateActionBtnDelete =
            '<button type="button" class="btn btn-danger grid-action-button" ng-click="deleteCinema(row.entity)">' +
                '<span class="glyphicon glyphicon-remove"></span>' +
                '</button>';

        $scope.gridOptionsCrudCinema = {
            i18n: 'fr',
            data: 'myData',
            multiSelect: false,
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: false,
            columnDefs: [
                {field:'id', displayName:'Id', visible: false},
                {
                    field:'name', displayName:'Nom', enableCellEdit:true,
                    cellTemplate: cellNameDisplay, editableCellTemplate: cellNameEditable
                },
                {
                    field:'screen', displayName:'Nb. écrans', enableCellEdit:true,
                    cellTemplate: cellScreenDisplay, editableCellTemplate: cellScreenEditable
                },
                {
                    field:'seat', displayName:'Nb. sièges', enableCellEdit:true,
                    cellTemplate: cellSeatDisplay, editableCellTemplate: cellSeatEditable
                },
                {field:'actionBtnDelete', displayName:'', width: 40, cellTemplate:cellTemplateActionBtnDelete}
            ],
            enablePaging: true,
            showFooter: true,
            totalServerItems:'totalServerItems',
            pagingOptions: $scope.pagingOptions
        };

        $scope.isCollapsed = true;

        $scope.search();
    })

    .controller('CrudCinemaNewCinemaCtrl', function ($scope, cinemaService, angularUiAlertService,
                                                     bootstrapFormValidationHelperService) {

        $scope.bootstrapHelper = bootstrapFormValidationHelperService;

        $scope.resetCrudNewCinemaForm = function() {
            $scope.cinema = {};
        };

        $scope.save = function(cinema) {
            $scope.formPostPending = true;

            cinemaService.postCinema(cinema).then(
                function () {
                    angularUiAlertService.addSuccessAlert('Le cinéma ' + cinema.name + ' a été ajouté.');
                    $scope.resetCrudNewCinemaForm();
                    $scope.search();
                    $scope.formPostPending = false;
                },
                function() {
                    $scope.formPostPending = false;
                }
            );
        };
    });
