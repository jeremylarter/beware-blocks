"use strict";
// when webpack is installed as a dev dependency, it can be run from a node prompt with node_modules\.bin\webpack
// also node_modules\.bin\webpack-dev-server
// http://localhost:8080/webpack-dev-server/index.htm
// also node_modules\.bin\webpack-dev-server --inline
// http://localhost:8080/
import {Observable} from "rxjs";
import {run} from "@cycle/rxjs-run";
import {Stream as xs} from "xstream";
import {makeDOMDriver} from "@cycle/dom"; // seems to require xstream so we might as well use it as well

// Webpack (1.x.x) doesn’t support ES6 modules; use require.ensure or require directly depending on which module format your transpiler creates.
// may be able to use this in Webpack 2.x.x
// import {Blocks} from "./beware.blocks"; // https://webpack.github.io/docs/code-splitting.html 
// using require did not work either. temporarily inlining component until this is resolved
// const Blocks = require("./beware.blocks"); // depends on @types/node, also need to reload project after installation

// start Blocks component inline
import {h1} from "@cycle/dom"; // seems to require xstream

// todo: add type to sources for component to enable intellisense and error checking at compile time
function Blocks(sources) {
  const seconds$ = sources.seconds;

  const props$ = sources.props.startWith({
    numberOfBlocks: 7
  });
  const state$ = props$;

  const vdom$ = state$;

  const value$ = props$.map(x => x.numberOfBlocks); // todo: make the output more meaningful

  // const a = "test built 9";
  const sinks = {
    DOM: seconds$.map(i =>
      h1("" + i + " seconds elapsed")
    ),
    value: value$
  };
  return sinks;
}
export {Blocks};
// end Blocks component inline

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
