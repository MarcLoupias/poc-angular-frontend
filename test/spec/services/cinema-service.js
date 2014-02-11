'use strict';

describe('Service: cinemaService', function () {

  // load the service's module
  beforeEach(module('pocAngularFrontendApp'));

  // instantiate service
  var cinemaService;
  beforeEach(inject(function (_cinemaService_) {
    cinemaService = _cinemaService_;
  }));

  it('should do something', function () {
    expect(!!cinemaService).toBe(true);
  });

});
