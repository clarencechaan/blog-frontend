import React, { useState, useEffect, useRef } from "react";
import FeedItem from "./FeedItem";
import "../styles/Feed.css";

function Feed() {
  const [feedColumns, setFeedColumns] = useState(null);
  const [heights, setHeights] = useState([]);
  const colRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const aggregateRef = useRef(null);
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
  ];

  useEffect(() => {
    setHeights(() => {
      let result = [];
      for (let i = 0; i < images.length; i++) {
        if (aggregateRef.current) {
          result.push(
            aggregateRef.current &&
              aggregateRef.current.children[i].clientHeight
          );
        }
      }
      return result;
    });
  }, []);

  useEffect(() => {
    setFeedColumns(() => {
      let result = [[], [], [], []];
      const order = getFeedColumnOrder();

      for (let i = 0; i < order.length; i++) {
        result[order[i]].push(images[i]);
      }

      console.log(order);
      return result;
    });
  }, [heights]);

  function getFeedColumnOrder() {
    let colHeights = [0, 0, 0, 0];
    let order = [];
    for (const height of heights) {
      const minIdx = colHeights.indexOf(Math.min(...colHeights));
      order.push(minIdx);
      colHeights[minIdx] += +height;
    }
    return order;
  }

  function getFeedColumns() {
    if (!feedColumns) {
      return (
        <div className="aggregate feed-col" ref={aggregateRef}>
          {images.map((img, idx) => (
            <FeedItem imgUrl={img} />
          ))}
        </div>
      );
    } else {
      return feedColumns.map((col, idx) => {
        return (
          <div className="feed-col" ref={colRefs[idx]}>
            {col.map((img) => (
              <FeedItem imgUrl={img} />
            ))}
          </div>
        );
      });
    }
  }

  return (
    <div>
      <div className="feed">{getFeedColumns()}</div>
    </div>
  );
}

export default Feed;
