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
        <h1>Today I Learned:</h1></header>
      <div id="app-container">
        <div id="nav-bar-container">
          <NavBar id="nav-bar" />
        </div>
        <div id="main-container">
          <Switch>
            <Route path="/" component = {Home} />
            <Route path = "/facts" component = {Entries} />
            <Route path = "/facts/:objectid"  component = {EditAndDelete} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
