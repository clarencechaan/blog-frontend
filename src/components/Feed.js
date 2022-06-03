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

  function setNumOfColumns(num) {
    console.log(window.innerWidth, num);
    setFeedColumns(() => {
      let result = [];
      for (let i = 0; i < num; i++) {
        result.push([]);
      }
      for (let i = 0; i < images.length; i++) {
        result[i % num].push(images[i]);
      }
      return result;
    });
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

  useEffect(() => {
    setFeed();
    window.matchMedia("(min-width:1680px)").addEventListener("change", setFeed);
    window.matchMedia("(max-width:1268px)").addEventListener("change", setFeed);
    window.matchMedia("(max-width:826px)").addEventListener("change", setFeed);
    window.matchMedia("(max-width:384px)").addEventListener("change", setFeed);
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
