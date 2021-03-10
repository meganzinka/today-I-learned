import "./style/App.css";
import EditAndDelete from "./components/EditAndDelete";
import NavBar from "./components/NavBar";
import Entries from "./components/Entries";
import Home from "./components/Home";
import { Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <h1></h1>Today I Learned: <h1>This is the Entries Page</h1>
      </header>
      <div id="app-container">
        <div id="nav-bar-container">
          <NavBar id="nav-bar" />
        </div>
        <div id="main-container">
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path = "/facts">
              <Entries />
            </Route>
            <Route path = "/facts/:objectid" >
              <EditAndDelete />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
