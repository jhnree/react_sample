import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Home from './home'
import Header from './header'
import Footer from './footer'
import UserAdd from './useradd'
import UserUpdate from './userUpdate'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <div className="container-fluid">
                        <Route exact path="/" component={Home}/>
                        <Route path ="/add-user" component={UserAdd}/>
                        <Route path ="/update-user/:id" component={UserUpdate}/>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;