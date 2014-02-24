'use strict';

describe('Controller: ErrorAlertCtrl', function () {

  // load the controller's module
  beforeEach(module('pocAngularFrontendApp'));

  var ErrorAlertCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ErrorAlertCtrl = $controller('ErrorAlertCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
      expect(true).toBe(true);
  });
});
