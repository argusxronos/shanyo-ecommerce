import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import cartItems from "./Reducers/cartItem";

const logger = createLogger();

const reducers = combineReducers({
  cartItems: cartItems,
});

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
