'use strict';

describe('Controller: SearchCinemaByCountyCtrl', function () {

  // load the controller's module
  beforeEach(module('pocAngularFrontendApp'));

  var SearchCinemaByCountyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchCinemaByCountyCtrl = $controller('SearchCinemaByCountyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
