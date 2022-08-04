import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "material-dynamic-colors";
import "beercss";
import './index.css';
import YourTemplatesPage from './pages/YourTemplates/YourTemplates';
import reportWebVitals from './reportWebVitals';
import TemplatePage from './pages/Template/Template';
// import { accountIcon } from './assets/account.svg'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';


import AccountPage from './pages/Account/Account';
import { UserContextProvider } from './UserContext';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: '/api',
});

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),

});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserContextProvider>
        <BrowserRouter>
          <nav className="top">
            <div className='navbarLeft'></div>
            <a href="/"><h3>PackApp</h3></a>
            <div className='navbarRight'><a href="/account"> account </a></div>
          </nav>
          <main className="responsive">
            <Routes>
              <Route path="/" element={<YourTemplatesPage />} />
              <Route path="template/:templateId" element={<TemplatePage />} />
              <Route path="account" element={<AccountPage />} />
            </Routes>
          </main>
          <nav className="bottom"><div>About Us</div></nav>
        </BrowserRouter>
      </UserContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
