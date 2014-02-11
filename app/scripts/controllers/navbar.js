'use strict';

angular.module('pocAngularFrontendApp')
    .controller('NavbarCtrl', function ($scope, $location, userService, loginService, logoutService) {

        $scope.userService = userService;
        $scope.login = "admin";
        $scope.pwd = "@dm1nPwd";

        $scope.doLogin = function (_login, _pwd) {

            var loginAttempt = loginService.buildLoginAttempt(_login, "", _pwd);

            loginService.login(
                loginAttempt,

                function (data) {
                    userService.setLogin(loginAttempt.login, loginAttempt.email);
                },

                function (response) {
                    alert("login failed");
                    userService.setLogout();
                }
            );

        };

        $scope.doLogout = function() {

            logoutService.logout(

                function (data) {
                    userService.setLogout();
                    $location.path("/");
                },

                function (response) {
                    alert(response);
                }
            );
        };
    });
