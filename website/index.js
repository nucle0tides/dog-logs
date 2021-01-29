import React from 'react';
import ReactDOM from 'react-dom';
import ApolloProvider from './apollo/Provider';
import App from './App';

ReactDOM.render(<ApolloProvider><App /></ApolloProvider>, document.getElementById('root'));
