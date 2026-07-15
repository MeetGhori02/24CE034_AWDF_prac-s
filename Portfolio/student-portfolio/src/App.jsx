import React from "react";
import Header from "./component/Header";
import About from "./component/About";
import Footer from "./component/footer";
import Skills from "./component/Skills";
import './App.css';


function App() {
  return (
    <div>
      <h1>Hello , My name is MEET GHORI</h1>
      {/* <Header />
        <About />
        <Skills skillList={["HTML", "CSS", "JavaScript", "React"]} />
        <Footer /> */}

      <About />
      <Skills skillList={["HTML", "CSS", "JavaScript", "React"]} />
      <Footer />

      

    </div>
  )
}

export default App;

