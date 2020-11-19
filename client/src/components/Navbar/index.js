import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthAPI from "../../utils/AuthAPI";
import UserAPI from "../../utils/UserAPI";
import { AuthContext } from "../../Context/AuthContext";

function Navbar() {
    const {isAuthenticated, user, setIsAuthenticated, setUser} = useContext(AuthContext);
    const [userId, setUserId] = useState('');
    // const {id} = useParams();
    // const id = "5fb5f792257395ba68ecaf96"
    // const {userId} = useParams();

    function onClickLogoutHandler() {
        AuthAPI.logout().then(data=>{
            if(data.success) {
                setUser(data.user)
                setIsAuthenticated(false);
            }
        })
    }

    useEffect(() => {
        // console.log(id)
        UserAPI.getUser("5fb5f792257395ba68ecaf96")
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response));
    }, [])
    

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
                <Link to="/about">
                    <li className="nav-item nav-link">
                        About
                    </li>
                </Link>
                <Link to="/messages">
                    <li className="nav-item nav-link">
                        Messages
                    </li>
                </Link>
                <Link to={"/userprofile/" + "5fb5f792257395ba68ecaf96"}>
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