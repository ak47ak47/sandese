import React from 'react';
import '../css/App.css';
import logo from '../../logo.png';
import SideBox from './sideBox';
import ChatBox from './chatBox';
import SingIn from './singIn';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from './stateProvider';

function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <SingIn />
      ) : (
        <>
          <h1 className="app_title">
            <img src={logo} alt="app logo" className="app_logo" />
            sandese
          </h1>
          <div className="app_body">
            <Router>
              <SideBox />
              <Switch>
                <Route path="/rooms/:roomId">
                  <ChatBox />
                </Route>
              </Switch>
            </Router>
          </div>
        </>
      )}
    </div>
  );
}

export default App;