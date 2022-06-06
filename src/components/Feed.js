import React, { useState, useEffect, useRef } from "react";
import FeedItem from "./FeedItem";
import "../styles/Feed.css";

function Feed() {
  const [numOfColumns, setNumOfColumns] = useState(4);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchFeed();
    updateNumOfCols();
    window
      .matchMedia("(min-width:1680px)")
      .addEventListener("change", updateNumOfCols);
    window
      .matchMedia("(max-width:1268px)")
      .addEventListener("change", updateNumOfCols);
    window
      .matchMedia("(max-width:826px)")
      .addEventListener("change", updateNumOfCols);
    window
      .matchMedia("(max-width:384px)")
      .addEventListener("change", updateNumOfCols);
  }, []);

  async function fetchFeed() {
    const response = await fetch("http://localhost:3000/api/posts");
    const posts = await response.json();
    setPosts(posts);
  }

  function updateHeights() {
    const feedItems = document.querySelectorAll(".feed-item");
    let heights = {};
    for (const item of feedItems) {
      const height = item.clientHeight;
      heights[item.id] = height;
    }

    if (Object.keys(heights).length && posts.length) {
      setPosts((prev) => {
        const result = [...prev];
        for (const post of result) {
          post.height = heights[post._id];
        }
        return result;
      });
    }
  }

  function updateNumOfCols() {
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
    let columnHeights = [];
    let columns = [];
    for (let i = 0; i < numOfColumns; i++) {
      columns.push([]);
      columnHeights.push(0);
    }
    for (const post of posts) {
      const colIdx = columnHeights.indexOf(Math.min(...columnHeights));
      columns[colIdx].push(post);
      if (post.height) {
        columnHeights[colIdx] += post.height;
      }
    }
    return columns;
  }

  function getFeedColumns() {
    return getFeedArray().map((col, idx) => {
      return (
        <div className="feed-col">
          {col.map((post) => (
            <FeedItem post={post} updateHeights={updateHeights} />
          ))}
        </div>
      );
    });
  }

  return <div className="feed">{getFeedColumns()}</div>;
}

export default Feed;
