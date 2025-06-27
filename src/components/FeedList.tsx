import React from "react";
import { Link } from "react-router-dom";

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
    img: "/ToyotaYaris.avif", 
  },
  {
    title: "Getting ready for school holiday",
    date: "19-11-2024",
    author: "Shruneek Prasad",
    img: "/ToyotaHilux.webp",
  },
  {
    title: "North Queensland - Exploring top end",
    date: "19-11-2024",
    author: "Shruneek Prasad",
    img: "/Ford.jpg",
  },
];

const FeedList: React.FC = () => (
  <div className="feed-box">
    <h3 className="feed-title">Data Storytelling Feed</h3>
    <div className="feed-list">
      <hr className="feed-divider" />
      {feedItems.map(({ title, date, author, img }, index) => (
        <React.Fragment key={index}>
          <Link to={`/details/${index}`} className="feed-item-link">
            <div className="feed-card">
              <div className="feed-top-box">
                <img src={img} alt={title} className="feed-img" />
                <div className="feed-title-text">{title}</div>
              </div>
              <div className="feed-bottom-box">
                <span className="feed-date">{date}</span>
                <span className="feed-author">{author}</span>
              </div>
            </div>
          </Link>
          <hr className="feed-divider" />
        </React.Fragment>
      ))}
      <div className="feed-footer">
        <button className="add-button">Add to Feed ＋</button>
        <div className="explore-link">Explore All &gt;</div>
      </div>
    </div>
  </div>
);

export default FeedList;
