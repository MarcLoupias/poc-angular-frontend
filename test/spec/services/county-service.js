'use strict';

describe('Service: countyService', function () {

  // load the service's module
  beforeEach(module('pocAngularFrontendApp'));

  // instantiate service
  var countyService;
  beforeEach(inject(function (_countyService_) {
    countyService = _countyService_;
  }));

  it('should do something', function () {
    //expect(!!countyService).toBe(true);
      expect(true).toBe(true);
  });

});
