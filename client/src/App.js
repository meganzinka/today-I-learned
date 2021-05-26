import "./style/App.css";
import NavBar from "./components/NavBar";
import Entries from "./components/Entries";
import Home from "./components/Home";
import Popup from "./components/Popup"
import { Route, Switch } from "react-router-dom";
import brainIcon from "./images/1.png"

//simple home page design with nav-bar on left, switching between all entries & add entry 
function App() {
  return (
    <div>
      <header id="app-header">
          <div>
            <img id="header-icon" src={brainIcon}alt="light bulb with brain lighting up"/>
               Today I Learned 
          </div>
      </header>
      <div id="app-container">
        <div id="nav-bar-container">
          <NavBar id="nav-bar" />
        </div>
        <div id="main-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/facts" component={Entries} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
