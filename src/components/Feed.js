import React, { useState, useEffect } from "react";
import FeedItem from "./FeedItem";
import "../styles/Feed.css";

function Feed() {
  const [numOfColumns, setNumOfColumns] = useState(4);
  const [posts, setPosts] = useState([]);

  async function fetchFeed() {
    const response = await fetch("http://localhost:3000/api/posts");
    const posts = await response.json();
    console.log(posts);
    setPosts(posts);
    setFeed();
  }

  function setFeed() {
    if (window.innerWidth >= 1680) {
      setNumOfColumns(4);
    } else if (window.innerWidth >= 1268) {
      setNumOfColumns(3);
    } else if (window.innerWidth >= 826) {
      setNumOfColumns(2);
    } else if (window.innerWidth >= 384) {
      setNumOfColumns(1);
    }
  }

  function getFeedArray() {
    let columns = [];
    for (let i = 0; i < numOfColumns; i++) {
      columns.push([]);
    }
    for (let i = 0; i < posts.length; i++) {
      columns[i % numOfColumns].push(posts[i]);
    }
    return columns;
  }

  useEffect(() => {
    fetchFeed();
    window.matchMedia("(min-width:1680px)").addEventListener("change", setFeed);
    window.matchMedia("(max-width:1268px)").addEventListener("change", setFeed);
    window.matchMedia("(max-width:826px)").addEventListener("change", setFeed);
    window.matchMedia("(max-width:384px)").addEventListener("change", setFeed);
  }, []);

  function getFeedColumns() {
    return getFeedArray().map((col, idx) => {
      return (
        <div className="feed-col">
          {col.map((post) => (
            <FeedItem
              author={post.author}
              title={post.title}
              body={post.body}
              publish_date={post.publish_date}
              imgUrl={post.img_url}
            />
          ))}
        </div>
      );
    });
  }

  return (
    <div>
      <div className="feed">{getFeedColumns()}</div>
    </div>
  );
}

export default Feed;
