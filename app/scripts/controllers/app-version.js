'use strict';

angular.module('pocAngularFrontendApp')
    .controller('AppVersionCtrl', function ($scope, AppVersionService, userService) {

        $scope.userService = userService;
        $scope.pending = false;
        $scope.back = {};

        if( $scope.userService.logged === true ) {

            $scope.pending = true;

            AppVersionService.getBackendVersionFull()
                .then(function (res) {
                    $scope.back.name = res.data.appName;
                    $scope.back.version = res.data.appVersion;
                    $scope.back.playVersion = res.data.playVersion;
                    $scope.back.javaVersion = res.data.javaVersion;
                    $scope.back.jvmName = res.data.jvmName;
                    $scope.back.jvmVersion = res.data.jvmVersion;
                    $scope.back.osTimezone = res.data.osTimezone;
                    $scope.back.osCountry = res.data.osCountry;
                    $scope.back.osArch = res.data.osArch;
                    $scope.back.osName = res.data.osName;
                    $scope.back.osVersion = res.data.osVersion;

                    $scope.pending = false;
                }, function() {
                    $scope.pending = false;
                }
            );

        } else {

            $scope.pending = true;

            AppVersionService.getBackendVersion()
                .then(function (res) {
                    $scope.back.name = res.data.appName;
                    $scope.back.version = res.data.appVersion;

                    $scope.pending = false;
                }, function() {
                    $scope.pending = false;
                }
            );
        }

        $scope.front = AppVersionService.getFrontendVersion();

    });
