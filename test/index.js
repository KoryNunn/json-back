var test = require('tape'),
    JsonBack = require('../');

test('Stringified JSON', function(t){
    t.plan(1);

    var input = '{"a": 1, "b": 2}',
        expectedOutput = {a:1, b:2};

    JsonBack.parse(input, function(error, result){
        t.deepEqual(result, expectedOutput);
    });
});

test('Boolean', function(t){
    t.plan(1);

    var input = 'true',
        expectedOutput = true;

    JsonBack.parse(input, function(error, result){
        t.deepEqual(result, expectedOutput);
    });
});

test('Array', function(t) {
    t.plan(1);

    var input = '[1, 2, "c", false]',
        expectedOutput = [1, 2, "c", false];

    JsonBack.parse(input, function(error, result){
        t.deepEqual(result, expectedOutput);
    });
});

test('null', function(t) {
    t.plan(1);

    var input = 'null',
        expectedOutput = null;

    JsonBack.parse(input, function(error, result){
        t.deepEqual(result, expectedOutput);
    });
});

test('object', function(t) {
    t.plan(1);

    var input = '{}',
        expectedOutput = {};

    JsonBack.parse(input, function(error, result){
        t.deepEqual(result, expectedOutput);
    });
});

test('reviver', function(t) {
    t.plan(1);

    var input = '{"a": 10}',
        reviver = function (key, value) {
            if(key === "") return value;
            return value / 2;
        },
        expectedOutput = { a: 5 };

    JsonBack.parse(input, reviver, function(error, result){
        t.deepEqual(result, expectedOutput);
    });
});

test('parse error', function(t) {
    t.plan(2);

    var input = '[1, 2, 3,]';

    JsonBack.parse(input, function(error, result){
        t.ok(~error.message.indexOf('Unexpected token ]'));
        t.equal(result, undefined);
    });
});

test('stringify error', function(t) {
    t.plan(2);

    var input = {};
    input.a = input;

    JsonBack.stringify(input, function(error, result){
        t.equal(error.message, 'Converting circular structure to JSON');
        t.equal(result, undefined);
    });
});

test('stringify', function(t) {
    t.plan(1);

    var input = {a:1, b:2},
        expectedOutput = '{"a":1,"b":2}';

    JsonBack.stringify(input, function(error, result){
        t.deepEqual(result, expectedOutput);
    });
});


test('stringify with spacer', function(t) {
    t.plan(1);

    var input = {a:1, b:2},
        expectedOutput = '{\n    "a": 1,\n    "b": 2\n}';

    JsonBack.stringify(input, '    ', function(error, result){
        t.deepEqual(result, expectedOutput);
    });
});

function replacer(key, value) {
  if (typeof value === "string") {
    return undefined;
  }
  return value;
}

test('stringify with replacer', function(t) {
    t.plan(1);

    var input = {a:1, b:'2'},
        expectedOutput = '{"a":1}';

    JsonBack.stringify(input, replacer, function(error, result){
        t.deepEqual(result, expectedOutput);
    });
});

test('stringify with replacer and spacer', function(t) {
    t.plan(1);

    var input = {a:1, b:'2'},
        expectedOutput = '{\n    "a": 1\n}';

    JsonBack.stringify(input, replacer, '    ', function(error, result){
        t.deepEqual(result, expectedOutput);
    });
});