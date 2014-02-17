'use strict';

angular.module('pocAngularFrontendApp')
    .factory('angularUiConfirmModalService', function ($modal) {

        return {
            confirm: function(msg) {

                var ModalInstanceCtrl;

                var modalTemplate = '<div class="modal-body">';
                modalTemplate +=    '<h4 class="text-center">' + msg + '</h4>';
                modalTemplate +=    '</div>';
                modalTemplate +=    '<div class="modal-footer">';
                modalTemplate +=    '<button class="btn btn-success" ng-click="ok()">OK</button>';
                modalTemplate +=    '<button class="btn btn-danger" ng-click="cancel()">Cancel</button>';
                modalTemplate +=    '</div>';

                ModalInstanceCtrl = function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                };

                var modalInstance = $modal.open({
                    template: modalTemplate,
                    controller: ModalInstanceCtrl,
                    backdrop: 'static'
                });

                return modalInstance.result;
            }
        };
    });
