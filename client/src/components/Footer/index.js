import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
function Footer(props) {
  return (
    <footer id="foot">
      <p>
         <Link to="/about">About</Link> | <Link to="/404">Support</Link> | <Link to="/404">Privacy Policy</Link> | <Link to="/404">Terms</Link> 
      </p>
      <p>
      Copyright ©2020 One Man's Trash
      </p>
    </footer>
  );
}
export default Footer;
