// import logo from '../src/images/logo.png';
// import './App.css';

import Header from "./component/Header.js/Header";
import Shop from "./component/Header.js/shop/Shop"
import React from "react";
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


function App() {
  return (
    <div>
      <Header>    
      </Header>
      <Router>
        <Switch>
          <Route path="/shop">
          <Shop> </Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/manage">
            <Manage></Manage>
          </Route>
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
      
      
    </div>
  );
}

export default App;
