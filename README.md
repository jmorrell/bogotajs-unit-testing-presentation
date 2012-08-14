
## Links

* [Jasmine](http://pivotal.github.com/jasmine/)
* [Sinon.js](http://sinonjs.org/)
* [Jasmine-Sinon](https://github.com/froots/jasmine-sinon) - Sinon matchers for Jasmine
* [Grunt](https://github.com/cowboy/grunt) - node.js build tool
* [grunt-jasmine-task](https://github.com/creynders/grunt-jasmine-task) - runs jasmine in Phantom.js
* [js-test-driver](http://code.google.com/p/js-test-driver/)
* [Jasmine js-test-driver adapter](https://github.com/ibolmo/jasmine-jstd-adapter)
* [Reveal.js](http://lab.hakim.se/reveal-js/) - HTML5 Presentation Framework
* [Nodejitsu](http://nodejitsu.com/) - Node.js PAAS. Currently hosting the presentation :)

## Requirements

The following are required to run everything:

* [Node.js](http://nodejs.org/)
* [phantomjs](http://phantomjs.org/)
* java to run [js-test-driver](http://code.google.com/p/js-test-driver/), not sure what version.

Once installed running `npm install` in the root directory should download and 
install all of the node.js libraries needed to run the server.

`node app.js` will start the server. You can see the presentation at `http://localhost:3000`. 

`node serve-tests.js` will serve the jasmine test suite on `http://localhost:3001`. You can 
also just open the file at `specs/index.html`.

`grunt jasmine` will run the jasmine tests in phantomjs and print the results to the console.

To run the tests in connected browsers using the js-test-driver server. Start the server 
with:

```
sh server.sh -p 9876 -j JsTestDriver.jar
```

and then direct any browsers you would like to run tests in to `http://localhost:9876/capture`.
Once the browsers are connected you can run tests in all of them using the command:

```
sh test.sh -j JsTestDriver.jar
```

## Windows Warning

I have no idea how much of this will work with Windows, though I suspect it would not require much to get it to run.

## Structure

The project structure should be fairly clear. Here's a quick guide:

`app.js` - The node.js server that serves the presentation. Written using express.js

`basic/`, `with-delete/`, `with-delete-with-voting/`, `with-summary/` - Various versions of 
the example app written using bad jQuery-spaghetti style

`backbone-refactor/` - The same app, re-written in MV* style using backbone.js.

`specs/` - The jasmine test suite.

`specs/spec/*.js` - Where the tests are defined.

## License
Copyright (c) 2012 Jeremy Morrell  
Licensed under the MIT license.
