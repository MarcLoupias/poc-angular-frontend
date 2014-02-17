'use strict';

angular.module('pocAngularFrontendApp')
  .value('bootstrapFormValidationHelperService', {
        isValid: function(formStatus) {
            if(formStatus === undefined || formStatus === null) {
                return 'has-error has-feedback';
            }

            if(formStatus) {
                return 'has-success has-feedback';
            } else {
                return 'has-error has-feedback';
            }
        }
    });
