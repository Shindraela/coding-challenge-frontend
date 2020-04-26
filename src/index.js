import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { I18nextProvider } from "react-i18next";
import App from './App';
import i18n from "./i18n";

const store = createStore(rootReducer, applyMiddleware(thunk));
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  rootElement
);
