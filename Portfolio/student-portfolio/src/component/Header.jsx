
// import { Link } from "react-router-dom";


// function Header() {
//     return (
//         <header>
//             <h1>My Portfolio</h1>
//             <link rel="stylesheet" href="./home" />
//             <link rel="stylesheet" href="./about" />
//             <link rel="stylesheet" href="./contact" />
//             <link rel="stylesheet" href="./project" />
//             <link rel="stylesheet" href="./" />

//         </header>
//     );
// }

// export default Header;

import React from "react";
import { Link } from "react-router-dom";

function Header({ name }) {
    return (
        <header>
            <h1>{name}'s Portfolio</h1>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/project">Projects</Link> |{" "}
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
}

export default Header;
