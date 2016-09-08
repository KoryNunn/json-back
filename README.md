### json-back

JSON.parse() and .stringify() in callback passing style.

### Usage

```javascript
var JsonBack = require('json-back');

JsonBack.parse('{"a": 1, "b": 2}', function(error, result){
    // result === {a:1, b:2}
});

JsonBack.stringify({a:1, b:2}, function(error, result){
    // result === '{"a": 1, "b": 2}'
});
```

### Errors

Parsing:
```javascript
var JsonBack = require('json-back');

JsonBack.parse('{"a" 1, "b": 2}', function(error, result){
    // error instanceof SyntaxError
});

```

Stringifying:
```javascript
var JsonBack = require('json-back');

var object = {};
object.cyclic = object;

JsonBack.stringify(object, function(error, result){
    error; -> 'Converting circular structure to JSON'
});

```

## Also..

Reviver functions can be passed.

```javascript
var JsonBack = require('json-back');

JsonBack.parse('{"a": 1, "b": 2}', reviverFn, function(error, result){
    // result === {a:1, b:2}
});
```

as can replacers and spacers.

```javascript
var JsonBack = require('json-back');

JsonBack.parse('{"a": 1, "b": 2}', replacerFn, spacer, function(error, result){
    // result === {a:1, b:2}
});
```