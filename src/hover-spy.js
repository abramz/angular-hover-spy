/**
 * hover-spy - directive
 *
 * Description -
 *   AngularJS directive that enables spying on "hover" events (mouseenter and mouseleave)
 *
 * Eample -
 *   <div hover-spy hover-spy-namespace="exampleNamespace"></div>
 *     - use this to create your own event handlers,
 *     - all you have to do is listen on the $rootScope for
 *     - 'abramz.exampleNamespace:hover-spy-mouseenter' - for mouseenter events
 *     - 'abramz.exampleNamespace:hover-spy-mouseleave' - for mouseleave events
 *   <div hover-spy hover-spy-namespace="exampleNamespace" hover-spy-toggle="active"></div>
 *     - use this to toggle a class on hover,
 *     - any element with the 'hover-spy="exampleNamespace"' attribute
 *     - will toggle the class provided in 'hover-spy-toggle="active"'
 *     - mouseenter will 'addClass' and mouseleave will 'removeClass'
 *     - optionally prefix the class with a bang (!) and functionality
 *     - will reverse
 *     - mouseenter will 'removeClass' and mouseleave will 'addClass'
 *     - the class will be added to the element on initialization in reverse mode
 *     - note that you can still add your own event listeners
 *    <div hover-spy hover-spy-namespace="exampleNamespace" hover-spy-on="show-me" hover-spy-off="hide-me"></div>
 *      - use this to add a class on mouseenter and add a different class on mouseleave
 *      - any element with the 'hover-spy="exampleNamespace"' attribute
 *      - will add the class provided in 'hover-spy-on="show-me"'
 *      - and remove the class provided in 'hover-spy-off="hide-me"'
 *      - the reverse will happen on mouseleave
 *      - any element with the 'hover-spy="exampleNamespace"' attribute
 *      - will add the class provided in 'hover-spy-off="hide-me"'
 *      - and remove the class provided in 'hover-spy-on="show-me"'
 *      - the 'hover-spy-off="hide-me"' class will be added on initialization
 *      - note that you can still add your own event listeners
 */

