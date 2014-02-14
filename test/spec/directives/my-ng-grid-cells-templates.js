'use strict';

describe('Directive: myNgGridCellsTemplates', function () {

  // load the directive's module
  beforeEach(module('pocAngularFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-ng-grid-cells-templates></my-ng-grid-cells-templates>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myNgGridCellsTemplates directive');
  }));
});