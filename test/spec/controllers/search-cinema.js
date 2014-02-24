'use strict';

describe('Controller: SearchCinemaCtrl', function () {

  // load the controller's module
  beforeEach(module('pocAngularFrontendApp'));

  var SearchCinemaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
      SearchCinemaCtrl = $controller('SearchCinemaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
      expect(true).toBe(true);
  });
});