angular.module('abramz.hoverSpy', [])
  .constant('MOUSEENTER_EVENT', 'hover-spy-mouseenter')
  .constant('MOUSEENTER_HANDLED_EVENT', 'hover-spy-mouseenter-handled')
  .constant('MOUSELEAVE_EVENT', 'hover-spy-mouseleave')
  .constant('MOUSELEAVE_HANDLED_EVENT', 'hover-spy-mouseleave-handled')
  .directive('hoverSpy', [
    'MOUSEENTER_EVENT',
    'MOUSEENTER_HANDLED_EVENT',
    'MOUSELEAVE_EVENT',
    'MOUSELEAVE_HANDLED_EVENT',
    function (MOUSEENTER_EVENT, MOUSEENTER_HANDLED_EVENT, MOUSELEAVE_EVENT, MOUSELEAVE_HANDLED_EVENT) {
      'use strict';

      return {
        restrict: 'A', // restrict to attribute only
        scope: true, // make a new scope
        controllerAs: 'AbramzHoverSpyCtrl',
        controller: [
          '$log',
          '$rootScope',
          '$scope',
          function ($log, $rootScope, $scope) {
            /**
             * whether or not someone tried to initialize the controller
             * @type {Boolean}
             */
            var _initialized = false;

            /**
             * namespace for this controller
             * @type string
             */
            this.NAMESPACE = $scope.namespace &&
              $scope.namespace.length > 0 && $scope.namespace !== 'undefined' ?
                $scope.namespace :
                '';

            /**
             * add a namespace that may or may not exist to a message
             * @param  string  message   message we are adding the namespace to
             * @param  string? namespace namespace that may or may not exist
             * @return string            message with the namespace prepended to it or message
             */
            this.addNamespace = function (message, namespace) {
              var NAMESPACE_SEPARATOR = ':';

              if (namespace && namespace.length > 0) {
                return namespace + NAMESPACE_SEPARATOR + message;
              }
              return message;
            };

            /**
             * initialize controller
             * @param  string namespace namespace for the controller
             * @return boolean true for success, false for failure
             */
            this.initialize = function (namespace) {
              if (_initialized) {
                $log.warn('Caller tried to initialize after it was done already.');
                return false;
              } else {
                _initialized = true;
                setNamespace.call(this, namespace);
                setEventListeners.call(this);
                return true;
              }
            };

            /**
             * set event listeners for the controller
             */
            var setEventListeners = function () {
              /**
               * listen for mouseenter events broadcasted to rootScope
               * @param  Object event event object
               * @param  Object args  argument object
               */
              $rootScope.$on(this.addNamespace(MOUSEENTER_EVENT, this.NAMESPACE), function () {
                $scope.handleMouseEnter();
              });

              /**
               * listen for mouseleave events broadcasted to rootScope
               * @param  Object event event object
               * @param  Object args  argument object
               */
              $rootScope.$on(this.addNamespace(MOUSELEAVE_EVENT, this.NAMESPACE), function() {
                $scope.handleMouseLeave();
              });
            };

            /**
             * set namespace for the controller
             * @param string namespace namespace we will set for this controller
             */
            var setNamespace = function (namespace) {
              if (namespace && namespace.length > 0 && namespace !== 'undefined') {
                this.NAMESPACE = namespace;
              }
            };
          }
        ],
        link : function (scope, element, attrs, AbramzHoverSpyCtrl) {
          /**
           * figure out what mode we are in
           *  passive - nothing but namespace provided, we don't do anything
           *  toggle - toggle provided, we toggle class on mouseenter/mouseleave
           *  onoff - on and off provided, we switch classes on mouseenter/mouseleave
           *  kitchensink - toogle, on and off provided, mix toggle and onoff
           *
           * return string one of ['passive', toggle', 'onoff', 'kitchensink']
           */
          var getMode = function () {
            if (attrs.hoverSpyToggle && attrs.hoverSpyToggle.length > 0 && attrs.hoverSpyToggle !== 'undefined' &&
              attrs.hoverSpyOn && attrs.hoverSpyOn.length > 0 && attrs.hoverSpyOn !== 'undefined' &&
              attrs.hoverSpyOff && attrs.hoverSpyOff.length > 0 && attrs.hoverSpyOff !== 'undefined') {
              return 'kitchensink';
            } else if (attrs.hoverSpyToggle && attrs.hoverSpyToggle.length > 0 && attrs.hoverSpyToggle !== 'undefined') {
              return 'toggle';
            } else if (attrs.hoverSpyOn && attrs.hoverSpyOn.length > 0 && attrs.hoverSpyOn !== 'undefined' &&
              attrs.hoverSpyOff && attrs.hoverSpyOff.length > 0 && attrs.hoverSpyOff !== 'undefined') {
              return 'onoff';
            } else {
              return 'passive';
            }
          };

          var toggle = function (which) {
            var theToggleClass = attrs.hoverSpyToggle;
            if (theToggleClass.substring(0, 1) === '!') {
              // we are doing reverse toggling
              if (which === 'on') {
                // remove the class
                element.removeClass(theToggleClass.substring(1));
              } else {
                // add the class
                element.addClass(theToggleClass.substring(1));
              }
            } else {
              // we are doing normal toggling
              if (which === 'on') {
                // add the class
                element.addClass(theToggleClass);
              } else {
                // remove the class
                element.removeClass(theToggleClass);
              }
            }
          };

          var switcharoo = function (which) {
            var theOnClass = attrs.hoverSpyOn;
            var theOffClass = attrs.hoverSpyOff;
            if (which === 'on') {
              // add the 'on' class and remove the 'off' class
              element.addClass(theOnClass);
              element.removeClass(theOffClass);
            } else {
              // add the 'off' class and remove the 'on' class
              element.removeClass(theOnClass);
              element.addClass(theOffClass);
            }
          };

          var setUp = function (mode) {
            if (mode === 'toggle') {
              toggle('off');
            } else if (mode === 'onoff') {
              switcharoo('off');
            } else if (mode === 'kitchensink') {
              toggle('off');
              switcharoo('off');
            }
          };

          var mode = getMode();

          setUp(mode);

          /*
            initialize controller with information gathered from ui
           */
          AbramzHoverSpyCtrl.initialize(attrs.hoverSpyNamespace);

          var emit = function (message) {
            scope.$emit(AbramzHoverSpyCtrl.addNamespace(message, AbramzHoverSpyCtrl.NAMESPACE));
          };

          element.on('mouseenter', function () {
            scope.$apply(function () {
              emit(MOUSEENTER_EVENT);
            });
          });

          element.on('mouseleave', function () {
            scope.$apply(function () {
              emit(MOUSELEAVE_EVENT);
            });
          });

          /**
           * handle mouseenter based on mode
           */
          scope.handleMouseEnter = function () {
            switch (mode) {
            case 'toggle':
              toggle('on');
              break;
            case 'onoff':
              switcharoo('on');
              break;
            case 'kitchensink':
              toggle('on');
              switcharoo('on');
              break;
            }
            scope.$emit(AbramzHoverSpyCtrl.addNamespace(MOUSEENTER_HANDLED_EVENT, AbramzHoverSpyCtrl.NAMESPACE));
          };

          /**
           * handle mouseleave based on mode
           */
          scope.handleMouseLeave = function () {
            switch (mode) {
            case 'toggle':
              toggle('off');
              break;
            case 'onoff':
              switcharoo('off');
              break;
            case 'kitchensink':
              toggle('off');
              switcharoo('off');
              break;
            }
            scope.$emit(AbramzHoverSpyCtrl.addNamespace(MOUSELEAVE_HANDLED_EVENT, AbramzHoverSpyCtrl.NAMESPACE));
          };
        }
      };
    }
  ]);