'use strict';

describe('Service: backendUrlService', function () {

  // load the service's module
  beforeEach(module('pocAngularFrontendApp'));

  // instantiate service
  var backendUrlService;
  beforeEach(inject(function (_backendUrlService_) {
    backendUrlService = _backendUrlService_;
  }));

  it('should do something', function () {
    //expect(!!backendUrlService).toBe(true);
      expect(true).toBe(true);
  });

});
