'use strict';

describe('Service: logoutService', function () {

  // load the service's module
  beforeEach(module('pocAngularFrontendApp'));

  // instantiate service
  var logoutService;
  beforeEach(inject(function (_logoutService_) {
    logoutService = _logoutService_;
  }));

  it('should do something', function () {
    expect(!!logoutService).toBe(true);
  });

});
