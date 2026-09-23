// import React, { Component } from "react";   
// import Header from "./component/Header";
// import About from "./component/About";
// import Footer from "./component/footer";
// import Skills from "./component/Skills";
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./component/Home";
// import Project from "./component/Project";
// import Contact from "./component/Contact";

// function App() {
//   return (
//     <Router>
//       <div>
//         <h1>Hello , My name is MEET GHORI</h1>
//         {/* <Header />
//         <About />
//         <Skills skillList={["HTML", "CSS", "JavaScript", "React"]} />
//         <Footer /> */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/project" element={<Project />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>



//         <About />
//         <Skills skillList={["HTML", "CSS", "JavaScript", "React"]} />
//         <Footer />
//       </div>
//     </Router>
//   )
// }

// export default App;


import React from "react";   
import Header from "./component/Header";
import About from "./component/About";
import Footer from "./component/footer";
import Skills from "./component/Skills";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Project from "./component/Project";
import Contact from "./component/Contact";

function App() {
  return (
    <Router>
      <div>
        {/* Pass the name prop to Header */}
        <Header name="MEET GHORI" /> 

        <h1>Hello, My name is MEET GHORI</h1>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <About />
        <Skills skillList={["HTML", "CSS", "JavaScript", "React"]} />
        <Footer />
      </div>
    </Router>
  )
}

export default App;
