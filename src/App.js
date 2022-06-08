import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/App.css";
import Hero from "./components/Hero";
import Feed from "./components/Feed";
import Post from "./components/Post";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import LogIn from "./components/LogIn";
import { isLoggedIn } from "./scripts/localStorage";

function App() {
  const [posts, setPosts] = useState([]);
  const [logged, setLogged] = useState(isLoggedIn());

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
                <Hero setLogged={setLogged} />
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
          <Route path="/login" element={<LogIn setLogged={setLogged} />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
