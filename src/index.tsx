import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/obnusenie.css';
import App from './App';
import store from './redux/redux-store';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <HashRouter>
        {/* <React.StrictMode> */}
            <Provider store={store}>
                <App state={store.getState()} />
            </Provider>
        {/* </React.StrictMode> */}
    </HashRouter>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
















