"use strict";

var request = require("request");

//var querystring = require("querystring");

// require('request-debug')(request, function(type, data, r){

//     console.log('request debug =-------------------start---head---------------------------');

//     console.log(data.headers);

//     console.log('request debug =--------------------end-----head------------------------');

//     console.log('request debug =-------------------start---body---------------------------');

//     console.log(data.body);

//     console.log('request debug =--------------------end-----body------------------------');

// });

function rCall(command, args, callback, options) {
    var opts = options || {},
        url,
        method = Object.keys(args).length ? "POST" : "GET",
        qs = {};
    opts.server = opts.server || "http://localhost:5307";
    opts.root = opts.root || "/ocpu";

    url = opts.server + opts.root + command;

    qs.minSize = args.minSize;
    qs.beta = args.beta;
    qs.degree = args.degree;
    qs.plot = args.plot;

    var jsonObject = args.jsonObject;

    console.log(JSON.stringify(jsonObject));
    request({
        method: method,
        uri: url,
        body: 'jsonString=\'' + JSON.stringify(jsonObject) +'\'',
		qs: qs,
        headers: {'content-type': 'application/x-www-form-urlencoded'}
    }, function (err, response, data) {
        //console.log('in opencpu.rCall, response is: '); console.log(response);
        err = err || (response && (response.statusCode === 400 ||
                        response.statusCode === 502 ||
                        response.statusCode === 503) && response.statusCode);
        if (!err) {
            if (/json$/.test(url)) {
                data = JSON.parse(data);
                console.log('json response from server: '); console.log(data);
            }
        } else {
          console.log(' error in opencpu.rCall, response statusCode:' + response.statusCode +' body content: '); console.log(data);
          //console.log(' body was ===== : ' + JSON.stringify(args));
        }
        callback(err, data);
    });
}
exports.rCall = rCall;
