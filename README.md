# ab.js [![Build Status](https://api.travis-ci.org/daniellmb/ab.js.png)](https://travis-ci.org/daniellmb/ab.js) [![Dependency Status](https://gemnasium.com/daniellmb/ab.js.png)](https://gemnasium.com/daniellmb/ab.js#tab-dev_dependencies)

Make user-driven decisions with this **214 byte** A/B test micro-library, that is completely self contained with no external dependencies. Use ab.js to choose a *cryptographically random* A/B test variant and log the results to your database. How you analyze the actionable data is up to you. Testing different versions of copy text, layouts, images and colors in the browser has never been more simple.

> "Write programs that do one thing and do it well." — Doug McIlroy, Unix philosophy 

The library consists of two parts the A/B tester (ab.js) and the logger (log.js). These are separate to enable you to choose the best tools based on your environment. Say for example you already have jQuery on the page and want to use that for logging data, great, then all you need to include is ab.js.

### [Check out a Live Example](http://daniellmb.github.io/ab.js/demo/)
[![A/B Testing Demo](http://daniellmb.github.io/ab.js/demo/demo.gif "A/B Testing Demo")](http://daniellmb.github.io/ab.js/demo/)

#### [Run the unit tests](http://daniellmb.github.io/ab.js/spec/)

### How to use

```javascript
  // 100% of the time this a/b test will run
  var ab = AB.test(['a','b'], 1);
  // use a JSON object to log any values you need
  AB.log({shown:ab}, 'http://example.com/log');
  
  // customize the frequency setting
  // 50% of the time this a/b test will run
  var ab = AB.test(['a','b'], 0.5);
  // check if we should run the test
  if (ab) {
    AB.log({shown:ab}, 'http://example.com/log');
  }

  // use any number of variants
  // one thousandth of the time this a/b test will run
  var ab = AB.test(['a','b','c'], 0.001);
  if (ab) {
    AB.log({shown:ab}, 'http://example.com/log');
  }
```

### Features

- Supported Methods
  - test
  - log

- Tested Environments
  - ES5
  - Safari
  - Google Chrome
  - Internet Explorer
  - iPhone Safari
  - iPad Safari
  - Firefox
  - Opera

### Documentation 

##### Options:

By default the two methods are assigned to the `window` object under the namespace `AB`. If you don't want the methods added there, simply modify the immediate function to pass in the JavaScript object of your choosing, and the namespace you want them exported under.

##### Methods:

- **AB.test** *(`Array` variants, `Number` frequency)*

  - summary: 
    - Returns a cryptographically random test variant or null based on how frequently you want to run the a/b tests. Important! the test frequency must be a float between 0.0001 and 1. To keep the function as light as possible there is no idiot-proofing, if you pass in bad data I'm not fixing it for you :-)
  
  - example:
    - Run an A/B test on the values red, green and refactor. The variable "ab" will always be either red or green or refactor, but never null because the frequency is set to 1 (always run the test).

      ```javascript
      var ab = AB.test(['red','green','refactor'], 1);
      console.log(ab);
      ```

  - variants: `Array`
    - required: an array of a/b test variants, can be any valid data type such as *Strings, Numbers, Booleans, Object, Arrays, Functions* etc.
  
  - frequency: `Number`
    - required: a `float` between 0.0001 and 1, for example:
      - `1` will always run the a/b test
      - `0.5` will run the test 50% of the time
      - `0.2` will run the test two out of ten times
      - `0.001` will run the test one thousandth of the time

  - returns: `Value` or `Null`
    - a `value` from the variants array or `null` if the test should not be run.

- **AB.log** *(`Object` data, `String` url, `Function` callback)*

  - summary:
        - The log method uses an image request to send data to your servers. This allows the code to work even on different websites and protocols by avoiding the cross-origin security restrictions with using AJAX.

  - example:
    - send foo=bar to example.com

      ```javascript
      AB.log({foo:"bar"}, "http://www.example.com");
      ```
      
  - data: `Object`
    - required: a JSON object of any data you want to log.

  - url: `String`
    - required: The url you want to send the data to, cross-domain requests are allowed!

  - callback: `Function`
    - optional: a function to be called when the log request fails or succeeds. Because all pending requests are canceled when the page is unloaded, this callback is particularly useful when you need ensure something is logged before leaving the page. An event object is provided to the callback
      - event.type === 'error' means the log request failed
      - event.type === 'load' means the log request succeeded

  - returns: `undefined`
    - no return value


### License 

(The MIT License)

Copyright (c) 2014 Daniel Lamb <daniellmb.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
