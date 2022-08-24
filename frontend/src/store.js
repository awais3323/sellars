import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  CategoriesProdReducer,
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer";
import {
  useReducer,
  profileupdaterReducer,
  forgotPasswordReducer,
} from "./reducers/userReducer";
import { darkModeSetter, topLoadingBarReducer,productCat } from "./reducers/otherReducer";
import { cartReducer } from "./reducers/cartReducer";


const reducer = combineReducers({
  products: productReducer,
  productsDetails: productDetailsReducer,
  pageProoductCategory: CategoriesProdReducer,
  DarkMode: darkModeSetter,
  user: useReducer,
  profile: profileupdaterReducer,
  forgotPassword: forgotPasswordReducer,
  toploader: topLoadingBarReducer,
  cart: cartReducer,
  prods:productCat
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
