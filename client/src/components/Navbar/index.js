import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthAPI from "../../utils/AuthAPI";
import UserAPI from "../../utils/UserAPI";
import { AuthContext } from "../../Context/AuthContext";
import icon from "../../assets/trashLogo.jpg"
import "./style.css";
function Navbar() {
    const {isAuthenticated, user, setIsAuthenticated, setUser, id, setId, photo, setPhoto} = useContext(AuthContext);
    // const [photo, setPhoto] = useState('');
    function onClickLogoutHandler() {
        AuthAPI.logout().then(data=>{
            if(data.success) {
                // setId('')
                setUser(data.user)
                setIsAuthenticated(false);
            }
        })
    }
    useEffect(() => {
        if (id) {
        UserAPI.getUser(id._id)
            .then(res => {
                setPhoto(res.data.photo)})
            .catch(err => console.log(err.response));
        } else {
            return
        }
    }, [])
    function preLoginNavbar() {
        return (
            <>
                <div className="navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
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
                    </ul>
                </div>
            </>
        )
    }
    function postLoginNavBar() {
        return (
            <>  
                <div className="navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
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
                        {/* <Link to="/messages">
                            <li className="nav-item nav-link">
                                Messages
                            </li>
                        </Link> */}
                        <Link to={"/userprofile/" + id._id}>
                            <li className="nav-item nav-link">
                                Profile
                            </li>
                        </Link>
                    </ul>
                    <ul className="navbar-nav">
                        <Link to="/">
                            <li className="nav-item nav-link" onClick={onClickLogoutHandler}>
                                Logout
                            </li>
                        </Link>
                        <li className="nav-item nav-link disabled" id="username">
                            Hello, {user.username}
                            {/* <img src={URL + photo} width="55" height="55" className="img-thumbnail rounded-circle" style={{marginLeft: '10px'}}/> */}
                        </li>
                    </ul>
                </div>
                <li className="nav-item nav-link disabled" id="username">
                    <img src={photo} width="55" height="55" className="img-thumbnail rounded-circle"/>
                </li>
            </>
        )
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link to="/" className="navbar-brand">
            <img id="nav-icon" src={icon} width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy"/>
                ne Mans' Trash
            </Link>
            { !isAuthenticated ? preLoginNavbar() : postLoginNavBar() }
        </nav>
    )
}
export default Navbar; 