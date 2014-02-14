'use strict';

angular.module('pocAngularFrontendApp')
    .directive('cellTemplate', function () {

        var cellTemplate =
        '<div><form name="myForm" class="simple-form" novalidate>' +
            //'<input type="text" name="\'field\' + col.index" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" required/>' +
            '<input type="text" name="myField" ng-input="localInput" ng-model="localModel" entity="entity" required/>' +
            '<span ng-show="myForm.myField.$error.required"> REQUIRED</span>' +
        '</form></div>';

        return {
            template: cellTemplate,
            restrict: 'E',
            scope: {
                localModel:'=model',
                localInput:'=input',
                entity:'=entity'
            },
            controller: function ($scope, countyService, angularUiAlertService) {

                $scope.$on('ngGridEventStartCellEdit', function (event) {
                    console.log('cellTemplate controller - ngGridEventStartCellEdit fired');

                    $scope.oldEntity = angular.copy(event.currentScope.entity);
                    $scope.oldValue = angular.copy(event.currentScope.localModel);
                });

                $scope.$on('ngGridEventEndCellEdit', function(event) {

                    console.log('ngGridEventEndCellEdit fired');

                    if(event.currentScope.myForm.$valid) {
                        if(!angular.equals($scope.oldEntity, event.currentScope.entity)) {
                            countyService.putCounty(event.currentScope.entity).then(function(res) {
                                angularUiAlertService.addSuccessAlert('Le département ' + event.targetScope.entity.name + ' a été modifié avec succès.');
                            });
                        }
                    } else {

                        $scope.localModel = angular.copy($scope.oldValue);
                        $scope.localInput = angular.copy($scope.oldValue);
                        $scope.entity = angular.copy($scope.oldEntity);
                    }
                });
            }
        };
    });
