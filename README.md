Angualr Hover Spy
==================
[![Build Status](https://secure.travis-ci.org/abramz/angular-hover-spy.png)](http://travis-ci.org/abramz/angular-hover-spy)

AngularJS directive that enables spying on 'hover' events (mouseenter and mouseleave)

**Requirements:** AngularJS 1.2+ *OR* AngularJS < 1.2 and jQuery (for on/off DOM events)

## Installing

  bower install --save https://github.com/abramz/angular-hover-spy.git
  
## Examples

[See examples here](http://abramz.github.io/angular-hover-spy-example)

## Usage

```javascript
angular.module('myApp', ['abramz.hoverSpy']);
```

```html
<ANY hover-spy [[hover-spy-namespace="{string}"]
                [hover-spy-toggle="{string}"]
                [hover-spy-on="{string}" hover-spy-off="{string}"]]>
```

### Usage Examples
<ol>
  <li>Passive mode - will broadcast a messaage but will do nothing else.
    <ul>
      <li>mouseenter
        <ul>
          <li>broadcasts 'abramz.:hover-spy-mouseenter'</li>
        </ul>
      </li>
      <li>mouseleave
        <ul>
          <li>broadcasts 'abramz.:hover-spy-mouseleavae'</li>
        </ul>
      </li>
    </ul>
    <pre lang="html"><code>
  &lt;div hover-spy&gt;&lt;/div&gt;</pre></code>
  </li>
  <li>Passive mode (w/ namespace) - will broadcast a message with the namespace provided, but will do nothing else.
    <ul>
        <li>mouseenter
          <ul>
            <li>broadcasts 'abramz.exampleNamespace:hover-spy-mouseenter'</li>
          </ul>
        </li>
        <li>mouseleave
          <ul>
            <li>broadcasts 'abramz.exampleNamespace:hover-spy-mouseleavae'</li>
          </ul>
        </li>
    </ul>
    <pre lang="html"><code>
  &lt;div hover-spy hover-spy-namespace="exampleNamespace"&gt;&lt;/div&gt;</pre></code>
  </li>
  <li>Toggle mode - will broadcast a message and toggle the provided class.
    <ul>
        <li>mouseenter
          <ul>
            <li>broadcasts 'abramz.:hover-spy-mouseenter'</li>
            <li>adds 'toggleClass'</li>
          </ul>
        </li>
        <li>mouseleave
          <ul>
            <li>broadcasts 'abramz.:hover-spy-mouseleavae'</li>
            <li>removes 'toggleClass'</li>
          </ul>
        </li>
    </ul>
    <pre lang="html"><code>
  &lt;div hover-spy hover-spy-toggle="toggleClass"&gt;&lt;/div&gt;</pre></code>
  </li>
  <li>Reverse Toggle mode - will broadcast a message and toggle the provded class.
    <ul>
        <li>mouseenter
          <ul>
            <li>broadcasts 'abramz.:hover-spy-mouseenter'</li>
            <li>removes 'reverseToggleClass'</li>
          </ul>
        </li>
        <li>mouseleave
          <ul>
            <li>broadcasts 'abramz.:hover-spy-mouseleavae'</li>
            <li>adds 'reverseToggleClass'</li>
          </ul>
        </li>
        <l1>Note: 'reverseToggleClass' will be added onload.
    </ul>
    <pre lang="html"><code>
  &lt;div hover-spy hover-spy-toggle="!reverseToggleClass"&gt;&lt;/div&gt;</pre></code>
  </li>
  <li>OnOff mode - will broadcast a message and toggle and switch the provided classes.
    <ul>
        <li>mouseenter
          <ul>
            <li>broadcasts 'abramz.:hover-spy-mouseenter'</li>
            <li>adds 'onClass'</li>
            <li>removes 'offClass'</li>
          </ul>
        </li>
        <li>mouseleave
          <ul>
            <li>broadcasts 'abramz.:hover-spy-mouseleavae'</li>
            <li>adds 'offClass'</li>
            <li>removes 'onClass'</li>
          </ul>
        </li>
        <l1>Note: 'offClass' will be added onload.
    </ul>
    <pre lang="html"><code>
  &lt;div hover-spy hover-spy-on="onClass" hover-spy-off="offClass"&gt;&lt;/div&gt;</pre></code>
  </li>
  <li>Smörgåsbord (Kitchen Sink) mode - will broadcast a message with the namespace provided. and toggle the provided toggle class, and switch the provided on-off classes.
    <ul>
        <li>mouseenter
          <ul>
            <li>broadcasts 'abramz.:hover-spy-mouseenter'</li>
            <li>adds 'onClass'</li>
            <li>removes 'reverseToggleClass' and 'offClass'</li>
          </ul>
        </li>
        <li>mouseleave
          <ul>
            <li>broadcasts 'abramz.:hover-spy-mouseleavae'</li>
            <li>adds 'reverseToggleClass' and 'offClass'</li>
            <li>removes 'onClass'</li>
          </ul>
        </li>
        <l1>Note: 'reverseToggleClass' and 'offClass' will be added onload
    </ul>
    <pre lang="html"><code>
  &lt;div hover-spy hover-spy-namespace="exampleNamespace" 
                 hover-spy-toggle="!reverseToggleClass" 
                 hover-spy-on="onClass" hover-spy-off="offClass"&gt;&lt;/div&gt;</pre></code>
  </li>
</ol>
## How it Works
angular-hover-spy works by adding event listeners to the element for 'mouseenter' and  'mouseleave'. On 'mouseenter' and 'mouseleave', angular-hover-spy will '$emit' an event on '$rootScope' to the namespace provided in the 'hover-spy-namepsace' attribute, to a default namespace provided in the scope of the element, or without a namespace if neither are provided. From there a few things can happen
  1. Your custom event handlers can listen on '$rootScope' for these '$emit'ted messages and handle them however you want.
  2. You can provided various attributes to the element to have hover-spy do things for you (see the examples above). When you provide a 'hover-spy-toggle' or 'hover-spy-on' and 'hover-spy-off', angular-hover-spy will '$emit' an 'event-handled' message as well.

Since every instance of 'hover-spy' also listens for events on the namespace you provide, you can have 2 different elements aware of the other's hover events.

##License

Licensed under the MIT license
