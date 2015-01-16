module.exports.parse = function (json, reviver, callback){
    if(arguments.length < 3){
        callback = reviver;
        reviver = null;
    }

    try {
        return callback(null, JSON.parse(json, reviver));
    } catch(error){
        return callback(error);
    }
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

    callback(null, JSON.stringify(value, replacer, spacer));
};