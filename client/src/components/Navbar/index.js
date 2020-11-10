import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthAPI from "../../utils/AuthAPI";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = props => {
    const {isAuthenticated, user, setIsAuthenticated, setUser} = useContext(AuthContext);

    function onClickLogoutHandler() {
        AuthAPI.logout().then(data=>{
            if(data.success) {
                setUser(data.user)
                setIsAuthenticated(false);
            }
        })
    }

    function preLoginNavbar() {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>
                <Link to="/about">
                    <li className="nav-item nav-link">
                        About
                    </li>
                </Link>
                <Link to="/login">
                    <li className="nav-item nav-link">
                        Login/Register
                    </li>
                </Link>
            </>
        )
    }

    function postLoginNavBar() {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>
                <Link to="/createitem">
                    <li className="nav-item nav-link">
                        Create Item
                    </li>
                </Link>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <Link to="/about">
                    <li className="nav-item nav-link">
                        About
                    </li>
                </Link>
                <Link to="/userprofile">
                    <li className="nav-item nav-link">
                        Profile
                    </li>
                </Link>
                <Link to="/">
                    <button type="button" 
                        className="btn btn-link nav-item nav-link" 
                        onClick={onClickLogoutHandler}>Logout</button>
                </Link>
                <li className="nav-item nav-link">
                    Hello, {user.username}
                </li>
            </>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">
                <div className="navbar-brand">One Man's Trash</div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    { !isAuthenticated ? preLoginNavbar() : postLoginNavBar() }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar; 