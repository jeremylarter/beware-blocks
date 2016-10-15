"use strict";
// when webpack is installed as a dev dependency, it can be run from a node prompt with node_modules\.bin\webpack
// also node_modules\.bin\webpack-dev-server
// http://localhost:8080/webpack-dev-server/index.htm
// also node_modules\.bin\webpack-dev-server --inline
// http://localhost:8080/
import {Observable} from "rxjs";
import {run} from "@cycle/rxjs-run";
import {Stream as xs} from "xstream";
import {makeDOMDriver} from "@cycle/dom";

import {Blocks} from "./blocks"; // https://webpack.github.io/docs/code-splitting.html

function main(sources) {
    const props$ = xs.of({
        numberOfBlocks: 7
    });

    const seconds$ = Observable.interval(1000);

    const childSources = {
        props: props$,
        seconds: seconds$
    };
    const blocks = Blocks(childSources);
    // const childValue = blocks.value;// an example how to get component output

    const childVDOM = blocks.DOM;
    const sinks = {
        DOM: childVDOM
    };
    return sinks;
}

const drivers = {
  DOM: makeDOMDriver("#app")
};

run(main, drivers);
