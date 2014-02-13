'use strict';

angular.module('pocAngularFrontendApp')
    .controller('NavbarCtrl', function ($scope, $location, userService, userRestService, loginService, logoutService,
                                        angularUiAlertService) {

        // when user refresh app (F5 hit) we have to know if a session is opened on the backend
        userRestService.getUser().then(
            function (res) {
                userService.setLogin(res.login, res.email);
            }
        );

        $scope.userService = userService;
        $scope.login = "admin";
        $scope.pwd = "@dm1nPwd";
        $scope.pendingLogin = false;
        $scope.pendingLogout = false;

        $scope.doLogin = function (_login, _pwd) {

            var loginAttempt = loginService.buildLoginAttempt(_login, "", _pwd);
            $scope.pendingLogin = true;

            loginService.login(loginAttempt).then(
                function () {
                    $scope.pendingLogin = false;
                    userService.setLogin(loginAttempt.login, loginAttempt.email);
                },
                function () {
                    $scope.pendingLogin = false;
                    angularUiAlertService.addWarningAlert('La tentative de login a échoué !');
                    userService.setLogout();
                }
            );
        };

        $scope.doLogout = function() {

            $scope.pendingLogout = true;

            logoutService.logout().then(
                function () {
                    $scope.pendingLogout = false;
                    userService.setLogout();
                    $location.path("/");
                }
            );
        };
    });
