import React, { useLayoutEffect, useState } from 'react';
import '../css/App.css';
import logo from '../../logo.png';
import SideBox from './sideBox';
import ChatBox from './chatBox';
import SingIn from './singIn';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from './stateProvider';

function App() {
  const [{ user }] = useStateValue();
  function useWindowWidth() {
    const [width, setWidth] = useState(window.screen.width);
    useLayoutEffect(() => {
      function updateWidth() {
        setWidth(window.screen.width);
      }
      window.addEventListener('resize', updateWidth);
      updateWidth();
      return () => window.removeEventListener('resize', updateWidth);
    }, []);
    return width;
  };
  const width = useWindowWidth();

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
              <Switch>
                <Route path="/rooms/:roomId">
                  {width > 500 && <SideBox />}
                  <ChatBox />
                </Route>
                <Route path="/">
                  <SideBox />
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