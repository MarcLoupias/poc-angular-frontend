'use strict';

angular.module('pocAngularFrontendApp')
    .controller('AppVersionCtrl', function ($scope, AppVersionService, userService) {

        $scope.userService = userService;

        if( $scope.userService.logged === true ) {

            AppVersionService.getVersionFull(
                function (data) {
                    $scope.name = data.appName;
                    $scope.version = data.appVersion;
                    $scope.playVersion = data.playVersion;
                    $scope.javaVersion = data.javaVersion;
                    $scope.jvmName = data.jvmName;
                    $scope.jvmVersion = data.jvmVersion;
                    $scope.osTimezone = data.osTimezone;
                    $scope.osCountry = data.osCountry;
                    $scope.osArch = data.osArch;
                    $scope.osName = data.osName;
                    $scope.osVersion = data.osVersion;
                },
                function (response) {
                    alert('ko=' + response.data);
                }
            );

        } else {

            AppVersionService.getVersion(
                function (data) {
                    $scope.name = data.appName;
                    $scope.version = data.appVersion;
                },
                function (response) {
                    alert('ko=' + response.data);
                }
            );
        }

    });
