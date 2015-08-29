# jQuery.GuidingLight

Creating interactive tutorial made easy. GuidingLight is a jQuery plugin written in coffeescript and sass. 
It focuses on simplifing and visualizing online tutorials and "how-to"s.

# Features

- **Create interactive tutorials without scripts:** No javascript required, but much more powerful
- **Deal with multiple branches elegantly:** Different route for different choices
- **Navigate in steps freely:** Auto-generated navigation bar, free to jump to previous/next/whichever step
- **Useful accessories:** Built-in visualization tools for keyboard keys, terminal codes and so on

(Some of them are under construction)

# Demo

[Setup Network in CityU Student Residence](https://lhc70000.github.io/jquery.guiding-light/demo)

# Usage

## Basics
First include `jquery.guiding-light.js` and `jquery.guiding-light.css`.

All tutorial content should be put in **one HTML file**. This HTML file can have no `head` or `body` tags, and just make sure each step is in a `div` with proper `id`. The id of the first step's div must be `index `, and the last div's id should be `finish`. For example, in `tutorial.html`:
```html
<div id="index"> Welcome! </div>
<div id="step1"> This is step 1. </div>
<div id="step2"> This is step 2. </div>
<div id="finish"> Congrats! You finished. </div>
```
Then just use `data-target` to serialize them:
```html
<div id="index" data-target="#step1"> Welcome! </div>
<div id="step1" data-target="#step2"> This is step 1. </div>
<div id="step2" data-target="#finish"> This is step 2. </div>
<div id="finish"> Congrats! You finished. </div>
```
Create a `div` which has class `.cgl-container`. This div will be the container for the tutorial. Give the container the path to tutorial HTML file with `data-cgl-doc`, for example in `index.html`:
```html
<div class=".cgl-container" data-cgl-doc="tutorial.html"></div>
```
And that's all.

Here are some remarks:
- Step number and two buttons "Back to previous step" and "I completed this step" will be automatically added.
- Each step will be appended to last step by default. To open next step in new page (i.e. clear all previous steps on the screen), add `data-new-page="true"` to this step div. For example:
```html
<div id="step2" data-target="step3" data-new-page="true">
  Step 3 will be open in new page.
</div>
```

## Branches
GuidingLight provides support for multiple branches.

### Creating options
Add class `cgl-block-option` to mark a div as option, and add `data-target` to it. For example,
```html
<div id="choose-os">
  <div class="cgl-block-option" data-target="#windows">Windows</div>
  <div class="cgl-block-option" data-target="#osx">OS X</div>
  <div class="cgl-block-option" data-target="#linux">Linux</div>
<div>

<div id="windows">You chose Windows.</div>
<div id="osx">You chose OS X.</div>
<div id="linux">You chose Linux.</div>
```
The "I completed this step" button will not be added if there are any cgl-block-option in the step div.
Remarks:
- `data-img="(url)"` for an option can add a logo for this option.
- Add `large` class in an option div can make it a larger block.

### Record user's choice and deal with multiple branches
Adding `data-value="value"` for an option can attach a string to this option, which will be **recorded until the tutorial finished**.
Adding `data-for="value"` and `data-not-for="value"` to any elements will make this element visible only for (or not for) users who has this `value` in his history.
For example:
```html
<div id="choose-os">
  <div class="cgl-block-option" data-target="#windows" data-value="windows">Windows</div>
  <div class="cgl-block-option" data-target="#osx" data-value="osx">OS X</div>
  <div class="cgl-block-option" data-target="#linux" data-value="linux">Linux</div>
<div>

<div id="message">
  <div data-for="windows">You are using Windows.</div>
  <div data-for="osx">You are using OS X.</div>
  <div data-for="linux">You are using Linux.</div>
  <div data-not-for="windows">You are using an UNIX-like OS.</div>
</div>
```

## Accessories
- Terminal emulation: `<pre class="cgl-terminal">` label can make itself a terminal-like block. Moreover, any code in this terminal with class `cgl-terminal-highlight` can make it blink.
- Keyboard keys: Simply add class `cgl-keyboard` to a span.
- Inline code: Simply add class `cgl-code` to a span.
- Quotes: Simply add class `cgl-quote` to a div.


# Lisence

The MIT License (MIT)

Copyright (c) 2015 Collider LI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
