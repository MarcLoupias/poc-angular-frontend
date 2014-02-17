'use strict';

describe('Controller: CrudCinemaCtrl', function () {

  // load the controller's module
  beforeEach(module('pocAngularFrontendApp'));

  var CrudCinemaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrudCinemaCtrl = $controller('CrudCinemaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
