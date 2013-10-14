Angualr Hover Spy
==================
[![Build Status](https://secure.travis-ci.org/abramz/angular-hover-spy.png)](http://travis-ci.org/abramz/angular-hover-spy)

AngularJS directive that enables spying on 'hover' events (mouseenter and mouseleave)

**Requirements:** AngularJS 1.2+ *OR* AngularJS < 1.2 and jQuery (for on/off DOM events)

## Installing

  bower install --save https://github.com/abramz/angular-hover-spy.git

## Usage:

```javascript
angular.module('myApp', ['abramz.hoverSpy']);
```

```html
<ANY hover-spy [[hover-spy-namespace="{string}"]
                [hover-spy-toggle="{string}"]
                [hover-spy-on="{string}" hover-spy-off="{string}"]]>
```

### Examples
1. Passive mode - will broadcast a messaage but will do nothing else.
    * mouseenter
        * broadcasts 'abramz.:hover-spy-mouseenter'
    * mouseleave
        * broadcasts 'abramz.:hover-spy-mouseleavae'

```html
<div hover-spy></div>
```

2. Passive mode (w/ namespace) - will broadcast a message with the namespace provided, but will do nothing else.
    * mouseenter
        * broadcasts 'abramz.exampleNamespace:hover-spy-mouseenter'
    * mouseleave
        * broadcasts 'abramz.exampleNamespace:hover-spy-mouseleave'

```html
<div hover-spy hover-spy-namespace="exampleNamespace"></div>
```

3. Toggle mode - will broadcast a message and toggle the provided class.
    * mouseenter
        * broadcasts 'abramz.:hover-spy-mouseenter'
        * adds 'toggleClass'
    * mouseleave
        * broadcasts 'abramz.:hover-spy-mouseleave'
        * removes 'toggleClass'

```html
<div hover-spy hover-spy-toggle="toggleClass"></div>
```

4. Reverse Toggle mode - will broadcast a message and toggle the provded class.
    * mouseenter
        * broadcasts 'abramz.:hover-spy-mouseenter'
        * removes 'reverseToggleClass'
    * mouseleave 
        * broadcasts 'abramz.:hover-spy-mouseleavae'
        * adds 'reverseToggleClass'
    * Note: 'reverseToggleClass' will be added onload

```html
<div hover-spy hover-spy-toggle="!reverseToggleClass"></div>
```

5. OnOff mode - will broadcast a message and toggle and switch the provided classes.
    * mouseenter
        * broadcasts 'abramz.:hover-spy-mouseenter'
        * adds 'onClass'
        * removes 'offClass'
    * mouseleave
        * broadcasts 'abramz.:hover-spy-mouseleavae'
        * adds 'offClass'
        * removes 'onClass'
    * Note: 'offClass' will be added onload

```html
<div hover-spy hover-spy-on="onClass" hover-spy-off="offClass"></div>
```

6. Smörgåsbord (Kitchen Sink) mode - will broadcast a message with the namespace provided. and toggle the provided toggle class, and switch the provided on-off classes.
    * mouseenter
        * broadcasts 'abramz.exampleNamespace:hover-spy-mouseenter'
        * adds 'onClass'
        * removes 'reverseToggleClass' and 'offClass'
    * mouseleave
        * broadcasts 'abramz.exampleNamespace:hover-spy-mouseleavae'
        * adds 'reverseToggleClass' and 'offClass'
        * removes 'onClass'
    * Note: 'reverseToggleClass' and 'offClass' will be added onload

```html
<div hovers-py hover-spy-namespace="exampleNamespace" hover-spy-toggle="!reverseToggleClass" 
                                                      hover-spy-on="onClass" 
                                                      hover-spy-off="offClass"></div>
```

## How it Works
angular-hover-spy works by adding event listeners to the element for 'mouseenter' and  'mouseleave'. On 'mouseenter' and 'mouseleave', angular-hover-spy will '$emit' an event on '$rootScope' to the namespace provided in the 'hover-spy-namepsace' attribute, to a default namespace provided in the scope of the element, or without a namespace if neither are provided. From there a few things can happen
  1. Your custom event handlers can listen on '$rootScope' for these '$emit'ted messages and handle them however you want.
  2. You can provided various attributes to the element to have hover-spy do things for you (see the examples above). When you provide a 'hover-spy-toggle' or 'hover-spy-on' and 'hover-spy-off', angular-hover-spy will '$emit' an 'event-handled' message as well.

Since every instance of 'hover-spy' also listens for events on the namespace you provide, you can have 2 different elements aware of the other's hover events.

##License

Licensed under the MIT license
