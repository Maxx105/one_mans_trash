import React from "react";
import "./style.css";
import {Link} from "react-router-dom"
function Footer(props) {
    return (
            <footer id="foot">
                <p>Want to know what we're <Link to = "/about">about</Link> ?</p>
            </footer>
    );
}
export default Footer;