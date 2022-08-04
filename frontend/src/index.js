import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "material-dynamic-colors";
import "beercss";
import './index.css';
import YourTemplatesPage from './pages/YourTemplates/YourTemplates';
import reportWebVitals from './reportWebVitals';
import TemplatePage from './pages/Template/Template';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <nav class="top"><h1>Packing List App</h1></nav>
        <main className="responsive">
          <Routes>
            <Route path="/" element={<YourTemplatesPage />} />
            <Route path="template/:templateId" element={<TemplatePage />} />
          </Routes>
        </main>
        <nav className="bottom"><div>About Us</div></nav>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
