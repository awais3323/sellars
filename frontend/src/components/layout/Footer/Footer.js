import React from "react";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter} from "react-icons/fa";
import { FaInstagram} from "react-icons/fa";
import { FaDashcube} from "react-icons/fa";
import { useSelector } from "react-redux";
import Intro from "./Intro";
const Footer = () => {
	const { modes } = useSelector((state) => state.DarkMode);
	var root = document.querySelector(':root');
	if (modes) {
		root.style.setProperty('--customColor', 'white');
	}
	else{
		root.style.setProperty('--customColor', '#212429');
	}
  return (
    <>
      <footer className="footer" style={{backgroundColor:`${modes?"black":"white"}`}}>
  	 <div className="container">
  	 	<div className="row">
  	 		<div className="footer-col">
  	 			<h4>Gadget Zone</h4>
  	 			<ul>
  	 				<li><a href="#">about us</a></li>
  	 				<li><a href="#">our services</a></li>
  	 				<li><a href="#">privacy policy</a></li>
  	 				<li><a href="#">affiliate program</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>get help</h4>
  	 			<ul>
  	 				<li><a href="#">FAQ</a></li>
  	 				<li><a href="#">shipping</a></li>
  	 				<li><a href="#">returns</a></li>
  	 				<li><a href="#">order status</a></li>
  	 				<li><a href="#">payment options</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>online shop</h4>
  	 			<ul>
  	 				<li><a href="#">watch</a></li>
  	 				<li><a href="#">bag</a></li>
  	 				<li><a href="#">shoes</a></li>
  	 				<li><a href="#">dress</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>follow us</h4>
  	 			<div className="social-links">
  	 				<a href="#"><FaFacebookF/></a>
  	 				<a href="#"><FaInstagram/></a>
  	 				<a href="#"><FaTwitter/></a>
  	 				<a href="#"><FaDashcube/></a>
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>

  <Intro modes={modes}/>
    </>
  );
};

export default Footer;
