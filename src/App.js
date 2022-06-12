import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/App.css";
import Hero from "./components/Hero";
import Feed from "./components/Feed";
import Post from "./components/Post";
import Footer from "./components/Footer";
import AdminDash from "./components/AdminDash";
import ScrollToTop from "./components/ScrollToTop";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import { isLoggedIn } from "./scripts/localStorage";

function App() {
  const [posts, setPosts] = useState([]);
  const publishedPosts = posts.filter((post) => post.published);
  const [logged, setLogged] = useState(isLoggedIn());

  useEffect(() => {
    fetchFeed();
  }, []);

  async function fetchFeed() {
    const response = await fetch("http://localhost:3000/api/posts");
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
                <Feed publishedPosts={publishedPosts} />
              </>
            }
          />
          <Route
            path="/posts/:postId"
            element={
              <>
                <ScrollToTop />
                <Post setLogged={setLogged} />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminDash
                setLogged={setLogged}
                posts={posts}
                fetchFeed={fetchFeed}
              />
            }
          />
          <Route
            path="/new"
            element={<NewPost setLogged={setLogged} fetchFeed={fetchFeed} />}
          />
          <Route
            path="/posts/:postId/edit"
            element={<EditPost setLogged={setLogged} fetchFeed={fetchFeed} />}
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
