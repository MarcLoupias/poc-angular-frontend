'use strict';

angular.module('pocAngularFrontendApp')
    .controller('AppVersionCtrl', function ($scope, AppVersionService, userService) {

        $scope.userService = userService;
        $scope.pending = false;

        if( $scope.userService.logged === true ) {

            $scope.pending = true;

            AppVersionService.getBackendVersionFull()
                .then(function (res) {
                    $scope.name = res.data.appName;
                    $scope.version = res.data.appVersion;
                    $scope.playVersion = res.data.playVersion;
                    $scope.javaVersion = res.data.javaVersion;
                    $scope.jvmName = res.data.jvmName;
                    $scope.jvmVersion = res.data.jvmVersion;
                    $scope.osTimezone = res.data.osTimezone;
                    $scope.osCountry = res.data.osCountry;
                    $scope.osArch = res.data.osArch;
                    $scope.osName = res.data.osName;
                    $scope.osVersion = res.data.osVersion;

                    $scope.pending = false;
                }, function() {
                    $scope.pending = false;
                }
            );

        } else {

            $scope.pending = true;

            AppVersionService.getBackendVersion()
                .then(function (res) {
                    $scope.name = res.data.appName;
                    $scope.version = res.data.appVersion;

                    $scope.pending = false;
                }, function() {
                    $scope.pending = false;
                }
            );
        }

    });
