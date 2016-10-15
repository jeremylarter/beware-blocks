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
import {Blocks} from "../scripts/blocks";

before(function () {
    chai.should();//add should syntax to prototypes for fluent assertions
});

describe("sink", function () {
    it("should display content", function () {
        const expected = {};
        let actual = {};
        actual.should.be.deep.equal(expected, "sink should display a dom stream");
    });
});