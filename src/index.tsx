import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';

import { Global, css } from '@emotion/react';
import Router from './router/router'
import './index.css';
import reportWebVitals from './reportWebVitals';

const globalStyles = css`
  body {
    margin: 0;
    padding: 0;
    background-color: #4fd15a;
  }
`;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Global styles={globalStyles}/>
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
