<img src='./mickey.png' styles='display:block;text-align:center;margin: 0 auto;'>


Mickey.js
=========

Mouses are smarter these days! A handy tool to easily play mouses.
Mickey is still a work in progress, so it might have many issues, we'll be glad if you report them.
View examples here: [Mickey.js](http://mahdi-.github.io/Mickey.js/)


Why Mickey?
===========
<ul>
<li>No dependecy</li>
<li>jQuery-like API</li>
<li>Event-based</li>
<li>Easy to use</li>
</ul>

API
===

Mickey.js has a jQuery-like chained API. Mickey uses `document.querySelectorAll()` to parse selectors, so you have to separate selectors with commas, take a look:

	Mickey('button, .s').blink(200);

Here is a list of Mickey's functions:

<b>Mickey( selector )</b>

Needs an argument `selector` which is one or more CSS Selector(s) or an HTML Element Object.

<b>.blink( delay, cursor )</b>

Has two optional arguments `delay` and `cursor`. The cursor blinks with a `delay`, if you wan't to specify the cursor to be blinked, add `cursor`.

Defaults values:

	delay = 300
	cursor = 'default'

<b>.timeout( cursor, delay, revert )</b>

Has three optional arguments `cursor`, `delay` and `revert`. The current cursor changes to `cursor` after a `delay`, if `revert` is not null or undefined, the cursor changes back to what it was.

Default values:

	cursor = 'pointer'
	delay = 300
	revert = undefined

<b>.interval( from, to, delay )</b>

Has one optional argument `delay` and two must-be-specified arguments `from` and `to`. The cursor changes from `from` to `to` with a `delay` and repeats.

Default values:

	delay = 300

<b>.shadow( x, y, color, delay, className )</b>

Has 5 optional arguments `x`, `y`, `color`, `delay` and `id`. Adds a shadow to cursor, placed at right-bottom of the cursor, `x` and `y` are relative positions to shadow's place and cannot be less than 0, `color` specifies shadow's color and `delay` specifies the delay that shadow has to answer to mouse's move, and `className` specifies the `class` attribute gave to the shadow.

Default values:

	x = 0
	y = 0
	color = 'black'
	delay = 0
	className = undefined

<b>.text( text, styles, x, y, effect, className )</b>

Has 5 optional arguments `styles`, `x`, `y`, `effect` and `className` and a must-be-specified argument `text`. Adds a `text` that follows the cursor at it's right-bottom corner by default, relative position of text can be changed using `x` and `y`, CSS styles of the text can be specified using an object of styles as `styles` argument, can have different `effect`s and the text's `class` attribute is specified using `className` argument.

Defaullt values:

	styles = undefined
	x = 0
	y = 0
	effect = undefined
	className = undefined

Tip: No `effect` is currently available, developers are free to add effects to Mickey.

<b>.image( src, styles, x, y, effect, className )</b>

Same as `.text( .. )`, with a different of `src` instead of `text`.

Default values:

	styles = undefined
	x = 0
	y = 0
	effect = undefined
	className = undefined

Tip: No `effect` is currently available, developers are free to add effects to Mickey.


<b>.absolute()</b>

Has no argument, returns an object of mouse's current position with two properties `top` and `left`.

<b>.relative()</b>

Has no argument, returns an object of mouse's current position, relative to selector defined in `Mickey( .. )` with two properties `top` and `left`.

<b>.hover( function )</b>

Needs a function as first argument to be called on `mouseover` event.

<b>.click( function )</b>

Needs a function as first argument to be called on `click` event.

TODO
====

Mickey has a long way to go, but these spotted bugs are in priority:

Shadows:

[Issue #1](https://github.com/Mahdi-/Mickey.js/issues/1)
[Issue #2](https://github.com/Mahdi-/Mickey.js/issues/2)
[Issue #3](https://github.com/Mahdi-/Mickey.js/issues/3)


License
=======

Mickey is published under [MIT LICENSE](http://opensource.org/licenses/MIT).

The MIT License (MIT)

Copyright 2013 Mahdi Dibaiee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
