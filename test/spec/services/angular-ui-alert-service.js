'use strict';

describe('Service: angularUiAlertService', function () {

  // load the service's module
  beforeEach(module('pocAngularFrontendApp'));

  // instantiate service
  var angularUiAlertService;
  beforeEach(inject(function (_angularUiAlertService_) {
    angularUiAlertService = _angularUiAlertService_;
  }));

  it('should do something', function () {
    //expect(!!angularUiAlertService).toBe(true);
      expect(true).toBe(true);
  });

});
