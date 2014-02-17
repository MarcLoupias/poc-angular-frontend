'use strict';

angular.module('pocAngularFrontendApp')

/**
 * Directive taken from ng-grid ng-input (v2.0.7)
 */
    .directive('myNgInput', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModel) {
                // Store the initial cell value so we can reset to it if need be
                var oldCellValue;
                var dereg = scope.$watch('ngModel', function () {
                    oldCellValue = ngModel.$modelValue;
                    dereg(); // only run this watch once, we don't want to overwrite our stored value when the input changes
                });

                elm.bind('keydown', function (evt) {
                    switch (evt.keyCode) {
                        case 37: // Left arrow
                        case 38: // Up arrow
                        case 39: // Right arrow
                        case 40: // Down arrow
                            evt.stopPropagation();
                            break;
                        case 27: // Esc (reset to old value)
                            if (!scope.$$phase) {
                                scope.$apply(function () {
                                    ngModel.$setViewValue(oldCellValue);
                                    elm.blur();
                                });
                            }
                            break;
                        case 13: // Enter (Leave Field)
                            if (scope.enableCellEditOnFocus && scope.totalFilteredItemsLength() - 1 > scope.row.rowIndex && scope.row.rowIndex > 0 || scope.enableCellEdit) {
                                elm.blur();
                            }
                            break;
                    }

                    return true;
                });

                elm.bind('click', function (evt) {
                    evt.stopPropagation();
                });

                elm.bind('mousedown', function (evt) {
                    evt.stopPropagation();
                });

                scope.$on('ngGridEventStartCellEdit', function () {
                    elm.focus();
                    elm.select();
                });

                angular.element(elm).bind('blur', function () {

                    if (angular.equals(ngModel.$modelValue, oldCellValue)) {
                        scope.$emit('ngGridEventEndCellEdit_Unchanged');
                    } else {
                        if (scope.myForm.$valid === false) {
                            if (!scope.$$phase) {
                                scope.$apply(function () {
                                    ngModel.$setViewValue(oldCellValue);
                                });
                            }
                            scope.$emit('ngGridEventEndCellEdit_Invalid');

                        } else {
                            scope.$emit('ngGridEventEndCellEdit_Valid');
                        }
                    }

                    scope.$emit('ngGridEventEndCellEdit');
                });
            }
        };
    }])

    .directive('cellTemplateInputText', function () {

        var cellTemplate =
            '<div><form name="myForm" class="simple-form" novalidate>' +
                '<input type="text" name="myField" my-ng-input="localModel" ng-model="localModel" ng-minlength="{{formMinLength}}" ng-maxlength="{{formMaxLength}}" ng-required="{{formRequired}}" ng-pattern="{{formPattern}}"/>' +
                '<span ng-show="myForm.myField.$error.required" class="label label-danger"> Obligatoire</span>' +
                '<span ng-show="myForm.myField.$error.minlength" class="label label-danger"> {{ formMinLength }} caractères min</span>' +
                '<span ng-show="myForm.myField.$error.maxlength" class="label label-danger"> {{ formMaxLength }} caractères max</span>' +
                '<span ng-show="myForm.myField.$error.pattern" class="label label-danger"> {{ formPatternErrorMsg }}</span>' +
            '</form></div>';

        return {
            template: cellTemplate,
            restrict: 'E',
            scope: {
                formRequired: '=required',
                formMinLength: '=minLength',
                formMaxLength: '=maxLength',
                formPattern: '=pattern',
                formPatternErrorMsg: '=patternErrorMsg',
                localModel: '=model',
                unchangedCallback: '&',
                validCallback: '&',
                invalidCallback: '&'
            },
            controller: function ($scope) {
                $scope.$on('ngGridEventEndCellEdit_Unchanged', function () {
                    $scope.unchangedCallback();
                });

                $scope.$on('ngGridEventEndCellEdit_Valid', function () {
                    $scope.validCallback();
                });

                $scope.$on('ngGridEventEndCellEdit_Invalid', function () {
                    $scope.invalidCallback();
                });
            }
        };
    })

    .directive('cellTemplateInputNumber', function () {

        var cellTemplate =
            '<div><form name="myForm" class="simple-form" novalidate>' +
                '<input type="number" name="myField" my-ng-input="localModel" ng-model="localModel" min="{{formMin}}" max="{{formMax}}" ng-required="{{formRequired}}"/>' +
                '<span ng-show="myForm.myField.$error.required" class="label label-danger"> Obligatoire</span>' +
                '<span ng-show="myForm.myField.$error.min" class="label label-danger"> {{formMin}} min</span>' +
                '<span ng-show="myForm.myField.$error.max" class="label label-danger"> {{formMax}} max</span>' +
                '</form></div>';

        return {
            template: cellTemplate,
            restrict: 'E',
            scope: {
                formRequired: '=required',
                formMin: '=min',
                formMax: '=max',
                localModel: '=model',
                unchangedCallback: '&',
                validCallback: '&',
                invalidCallback: '&'
            },
            controller: function ($scope) {
                $scope.$on('ngGridEventEndCellEdit_Unchanged', function () {
                    $scope.unchangedCallback();
                });

                $scope.$on('ngGridEventEndCellEdit_Valid', function () {
                    $scope.validCallback();
                });

                $scope.$on('ngGridEventEndCellEdit_Invalid', function () {
                    $scope.invalidCallback();
                });
            }
        };
    });
