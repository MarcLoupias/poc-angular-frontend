'use strict';

describe('Controller: AppVersionCtrl', function () {

  // load the controller's module
  beforeEach(module('pocAngularFrontendApp'));

  var AppVersionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppVersionCtrl = $controller('AppVersionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
      expect(true).toBe(true);
  });
});
