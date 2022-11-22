import React, { useState, useEffect, useRef } from "react";
import FeedItem from "./FeedItem";
import "../styles/Feed.css";

function Feed({ publishedPosts }) {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (publishedPosts.length) {
      setLoading(false);
    }
  }, [publishedPosts]);

  function getFeedItems() {
    let columns = [];
    for (let i = 0; i < numOfColumns; i++) {
      columns.push([]);
    }
    for (let i = 0; i < publishedPosts.length; i++) {
      columns[i % numOfColumns].push(publishedPosts[i]);
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
    } else if (window.innerWidth > 1268) {
      setNumOfColumns(3);
    } else if (window.innerWidth > 826) {
      setNumOfColumns(2);
    } else if (window.innerWidth > 384) {
      setNumOfColumns(1);
    }
  }

  return (
    <div className="feed">
      {loading ? (
        <div className="loading-container">
          <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="loading-message">
            Loading... This may initially take 15-30s as the Render Web Service
            first wakes up.
          </div>
        </div>
      ) : (
        getFeedItems()
      )}
    </div>
  );
}

export default Feed;
