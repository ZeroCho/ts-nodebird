export interface Dispatch<A extends Action> {
  (action: A): void;
}
export interface Middleware<A extends Action = AnyAction> {
  (store): (action: Action) => (next: Dispatch<A>) => void;
}

function combineReducers() {

}

function compose(...funcs: Function[]) {
  return funcs.reduce((a, b) => (...args: any) => a(b(...args)));
}
// compose(a, b, c, d) === a(b(c(d)))

function applyMiddlewares<A>(...middlewares: Middleware[]) {
  return (createStore) => (reducer, initialState) => {
    const store = createStore(reducer, initialState);
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => store.dispatch(action),
    }
    const funcs = middlewares.map((middleware) => {
      return middleware(middlewareAPI);
    });
    const dispatch = compose(...funcs)(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  };
}

export interface Action<T = any> {
  type: T
}
export interface AnyAction extends Action {
  [key: string]: any
}
export type Reducer<S = any, A extends Action = AnyAction> = (state: S, action: A) => S;
export interface Store<S, A> {
  getState(): S,
  dispatch(action: A): void;
  subscribe(callback: () => any): void;
}
function createStore<S, A extends Action>(reducer: Reducer<S, A>, initialState: S, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer, initialState);
  }
  let currentState = initialState;
  const listeners = [];
  const store: Store<S, A> = {
    getState() {
      return currentState;
    },
    subscribe(callback) {
      listeners.push(callback);
    },
    dispatch(action) {
      currentState = reducer(currentState, action);
      listeners.forEach((v) => v());
    },
  };

  return store;
}

export { combineReducers, createStore, applyMiddlewares, compose };
