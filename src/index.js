import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(document.getElementById('root'));
// dev-u24j2zcigjxek1wp.us.auth0.com
// Ofl7ktnJnrXCrBNIusMdHMueiV5suoB0
/*
{
  "sub": "google-oauth2|105020491603970362201",
  "given_name": "Chiến",
  "family_name": "Nguyễn",
  "nickname": "chiennguyen1702",
  "name": "Chiến Nguyễn",
  "picture": "https://lh3.googleusercontent.com/a/AEdFTp7Q0m6ZIU97fzlsYI0EVMbhdqeBr1-EmOSTO_D1Lw=s96-c",
  "locale": "vi",
  "updated_at": "2023-02-21T06:42:56.000Z"
}
*/
root.render(
  <React.StrictMode>
    <GithubProvider>
      <App />
    </GithubProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
