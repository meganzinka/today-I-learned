import "./style/App.css";
import EditAndDelete from "./components/EditAndDelete";
import NavBar from "./components/NavBar";
import Entries from "./components/Entries";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";

//simple home page design with nav-bar on left, switching between all entries & add entry 
function App() {
  return (
    <div>
      <header id="app-header">
        <span>
          <div>
            <img src="https://iconfair.com/cepsools/2020/08/1-55.png" alt="light bulb with brain lighting up"/>
               Today I Learned 
          </div>
        </span>
      </header>
      <div id="app-container">
        <div id="nav-bar-container">
          <NavBar id="nav-bar" />
        </div>
        <div id="main-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/facts" component={Entries} />
            <Route path="/facts/:objectid" component={EditAndDelete} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
