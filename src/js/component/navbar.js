import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3 p-2">
			<Link to="/tequeñoCongelado">
				<div className="">Tequeño congelado</div>
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
			</div>
		</nav>
	);
};
