import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Item from './pages/Item';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import About from './pages/About';
import CreateItem from './pages/CreateItem';
import NoMatch from './pages/NoMatch';
import Navbar from "./components/Navbar";
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import MessagingSystem from './pages/MessagingSystem';

function App() {
  return (
    <Router>
    <div>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <PrivateRoute path='/item/:id' component={Item}></PrivateRoute>
        <UnPrivateRoute path='/login' component={Login}></UnPrivateRoute>
        <PrivateRoute path='/createitem' component={CreateItem}></PrivateRoute>
        <UnPrivateRoute path='/signup' component={Signup}></UnPrivateRoute>
        <Route exact path='/about' component={About}></Route>
        <PrivateRoute exact path='/messages' component={MessagingSystem}></PrivateRoute>
        <PrivateRoute exact path='/userProfile' component={UserProfile}></PrivateRoute>
        <Route path='*' component={NoMatch}></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
