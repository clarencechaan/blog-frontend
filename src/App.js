import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/App.css";
import Hero from "./components/Hero";
import Feed from "./components/Feed";
import Post from "./components/Post";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchFeed();
  }, []);

  async function fetchFeed() {
    const response = await fetch("http://localhost:3000/api/posts/published");
    const posts = await response.json();
    setPosts(posts);
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Feed posts={posts} />
              </>
            }
          />
          <Route
            path="/posts/:postId"
            element={
              <>
                <ScrollToTop />
                <Post />
              </>
            }
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
