import React from "react";
import { Link } from "react-router-dom";
import yarisImg from "./ToyotaYaris.avif";
import hiluxImg from "./ToyotaHilux.webp";
import fordImg from "./Ford.jpg";

export type FeedItem = {
  title: string;
  date: string;
  author: string;
  img: string;
};

const feedItems: FeedItem[] = [
  {
    title: "Bluey - World - TEQ - High impact campaign",
    date: "11-02-2025",
    author: "Shruneek Prasad",
    img: yarisImg,
  },
  {
    title: "Getting ready for school holiday",
    date: "19-11-2024",
    author: "Shruneek Prasad",
    img: hiluxImg,
  },
  {
    title: "North Queensland - Exploring top end",
    date: "19-11-2024",
    author: "Shruneek Prasad",
    img: fordImg,
  },
];

const FeedList: React.FC = () => (
  <div className="feed-box">
    <h3 className="feed-title">TEQ Insights feed</h3>
    <div className="feed-list">
      {feedItems.map(({ title, date, author, img }, index) => (
        <Link key={index} to={`/details/${index}`} className="feed-item-link">
          <div className="feed-item">
            <img src={img} alt={title} className="feed-img" />
            <div className="feed-info">
              <div className="feed-title-text">{title}</div>
              <div className="feed-date">{date}</div>
              <div className="feed-author">{author}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default FeedList;
