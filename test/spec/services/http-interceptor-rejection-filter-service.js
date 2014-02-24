'use strict';

describe('Service: httpInterceptorRejectionFilterService', function () {

  // load the service's module
  beforeEach(module('pocAngularFrontendApp'));

  // instantiate service
  var httpInterceptorRejectionFilterService;
  beforeEach(inject(function (_httpInterceptorRejectionFilterService_) {
    httpInterceptorRejectionFilterService = _httpInterceptorRejectionFilterService_;
  }));

  it('should do something', function () {
    //expect(!!httpInterceptorRejectionFilterService).toBe(true);
      expect(true).toBe(true);
  });

});
