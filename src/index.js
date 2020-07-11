import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "react-datepicker/dist/react-datepicker.css";
import './index.css';

import { HashRouter, Switch, Route } from "react-router-dom";
import Logout from "./components/Logout";
import Navigation from "./components/Nav";
import Search from "./components/Search";
import AddCommission from "./components/AddCommission";
import CurrentConscript from "./components/CurrentConscript";
import EditCommission from "./components/EditCommission";
import EditConscript from "./components/EditConscript";
import DelCommission from "./components/DelCommission";
import DelConscript from "./components/DelConscript";
import ConscriptList from "./components/ConscriptList";
import CommissionList from "./components/CommissionList";
import AddConscript from "./components/AddConscript";

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route path="/addcommission" component={AddCommission}/>
            <Route path="/addconscript" component={AddConscript}/>

            <Route path="/conscript/:id" component={CurrentConscript}/>
            <Route path="/search" component={Search}/>

            <Route path="/editcommission" component={EditCommission}/>
            <Route path="/editconscript" component={EditConscript}/>

            <Route path="/delcommission" component={DelCommission}/>
            <Route path="/delconscript" component={DelConscript}/>

            <Route path="/conscriptlist" component={ConscriptList}/>
            <Route path="/commissionlist" component={CommissionList}/>


            <Route path="/nav" component={Navigation}/>
            <Route path="/logout" component={Logout} />
            <Route exact path="/" component={App} />
        </Switch>
    </HashRouter>
    ,document.getElementById('root')
);
