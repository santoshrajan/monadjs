# monadjs

## Monad Library for JavaScript

### Install
    $ npm install monadjs

### Usage
#### Nodejs
    var monads = require("monadjs");
#### Browser
Use [browserify](http://browserify.org/) to use in browser.

Note: Latest version "0.1.0" is not compatible with the previous versions "0.0.6"

### Docs

#### Available monads 

    monads.identity      // Identity Monad
    monads.mayBe         // Maybe Monad
    monads.array         // Array Monad
    monads.state         // State Monad
    monads.continuation  // Continuation Monad
    monads.parser        // Parser Monad
    monads.do            // is the doMonad function

See examples folder.

See the following blogpost for usage and explanation. [http://functionaljavascript.blogspot.in/2013/07/monads.html](http://functionaljavascript.blogspot.in/2013/07/monads.html)



