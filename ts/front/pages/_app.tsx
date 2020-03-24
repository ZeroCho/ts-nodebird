import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import axios from 'axios';
import Helmet from 'react-helmet';
import { composeWithDevTools } from 'redux-devtools-extension';

import AppLayout from '../components/AppLayout';
import reducer, { IReducerState } from '../reducers';
import rootSaga from '../sagas';
import { LOAD_USER_REQUEST } from '../reducers/user';

// class NodeBird extends App {
//   static getInitialProps(context) {
//
//   }
//   render() {
//
//   }
// }

interface Props extends AppProps {
  store: Store<IReducerState>;
}

const NodeBird: NextPage<Props> = ({ Component, store, pageProps }) => (
  <Provider store={store}>
    <Helmet
      title="NodeBird"
      htmlAttributes={{ lang: 'ko' }}
      meta={[{
        charSet: 'UTF-8',
      }, {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
      }, {
        httpEquiv: 'X-UA-Compatible', content: 'IE=edge',
      }, {
        name: 'description', content: '제로초의 NodeBird SNS',
      }, {
        name: 'og:title', content: 'NodeBird',
      }, {
        name: 'og:description', content: '제로초의 NodeBird SNS',
      }, {
        property: 'og:type', content: 'website',
      }, {
        property: 'og:image', content: 'https://nodebird.com/favicon.ico',
      }]}
      link={[{
        rel: 'shortcut icon', href: '/favicon.ico',
      }, {
        rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
      }, {
        rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
      }, {
        rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
      }]}
    />
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  </Provider>
);

NodeBird.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx) || {};
  }
  return { pageProps };
};

interface IStore extends Store {
  sagaTask?: Task;
}
const configureStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store: IStore = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(NodeBird));
