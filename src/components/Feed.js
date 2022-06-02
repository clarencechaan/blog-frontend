import React, { useState, useEffect } from "react";
import FeedItem from "./FeedItem";
import "../styles/Feed.css";

function Feed() {
  const [feedColumns, setFeedColumns] = useState([[], [], [], []]);
  const images = [
    "https://i.imgur.com/osBpkIK.jpg",
    "https://i.imgur.com/gCy94rL.jpg",
    "https://i.imgur.com/fvWfAZG.jpg",
    "https://i.imgur.com/JukeT5D.jpg",
    "https://i.imgur.com/LMKzlkq.jpg",
    "https://i.imgur.com/paGJsVN.jpg",
    "https://i.imgur.com/PxVQOVY.jpg",
    "https://i.imgur.com/N5JMdA1.jpg",
    "https://i.imgur.com/osBpkIK.jpg",
    "https://i.imgur.com/gCy94rL.jpg",
    "https://i.imgur.com/fvWfAZG.jpg",
    "https://i.imgur.com/JukeT5D.jpg",
    "https://i.imgur.com/LMKzlkq.jpg",
    "https://i.imgur.com/paGJsVN.jpg",
    "https://i.imgur.com/PxVQOVY.jpg",
    "https://i.imgur.com/N5JMdA1.jpg",
    "https://i.imgur.com/BXx0Cbo.jpg",
  ];

  useEffect(() => {
    setFeedColumns(() => {
      let result = [[], [], [], []];
      for (let i = 0; i < images.length; i++) {
        result[i % 4].push(images[i]);
      }
      return result;
    });
  }, []);

  function getFeedColumns() {
    return feedColumns.map((col, idx) => {
      return (
        <div className="feed-col">
          {col.map((img) => (
            <FeedItem imgUrl={img} />
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
