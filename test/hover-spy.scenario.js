describe('hover-spy', function () {
  'use strict';

  var scope, $compile, $rootScope;
  var element;

  beforeEach(module('abramz.hoverSpy'));

  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  var createElement = function (namespace, toggle, on, off) {
    if (typeof namespace === 'undefined') {
      namespace = '';
    }
    if (typeof toggle === 'undefined') {
      toggle = '';
    }
    if (typeof on === 'undefined') {
      on = '';
    }
    if (typeof off === 'undefined') {
      off = '';
    }
    var element = angular.element('<div hover-spy hover-spy-namespace="' +
      namespace +
      '" hover-spy-toggle="' +
      toggle +
      '" hover-spy-on="' +
      on +
      '" hover-spy-off="' +
      off +
      '"><p>Don\' clobber me!</p></div>');
    $compile(element)(scope);
    scope.$digest();
    return element;
  };

  it('should emit ', function () {
  	element = createElement();
    expect(element.controller('hoverSpy')).toBeDefined();
    var HoverSpyCtrl = element.controller('hoverSpy');
    expect(HoverSpyCtrl).toBeDefined();
  });
});