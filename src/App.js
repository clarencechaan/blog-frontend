import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/App.css";
import Hero from "./components/Hero";
import Feed from "./components/Feed";
import Post from "./components/Post";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Feed />
              </>
            }
          />
          <Route path="/posts/:postId" element={<Post />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
