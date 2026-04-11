---
title: "Journey for Legacy Browsers: Transpiling and Babel"
excerpt: "Methods to support legacy browsers"
lang: "en"
routeSlug: "journey-for-legacy-browsers"
translationKey: "journey-for-legacy-browsers"
publishedAt: "2021-09-11T00:00:00.000+00:00"
updatedAt: "2025-12-07T10:55:47.000+00:00"
tags: ["blog", "frontend"]
featureImage: "/content/articles/journey-for-legacy-browsers/en/feature-image.png"
commentsTerm: "journey-for-legacy-browsers"
draft: false
---

<p>These days, there are very few users still using old browsers. Major browsers are highly optimized and support automatic updates, reducing the need to stick with outdated versions.</p><p>However, in many companies and government agencies in South Korea, the use of old browsers like Internet Explorer (IE) persists. For front-end developers tasked with supporting these environments, this can be quite challenging.</p><p>Writing JavaScript code that supports IE in 2024 is not easy. Modern syntax can be written in a single line, but the same functionality might require dozens of lines in older syntax.</p><p>Fortunately, developers around the world have already tackled this problem and created solutions. This article will explain methods to support legacy browsers through polyfills and transpiling, and introduce Babel, a tool that automates these processes.</p><hr><h2 id="running-modern-code-on-legacy-browsers"><em>Running Modern Code on Legacy Browsers</em></h2><p></p><p>First, let's look at what happens when you run normal, modern JavaScript code in IE. Here are some example codes and their results.</p><h3 id="example-1">Example 1</h3><pre><code class="language-javascript">alert('Hello, World!');
Object.assign({});</code></pre><figure class="kg-card kg-image-card"><img src="/content/articles/journey-for-legacy-browsers/en/image-1.png" class="kg-image" alt="" loading="lazy" width="365" height="37" decoding="async"></figure><h3 id="example-2">Example 2</h3><pre><code class="language-javascript">alert('Hello, World!');
async function a() {}
</code></pre><figure class="kg-card kg-image-card"><img src="/content/articles/journey-for-legacy-browsers/en/image-2.png" class="kg-image" alt="" loading="lazy" width="218" height="42" decoding="async"></figure><p>Both examples result in errors, but there is a significant difference between the two errors.</p><p>In Example 1, the alert is displayed, but the console shows an error indicating that the function does not exist. This means the code was parsed successfully, but an error occurred during execution because the function could not be found. This is called a runtime error.</p><p>In Example 2, the alert is not displayed, and the console shows a cryptic error. This indicates a failure during the parsing stage, preventing the code from executing at all. This is called a syntax error.</p><hr><h3 id="fixing-example-1"><em>Fixing Example 1</em></h3><p>Let's look at how to fix each type of error. Example 1 can be easily resolved by defining the <code>Object.assign</code> function at the start of the code.</p><pre><code class="language-javascript">if (!Object.prototype.entries) {
  Object.prototype.assign = function () {
    // Implementation code omitted
  };
}

alert('Hello, World!');
Object.assign({});
</code></pre><p>The important point here is that <strong>the original code is not modified; something is just added at the beginning.</strong> This method is known as a polyfill, implying "filling in the gaps."</p><h3 id="fixing-example-2">Fixing Example 2</h3><p>For Example 2, the error occurs during the parsing stage, so a polyfill alone is insufficient. The original code must be transformed into syntax that the old browser can understand.</p><pre><code class="language-javascript">alert('Hello, World!');
function a() {
  return new Promise(function(resolve) {
    resolve();
  });
}</code></pre><p>The important point here is that <strong>the original code is transformed into a form that the legacy browser can parse.</strong> This method is called transpiling, implying "transforming."</p><p>In summary, supporting legacy browsers with modern JavaScript requires both appropriate polyfills and transpiling when polyfills alone are not enough.</p><p>Handling this manually for every piece of code and library used is impractical. This is where Babel comes into play.</p><hr><h2 id="babel-to-the-rescue"><em>Babel to the Rescue</em></h2><p></p><p><code>Babel</code> is a tool designed to automate the polyfill and transpile processes. With Babel, developers can write code using the latest syntax, and Babel ensures the output works even on old browsers.</p><p>Let's follow Babel's <a href="https://babeljs.io/docs/en/usage" rel="noreferrer">documentation</a> to see how it transforms code.</p><blockquote>This section covers the usage of an older version of Babel. Focus on understanding the principles rather than the specific usage instructions.</blockquote><h3 id="babels-polyfill">Babel's Polyfill</h3><p></p><p>The documentation recommends adding the following libraries at the top of your code to make it compatible with IE's JavaScript engine.</p><pre><code class="language-javascript">import "core-js/stable";
import "regenerator-runtime/runtime";</code></pre><p>Previously, we discussed adding something at the beginning of the original code as a polyfill. <code>core-js</code> is a collection of various polyfills, pre-defining many modern ECMAScript standard functions that are not built into legacy JavaScript engines.</p><h3 id="babels-transpiling">Babel's Transpiling</h3><p></p><p>We have already added <code>core-js</code> for polyfills, but Babel also suggests adding the <code>regenerator-runtime</code> library at the top of the project. Let's see why this is necessary by transforming a code example that cannot be fixed by polyfills alone.</p><h4 id="example">Example</h4><pre><code class="language-javascript">async function a() {}</code></pre><h4 id="transformed-code">Transformed Code</h4><pre><code class="language-javascript">"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function test() {
  return _test.apply(this, arguments);
}

