/*jslint
    node
*/
"use strict";

import * as chai from 'chai';
import {should, assert, config, expect, AssertionError} from 'chai';
// var chai = require("chai");

function chaiInstalled () {
    chai.should();
    //chai.assert(false, "assert works");
    let error = new chai.AssertionError("", {}, function () {});
    chai.config.includeStack = false;
    chai.config.showDiff = true;
    chai.config.truncateThreshold = 40;

    chai.expect(false, "expect works");

    let shouldhave = chai.should();

    "a string".should.equal("a string", "string comparison failed using should in chai");
}

export {chaiInstalled};