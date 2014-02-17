'use strict';

describe('Service: bootstrapFormValidationHelperService', function () {

  // load the service's module
  beforeEach(module('pocAngularFrontendApp'));

  // instantiate service
  var bootstrapFormValidationHelperService;
  beforeEach(inject(function (_bootstrapFormValidationHelperService_) {
    bootstrapFormValidationHelperService = _bootstrapFormValidationHelperService_;
  }));

  it('should do something', function () {
    expect(!!bootstrapFormValidationHelperService).toBe(true);
  });

});
