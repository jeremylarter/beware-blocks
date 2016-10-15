import {h1} from "@cycle/dom";

// todo: add type to sources for component to enable intellisense and error checking at compile time
function Blocks(sources) {
  const seconds$ = sources.seconds;

  const props$ = sources.props;

  props$.startWith({
    numberOfBlocks: 7
  });

  const state$ = props$;

  const vdom$ = state$;

  const value$ = props$.map(x => x.numberOfBlocks); // todo: make the output more meaningful

  // const a = "test built 14";
  const sinks = {
    DOM: seconds$.map(i =>
      h1("" + i + " seconds elapsed - test module")
    ),
    value: value$
  };
  return sinks;
}
export {Blocks};
