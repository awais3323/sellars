import React,{useEffect} from "react";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter} from "react-icons/fa";
import { FaInstagram} from "react-icons/fa";
import { FaDashcube} from "react-icons/fa";
import { useSelector } from "react-redux";
import Intro from "./Intro";

const Footer = React.memo(() => {
	const { modes } = useSelector((state) => state.DarkMode);

	useEffect(() => {
		var root = document.querySelector(":root");
		if (modes) {
		  root.style.setProperty("--customColorcon", "#212429");
		  root.style.setProperty("--customColorcon_two", "black");
		  root.style.setProperty("--customColorcon_font", "white");
		  root.style.setProperty("--customColorcon_boxshd", "rgba(166,155,155,0)");
		} else {
		  root.style.setProperty("--customColorcon", "rgba(196, 215, 224, 0.31)");
		  root.style.setProperty("--customColorcon_two", "white");
		  root.style.setProperty("--customColorcon_font", "#212429");
		  root.style.setProperty(
			"--customColorcon_boxshd",
			"rgba(166,155,155,0.55)"
		  );
		}
	  }, [modes]);
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
});

export default Footer;
