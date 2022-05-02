// import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import React from 'react';
import Home from './Component/home';
import Filter from "./Component/filter";
import Details from "./Component/Details";
import final from "./Component/final";
import Header from "./Component/Header";




export default function RoutesRoute(){
    return(
        <BrowserRouter>
            <Header />
            <Route exact path="/" component={Home}/>
            <Route path="/filter" component={Filter}/>
            <Route path="/details" component={Details}/>
            <Route path="/final" component={final}/>
        </BrowserRouter>
    )
}