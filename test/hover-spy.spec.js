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

  it('should have a controller', function () {
    element = createElement();
    expect(element.controller('hoverSpy')).toBeDefined();
    var HoverSpyCtrl = element.controller('hoverSpy');
    expect(HoverSpyCtrl).toBeDefined();
  });

  describe('AbramzHoverSpyCtrl', function () {
    it('should not have a namespace if one is not provided', function () {
      element = createElement();
      expect(element.controller('hoverSpy')).toBeDefined();
      var HoverSpyCtrl = element.controller('hoverSpy');
      expect(HoverSpyCtrl).toBeDefined();
      expect(HoverSpyCtrl.NAMESPACE).toEqual('');
    });

    it('should have a namespace if one is in scope', function () {
      scope.namespace = 'namespace.in.scope';
      element = createElement();
      expect(element.controller('hoverSpy')).toBeDefined();
      var HoverSpyCtrl = element.controller('hoverSpy');
      expect(HoverSpyCtrl).toBeDefined();
      expect(HoverSpyCtrl.NAMESPACE).toEqual('namespace.in.scope');
    });

    it('should have a namespace if one is provided as hoverSpy attribute', function () {
      element = createElement('provided-namespace');
      expect(element.controller('hoverSpy')).toBeDefined();
      var HoverSpyCtrl = element.controller('hoverSpy');
      expect(HoverSpyCtrl).toBeDefined();
      expect(HoverSpyCtrl.NAMESPACE).toEqual('provided-namespace');
    });

    it('should set an event listener on $rootScope for mouseenter', function () {
      element = createElement('provided-namespace');
      expect(element.controller('hoverSpy')).toBeDefined();
      var HoverSpyCtrl = element.controller('hoverSpy');
      expect(HoverSpyCtrl).toBeDefined();
      expect($rootScope.$$listeners['provided-namespace:abramz.hover-spy-mouseenter']).toBeDefined();
    });

    it('should set an event listener on $rootScope for mouseleave', function () {
      element = createElement('provided-namespace');
      expect(element.controller('hoverSpy')).toBeDefined();
      var HoverSpyCtrl = element.controller('hoverSpy');
      expect(HoverSpyCtrl).toBeDefined();
      expect($rootScope.$$listeners['provided-namespace:abramz.hover-spy-mouseleave']).toBeDefined();
    });

    describe('handleMouseEnter', function () {
      it('should toggle the class in toggle mode', function () {
        element = createElement('provided-namespace', 'toggleClass');
        expect(element.hasClass('toggleClass')).toBe(false);
        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseenter');
        scope.$digest();
        expect(element.hasClass('toggleClass')).toBe(true);
      });

      it('should reverse toggle the class in toggle mode with a bang (!)', function () {
        element = createElement('provided-namespace', '!toggleClass');
        expect(element.hasClass('toggleClass')).toBe(true);
        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseenter');
        scope.$digest();
        expect(element.hasClass('toggleClass')).toBe(false);
      });

      it('should switch classes in onoff mode', function () {
        element = createElement('provided-namespace', '', 'onClass', 'offClass');
        expect(element.hasClass('onClass')).toBe(false);
        expect(element.hasClass('offClass')).toBe(true);
        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseenter');
        scope.$digest();
        expect(element.hasClass('onClass')).toBe(true);
        expect(element.hasClass('offClass')).toBe(false);
      });

      it('should toggle the toggle class and switch the onoff classes in kitchensink mode', function () {
        element = createElement('provided-namespace', 'toggleClass', 'onClass', 'offClass');
        expect(element.hasClass('toggleClass')).toBe(false);
        expect(element.hasClass('onClass')).toBe(false);
        expect(element.hasClass('offClass')).toBe(true);
        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseenter');
        scope.$digest();
        expect(element.hasClass('toggleClass')).toBe(true);
        expect(element.hasClass('onClass')).toBe(true);
        expect(element.hasClass('offClass')).toBe(false);
      });

      it('should reverse toggle the toggle class and switch the onoff classes in kitchensink mode with a bang (!)', function () {
        element = createElement('provided-namespace', '!toggleClass', 'onClass', 'offClass');
        expect(element.hasClass('toggleClass')).toBe(true);
        expect(element.hasClass('onClass')).toBe(false);
        expect(element.hasClass('offClass')).toBe(true);
        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseenter');
        scope.$digest();
        expect(element.hasClass('toggleClass')).toBe(false);
        expect(element.hasClass('onClass')).toBe(true);
        expect(element.hasClass('offClass')).toBe(false);
      });
    });

    describe('handleMouseLeave', function () {
      it('should toggle the class in toggle mode', function () {
        element = createElement('provided-namespace', 'toggleClass');
        expect(element.hasClass('toggleClass')).toBe(false);
        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseenter');
        scope.$digest();
        expect(element.hasClass('toggleClass')).toBe(true);
        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseleave');
        scope.$digest();
        expect(element.hasClass('toggleClass')).toBe(false);
      });

      it('should reverse toggle the class in toggle mode with a bang (!)', function () {
        element = createElement('provided-namespace', '!toggleClass');
        expect(element.hasClass('toggleClass')).toBe(true);
        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseenter');
        scope.$digest();
        expect(element.hasClass('toggleClass')).toBe(false);
        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseleave');
        scope.$digest();
        expect(element.hasClass('toggleClass')).toBe(true);
      });

      it('should switch classes in onoff mode', function () {
        element = createElement('provided-namespace', '', 'onClass', 'offClass');
        expect(element.hasClass('onClass')).toBe(false);
        expect(element.hasClass('offClass')).toBe(true);
        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseenter');
        scope.$digest();
        expect(element.hasClass('onClass')).toBe(true);
        expect(element.hasClass('offClass')).toBe(false);
        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseleave');
        scope.$digest();
        expect(element.hasClass('onClass')).toBe(false);
        expect(element.hasClass('offClass')).toBe(true);
      });

      it('should toggle the toggle class and switch the onoff classes in kitchensink mode', function () {
        element = createElement('provided-namespace', 'toggleClass', 'onClass', 'offClass');
        expect(element.hasClass('toggleClass')).toBe(false);
        expect(element.hasClass('onClass')).toBe(false);
        expect(element.hasClass('offClass')).toBe(true);
        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseenter');
        scope.$digest();
        expect(element.hasClass('toggleClass')).toBe(true);
        expect(element.hasClass('onClass')).toBe(true);
        expect(element.hasClass('offClass')).toBe(false);

        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseleave');
        scope.$digest();
        expect(element.hasClass('toggleClass')).toBe(false);
        expect(element.hasClass('onClass')).toBe(false);
        expect(element.hasClass('offClass')).toBe(true);
      });

      it('should reverse toggle the toggle class and switch the onoff classes in kitchensink mode with a bang (!)', function () {
        element = createElement('provided-namespace', '!toggleClass', 'onClass', 'offClass');
        expect(element.hasClass('toggleClass')).toBe(true);
        expect(element.hasClass('onClass')).toBe(false);
        expect(element.hasClass('offClass')).toBe(true);
        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseenter');
        scope.$digest();
        expect(element.hasClass('toggleClass')).toBe(false);
        expect(element.hasClass('onClass')).toBe(true);
        expect(element.hasClass('offClass')).toBe(false);
        $rootScope.$emit('provided-namespace:abramz.hover-spy-mouseleave');
        scope.$digest();
        expect(element.hasClass('toggleClass')).toBe(true);
        expect(element.hasClass('onClass')).toBe(false);
        expect(element.hasClass('offClass')).toBe(true);
      });
    });
  });
});