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
import { Observable, TestScheduler, Observer } from "rxjs";
import * as Rx from "rxjs";

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

describe("marbles", function () {
    it("should have working deep equal assertions", function () {
        const expected = ["hello world"];
        const actual = ["hello world"];
        actual.should.deep.equal(expected);
    });

    function getOneThousandIntegers() {
        const thousandIntegers: number[] = [];
        for (let i: number = 0; i < 1000; i++) {
            thousandIntegers.push(i);
        }
        return thousandIntegers;
    }

    it("should output 1000 integers with async scheduler", function (done) {
        const thousandIntegers = getOneThousandIntegers();

        let timeStart = Date.now();
        Rx.Observable.from(thousandIntegers, Rx.Scheduler.async).subscribe(
            null, //onNext
            done, //onError
            function onCompleted() {
                console.log('complete time: ' + (Date.now() - timeStart) + 'ms');
                done();
            }
        );
    });

    it("should output 1000 integers synchronously with default scheduler", function () {
        let itCompleted: boolean = false;
        const thousandIntegers = getOneThousandIntegers();

        let timeStart = Date.now();
        Rx.Observable.from(thousandIntegers).subscribe(
            null, //onNext
            null, //onError
            function onCompleted() {
                console.log('complete time: ' + (Date.now() - timeStart) + 'ms');
                itCompleted = true;
            }
        );
        itCompleted.should.equal(true);
    });

    it("should output 1000 integers with default synchronous scheduler subscribe signature object", function () {
        let countNext: number = 0;
        const thousandIntegers = getOneThousandIntegers();

        let timeStart: number = Date.now();
        let myObserver: Observer<number> = {
            next: (x: number) => {
                countNext += 1;
            },
            error: (x: any) => console.log(x),
            complete: () => {
                console.log('complete time: ' + (Date.now() - timeStart) + 'ms');
            }
        };
        let stream = Rx.Observable.from(thousandIntegers);
        let mySubscription = stream.subscribe(myObserver);
        mySubscription.unsubscribe();
        countNext.should.equal(1000);
    });

    function testSchedulerAssertDeepEqual (actual, expected, prefix: string = "") {
        //todo: add no implicit any
        //console.log(prefix + "actual: " + actual + " expected:" + expected);
        actual.should.deep.equal(expected);
    }

    it("should have the basic anatomy of a test working", function () {
        //https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md
        //https://github.com/btroncone/egghead-rxjs-marble-testing-intro/blob/master/spec/helpers/marble-testing.ts
        //var e1 = hot('----a--^--b-------c--|');
        //var e2 = hot(  '---d-^--e---------f-----|');
        //var expected =      '---(be)----c-f-----|';
        //expectObservable(e1.merge(e2)).toBe(expected);

        const rxTestScheduler: TestScheduler = new Rx.TestScheduler(function (actual, expected) {
            testSchedulerAssertDeepEqual(actual, expected, "basic anatomy ");
        });

        let e1 = rxTestScheduler.createHotObservable<string>('----a--^--b-------c--|');
        let e2 = rxTestScheduler.createHotObservable<string>(  '---d-^--e---------f-----|');
        let expected =                                              '---(be)----c-f-----|';
        rxTestScheduler.expectObservable(e1.merge(e2)).toBe(expected);
        //let expectedFail =                                          '---(be)----c-------|';//missing f at frame 130
        //rxTestScheduler.expectObservable(e1.merge(e2)).toBe(expectedFail);
        rxTestScheduler.flush();
    });

    it("should have working synchronous marbles tests", function () {
        //https://www.learnrxjs.io/
        //https://github.com/btroncone/learn-rxjs
        //https://github.com/ReactiveX/rxjs
        //http://reactivex.io/rxjs/
        //http://reactivex.io/rxjs/manual/overview.html#introduction
        //https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
        //http://reactivex.io/learnrx/
        //https://lostechies.com/derickbailey/2012/08/17/asynchronous-unit-tests-with-mocha-promises-and-winjs/
        //https://github.com/ReactiveX/rxjs/blob/master/doc/scheduler.md
        
        const rxTestScheduler: TestScheduler = new Rx.TestScheduler(function (actual, expected) {
            testSchedulerAssertDeepEqual(actual, expected, "synchronous marbles ");
        });
        const values = {a: 1, b: 2, c: 3, x: "<h1>seconds elapsed 1</h1>", y: "<h1>seconds elapsed 2</h1>", z: "<h1>seconds elapsed 3</h1>"};
        const hotStream =             "^--a---b---c----";
        //const unsubscriptionMarbles = "^--------------!";
        const expectedMarbles =       "---x---y---z----";
        const myInterval = rxTestScheduler.createHotObservable<number>(hotStream, values, function (error) {
            console.log(error);
        });

        //todo: create a map that will pass this transformation test
        const mappedInterval: Observable<string> = myInterval.map((x: number) => "<h1>seconds elapsed " + x + "</h1>");

        rxTestScheduler.expectObservable(mappedInterval).toBe(expectedMarbles, values, function (error) {
            console.log("error in expectation: " + error);
        });
        rxTestScheduler.flush();
        // const delay: number = 10;
        // const state: number = 1;
        // interface workFunction<T> {
        //     (x?: T): void;
        // }
        // const work: workFunction<number> = (x?: number) => {};
        // //todo: what does this actually do?
        // scheduler.schedule<number>(work, delay, state);

    });
});
