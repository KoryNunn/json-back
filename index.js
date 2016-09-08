module.exports.parse = function (json, reviver, callback){
    if(arguments.length < 3){
        callback = reviver;
        reviver = null;
    }

    var result;

    try {
        result = JSON.parse(json, reviver);
    } catch(error){
        return callback(error);
    }

    callback(null, result);
};
module.exports.stringify = function (value, replacer, spacer, callback){
    if(arguments.length === 3){
        if(typeof replacer === 'function'){
            callback = spacer;
            spacer = null;
        }else{
            callback = spacer;
            spacer = replacer;
            replacer = null;
        }
    }
    if(arguments.length === 2){
        callback = replacer;
        replacer = spacer = null;
    }

    var result;

    try{
        result = JSON.stringify(value, replacer, spacer);
    } catch(error){
        return callback(error);
    }

    callback(null, result);
};