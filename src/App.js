import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/App.css";
import Hero from "./components/Hero";
import Feed from "./components/Feed";
import Post from "./components/Post";

function App() {
  return (
    <div className="App">
      <Router>
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
    </div>
  );
}

export default App;
