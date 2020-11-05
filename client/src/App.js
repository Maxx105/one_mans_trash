import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Item from './pages/Item';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import About from './pages/About';
import NoMatch from './pages/NoMatch';
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
    <div>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/item' component={Item}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/signup' component={Signup}></Route>
        <Route exact path='/about' component={About}></Route>
        <Route exact path='/userProfile' component={UserProfile}></Route>
        <Route path='*' component={NoMatch}></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
