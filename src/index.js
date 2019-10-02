import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import authReducer from './reducers/authReducer'
import currentSelectedReducer from './reducers/currentSelectedReducer'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { ActionCableProvider } from 'react-actioncable-provider';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({auth: authReducer, selected: currentSelectedReducer})

const store = createStore(rootReducer, applyMiddleware(thunk))


ReactDOM.render(<Provider store={store}>
					<ActionCableProvider url={'ws://stark-fortress-17717.herokuapp.com/cable'}>
						<App />
					</ActionCableProvider>
				</Provider>, 
				document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
