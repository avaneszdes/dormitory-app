import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import i18n from "i18next";
import {Provider} from 'react-redux';
import {Router} from "react-router-dom";
import './i18next/i18n';
import {I18nextProvider} from "react-i18next";
import configureStore from "./Redux/configureStore";
import history from './Components/history'
import Main from "./Components/Main/Main";
const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <I18nextProvider i18n={i18n}>
                <Suspense fallback={<div/>}>
                    <Main/>
                </Suspense>
            </I18nextProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
);

