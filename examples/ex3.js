"use strict";

var opencpu = require("../lib/opencpu");

opencpu.packages.getInfo("MASS", function (err, data) {
    if (!err) {
        console.log(data);
    } else {
        console.log("opencpu call failed.");
    }
});

opencpu.packages.getExportedObjects("MASS", function (err, data) {
    if (!err) {
        console.log(data);
    } else {
        console.log("opencpu call failed.");
    }
});
