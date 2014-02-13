'use strict';

angular.module('pocAngularFrontendApp')
    .value('angularUiAlertService', {
        ALERT_TYPE_ERROR: "danger",
        ALERT_TYPE_WARNING: "warning",
        ALERT_TYPE_INFO: "info",
        ALERT_TYPE_SUCCESS: "success",
        alertList: [],
        addAlert: function (type, msg) {
            this.alertList.push({type: type, msg: msg});
        },
        addWarningAlert: function (msg) {
            this.addAlert(this.ALERT_TYPE_WARNING, msg);
        },
        addErrorAlert: function (msg) {
            this.addAlert(this.ALERT_TYPE_ERROR, msg);
        },
        addInfoAlert: function (msg) {
            this.addAlert(this.ALERT_TYPE_INFO, msg);
        },
        addSuccessAlert: function (msg) {
            this.addAlert(this.ALERT_TYPE_SUCCESS, msg);
        },
        removeAlert: function (index) {
            this.alertList.splice(index, 1);
        }
    });
