import React, { useState, useEffect, useRef } from "react";
import FeedItem from "./FeedItem";
import "../styles/Feed.css";

function Feed({ posts }) {
  const [numOfColumns, setNumOfColumns] = useState(4);

  useEffect(() => {
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

  function getFeedItems() {
    let columns = [];
    for (let i = 0; i < numOfColumns; i++) {
      columns.push([]);
    }
    for (let i = 0; i < posts.length; i++) {
      columns[i % numOfColumns].push(posts[i]);
    }
    return columns.map((col, idx) => (
      <div className="feed-col" key={"col" + idx}>
        {col.map((post) => (
          <FeedItem post={post} key={post._id} />
        ))}
      </div>
    ));
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

  return <div className="feed">{getFeedItems()}</div>;
}

export default Feed;
