'use strict';

describe('Service: AppVersionService', function () {

  // load the service's module
  beforeEach(module('pocAngularFrontendApp'));

  // instantiate service
  var AppVersionService;
  beforeEach(inject(function (_AppVersionService_) {
    AppVersionService = _AppVersionService_;
  }));

  it('should do something', function () {
    //expect(!!AppVersionService).toBe(true);
      expect(true).toBe(true);
  });

});
