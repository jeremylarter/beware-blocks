/*jslint
    node
*/
/*global
    describe, it, before
*/
"use strict";

import * as mocha from "mocha";
import * as chai from 'chai';
import {should, assert, config, expect, AssertionError} from "chai";
import {Blocks} from "../scripts/app";

before(function () {
    chai.should();//add should syntax to prototypes for fluent assertions
});

describe("source", function () {
    it("should output content", function () {
        const expected = ["hello world"];
        const actual = ["hello world"];
        actual.should.deep.equal(expected);
    });
});
