"use strict";

var createStore = function createStore(reducer, initialState) {
  var state = initialState;
  var emitter = createChangeEmitter();

  function dispatch(action) {
    state = reducer(state, action);
    emitter.emit();
    return action;
  }

  function getState() {
    return state;
  }

  return {
    dispatch: dispatch,
    getState: getState,
    subscribe: emitter.listen
  };
};
