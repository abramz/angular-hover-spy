/**
 * hover-spy - directive
 *
 * Description -
 *   AngularJS directive that enables spying on "hover" events (mouseenter and mouseleave)
 *
 * Eample -
 *   <div hover-spy="exampleNamespace"></div>
 *     - use this to create your own event handlers,
 *     - all you have to do is listen on the $rootScope for
 *     - 'exampleNamespace:hover-spy-mouseenter' - for mouseenter events
 *     - 'exampleNamespace:hover-spy-mouseLeave' - for mouseleave events
 *   <div hover-spy="exampleNamespace" hover-spy-toggle="active"></div>
 *     - use this to toggle a class on hover,
 *     - any element with the 'hover-spy="exampleNamespace"' attribute
 *     - will toggle the class provided in 'hover-spy-toggle="active"'
 *     - mouseenter will 'addClass' and mouseleave will 'removeClass'
 *     - optionally prefix the class with a bang (!) and functionality
 *     - will reverse
 *     - mouseenter will 'removeClass' and mouseleave will 'addClass'
 *     - the class will be added to the element on initialization in reverse mode
 *     - note that you can still add your own event listeners
 *    <div hover-spy="exampleNamespace" hover-spy-on="show-me" hover-spy-off="hide-me"></div>
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
  .constant('MOUSELEAVE_EVENT', 'hover-spy-mouseleave')
  .directive('hoverSpy', [
    '$q',
    'MOUSEENTER_EVENT',
    'MOUSELEAVE_EVENT',
    function ($q, MOUSEENTER_EVENT, MOUSELEAVE_EVENT) {
      'use strict';

      /**
       * add a namespace that may or may not exist to a message
       * @param  string  message   message we are adding the namespace to
       * @param  string? namespace namespace that may or may not exist
       * @return string            message with the namespace prepended to it or message
       */

      var addNamespace = function (message, namespace) {
        var NAMESPACE_SEPARATOR = ':';

        if (namespace && namespace.length > 0) {
          return namespace + NAMESPACE_SEPARATOR + message;
        }
        return message;
      };

      return {
        restrict: 'A', // restrict to attribute only
        scope: true, // make a new scope
        controllerAs: 'AbramzHoverSpyCtrl',
        controller: [
          '$log',
          '$q',
          '$rootScope',
          '$scope',
          function ($log, $q, $rootScope, $scope) {
            /**
             * whether or not someone tried to set namespace or not
             * @type {Boolean}
             */
            var _setNamespace = false;
            /**
             * whether or not someone tried to set event listeners or not
             * @type {Boolean}
             */
            var _setEventListeners = false;

            /**
             * namespace for this controller
             * @type string
             */
            this.NAMESPACE = $scope.namespace &&
              $scope.namespace.length > 0 && $scope.namespace !== 'undefined' ?
                $scope.namespace :
                '';

            /**
             * initialize controller
             * @param  string namespace namespace for the controller
             */
            this.initialize = function (namespace) {
              if (_setNamespace) {
                $log.warn('Caller tried to set namespace after it was already set.');
              } else {
                _setNamespace = true;
                setNamespace.call(this, namespace);
              }
              if (_setEventListeners) {
                $log.warn('Caller tried to set event listeners after they were already set.');
              } else {
                _setEventListeners = true;
                setEventListeners.call(this);
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
              $rootScope.$on(addNamespace(MOUSEENTER_EVENT, this.NAMESPACE), function (event, args) {
                $scope.handleMouseEnter();
              });

              /**
               * listen for mouseleave events broadcasted to rootScope
               * @param  Object event event object
               * @param  Object args  argument object
               */
              $rootScope.$on(addNamespace(MOUSELEAVE_EVENT, this.NAMESPACE), function(event, args) {
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
          AbramzHoverSpyCtrl.initialize(attrs.hoverSpy);

          element.on('mouseenter', function () {
            scope.$apply(function () {
              // do not do anything if we are in passive mode
              if (mode !== 'passive') {
                scope.$emit(addNamespace(MOUSEENTER_EVENT, AbramzHoverSpyCtrl.NAMESPACE));
              }
            });
          });

          element.on('mouseleave', function () {
            scope.$apply(function () {
              // do not do anything if we are in passive mode
              if (mode !== 'passive') {
                scope.$emit(addNamespace(MOUSELEAVE_EVENT, AbramzHoverSpyCtrl.NAMESPACE));
              }
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
          };
        }
      };
    }
  ]);