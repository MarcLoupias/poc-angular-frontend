'use strict';

describe('Service: angularUiConfirmModalService', function () {

  // load the service's module
  beforeEach(module('pocAngularFrontendApp'));

  // instantiate service
  var angularUiConfirmModalService;
  beforeEach(inject(function (_angularUiConfirmModalService_) {
    angularUiConfirmModalService = _angularUiConfirmModalService_;
  }));

  it('should do something', function () {
    expect(!!angularUiConfirmModalService).toBe(true);
  });

});
