'use strict';

angular.module('pocAngularFrontendApp')
    .controller('ErrorAlertCtrl', function ($scope, angularUiAlertService) {

        $scope.alertService = angularUiAlertService;
    });
