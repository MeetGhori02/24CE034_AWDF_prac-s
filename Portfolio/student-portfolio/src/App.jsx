import React, { lazy, Suspense } from "react";   
import Header from "./component/Header";
import About from "./component/About";
import Footer from "./component/footer";
import Skills from "./component/Skills";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ==========================================
// PRACTICAL 8: Dynamic Lazy Loading & Code Splitting
// ==========================================
const Home = lazy(() => import("./component/Home"));
const Project = lazy(() => import("./component/Project"));
const Contact = lazy(() => import("./component/Contact"));

// Practical 8: Fallback UI Component rendered while lazy-loaded chunks download
function LoadingFallback() {
  return (
    <div className="lazy-fallback-container">
      <div className="lazy-spinner"></div>
      <p className="lazy-loading-text">Loading page component dynamically...</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        {/* Pass the name prop to Header */}
        <Header name="MEET GHORI" /> 

        <h1>Hello, My name is MEET GHORI</h1>
        
        {/* Practical 8: Wrap Routes block with Suspense and Fallback UI */}
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Project />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>

        <About />
        <Skills skillList={["HTML", "CSS", "JavaScript", "React"]} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
