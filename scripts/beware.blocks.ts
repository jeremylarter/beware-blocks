"use strict";
// when webpack is installed as a dev dependency, it can be run from a node prompt with node_modules\.bin\webpack
// also node_modules\.bin\webpack-dev-server
// http://localhost:8080/webpack-dev-server/index.htm
// also node_modules\.bin\webpack-dev-server --inline
// http://localhost:8080/
import {Observable} from "rxjs";
import {run} from "@cycle/rxjs-run";
import {makeDOMDriver, h1} from "@cycle/dom";//seems to require xstream

function main() {
  const a = "test built 8";
  const sinks = {
    DOM: Observable.interval(1000).map(i =>
      h1("" + i + " seconds elapsed")
    )
  };
  return sinks;
}

const drivers = {
  DOM: makeDOMDriver("#app")
};

run(main, drivers);