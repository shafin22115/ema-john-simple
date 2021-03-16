// import logo from '../src/images/logo.png';
// import './App.css';

import Header from "./component/Header.js/Header";
import Shop from "./component/Header.js/shop/Shop"
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from "./component/Review/Review";
import Manage from "./component/Review/Inventory/Manage";
import Notfound from "./NotFound/Notfound";
import ProductDetail from "./component/productDetail/ProductDetail";
import Login from "./component/Login/Login";
import Shipment from "./component/Shipment/Shipment";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <UserContext.Provider value = {[loggedInUser,setLoggedInUser]}>
      <h3>Email: {loggedInUser.email}</h3>
      
      <Router>
      <Header>    
      </Header>
        <Switch>
          <Route path="/shop">
          <Shop> </Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/manage">
            <Manage></Manage>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
          <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>
              
        </Switch>
      </Router>
      
      
    </UserContext.Provider>
  );
}

export default App;