function _test() {
  // ------------------------------------ Focus on this part ---------------------------------------
  _test = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _test.apply(this, arguments);
}</code></pre><p>The result looks complex, but the key point is that the <code>async</code> code has been transformed to reference <code>regeneratorRuntime</code>.</p><p>Thus, Babel transpiles asynchronous code using the <code>regenerator-runtime</code> library, which is why this library must also be included at the top of the code.</p><p>In summary, Babel uses <code>core-js</code> for polyfills and <code>regenerator-runtime</code> for transpiling. This allows modern syntax to be converted into code that works on legacy browsers.</p><hr><h2 id="the-limitations-of-babel">The Limitations of Babel</h2><p></p><p>Once Babel is set up, it might seem like your code will work perfectly on old browsers. However, this is not always the case. Let's look at situations where <code>core-js</code> and <code>regenerator-runtime</code> might not be enough.</p><h3 id="the-limitations-of-core-js">The Limitations of <code>core-js</code></h3><p>First, <code>core-js</code> only includes ECMAScript standard functions. ECMAScript defines only language-level features, meaning it does not cover browser-specific APIs.</p><p>For example, the <code>ResizeObserver</code> API is not part of the ECMAScript standard and is thus not included in <code>core-js</code>.</p><p>To use such APIs, you need to include third-party polyfills or write them yourself. Developers must carefully verify whether the APIs they use are part of the ECMAScript standard or specific to browsers. Missing a polyfill can cause your app to suddenly stop working on legacy browsers.</p><h3 id="the-limitations-of-regenerator-runtime">The Limitations of <code>regenerator-runtime</code></h3><p>While Babel supports most modern JavaScript syntax, it does not officially support Stage 3 or lower proposals in the ECMAScript standard.</p><p>Notable examples include <code>Metadata</code> and <code>Decorator</code>, which are widely used due to the popularity of TypeScript. Here is an example of decorator syntax:</p><pre><code class="language-javascript">@annotation
class MyClass {
  constructor() {
    this.name = name;
  }
}
</code></pre><p>To use these in Babel, you need to install third-party plugins. As JavaScript continues to evolve, developers must ensure that the syntax they use can be processed by Babel.</p><h3 id="what-about-html-and-css">What About HTML and CSS?</h3><p>Finally, Babel is a tool for JavaScript. But web services are not just JavaScript. Once JavaScript issues are resolved, HTML and CSS issues remain. Are there similar tools for these?</p><p>Unfortunately, tools for HTML and CSS are not as developed as Babel. <code>lightningcss</code> and <code>postcss</code> exist for CSS, but they are not as convenient as Babel, and there is no equivalent for HTML. Developers must write HTML and CSS with legacy browser compatibility in mind from the start.</p><hr><h2 id="when-will-internet-explorer-disappear">When Will Internet Explorer Disappear?</h2><p></p><p>We've explored methods and challenges in supporting legacy browsers. To conclude, here are my thoughts on when Internet Explorer might finally disappear.</p><p>When I was discharged from the army in 2018, the standard browser in the military was IE8. It seems unbelievable now, but all military systems were built on ActiveX technology, making it difficult to transition.</p><p>Microsoft has announced that IE will be removed from Windows 11. This news was welcomed by many, but similar announcements were made with the release of Windows 10.</p><p>When Windows 10 was released,</p><p>Microsoft downgraded IE to a "support" program and introduced Edge. Despite this, IE continued to be used. Windows 11 will still offer IE compatibility mode in Edge, so I expect IE usage to persist.</p><p>I predict that IE might be phased out in enterprises and government agencies around 2040, but even this is uncertain due to the inertia of organizational systems. Microsoft has promised to support IE compatibility mode until at least 2029.</p><p>Supporting old browsers is always painful for developers, and I hope IE will be phased out soon. But whether that day will ever come remains to be seen.</p>
