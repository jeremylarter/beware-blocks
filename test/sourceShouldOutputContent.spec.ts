/*jslint
    node
*/
/*global
    describe, it, before
*/
"use strict";

import * as mocha from "mocha";
import { should } from "chai";
import { Blocks } from "../scripts/blocks";

import {Stream as xs} from "xstream";
import { Observable } from "rxjs";
//import * as Rx from "rxjs";

import { run } from "@cycle/rxjs-run";
import {default as RxJSAdapter} from "@cycle/rxjs-adapter"
//import {default as xsAdapter} from "@cycle/xstream-adapter"
//import { StreamAdapter } from '@cycle/base';

//import { makeDOMDriver } from "@cycle/dom";
//let CycleDOM = require('../../lib/index');
import * as CycleDOM from "@cycle/dom";
let mockDOMSource = CycleDOM.mockDOMSource;

before(function () {
    should();//add should syntax to prototypes for fluent assertions
});

describe("source", function () {
    it("should have working deep equal assertions", function () {
        const expected = ["hello world"];
        const actual = ["hello world"];
        actual.should.deep.equal(expected);
    });

    it("should output numberOfBlocks into sink", function () {
        const expectedNumberOfBlocks = 7;
        const childSource = {
            props: xs.of({
                numberOfBlocks: expectedNumberOfBlocks
            }),
            seconds: Observable.interval(1000)
        };//todo: test setup of the childSource
        
        //const mockedDOMchildSource = mockDOMSource(RxJSAdapter, childSource);

        const sink = Blocks(childSource);

        let actual: number = 0;
        sink.value.take(1).subscribe({
            next: function (numberOfBlocks) {
                actual = numberOfBlocks;
            }, 
            error: x => x, 
            complete: x => x});

        actual.should.equal(expectedNumberOfBlocks);
    });

    // it("should output 100 seconds after 100 seconds has elapsed", function () {
    //     true.should.equal(false);
    // });
});
