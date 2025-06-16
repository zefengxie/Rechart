// src/components/FeedList.tsx
import React from "react";
import yarisImg from "./ToyotaYaris.avif";
import hiluxImg from "./ToyotaHilux.webp";
import fordImg from "./Ford.jpg";

// ✅ 定义类型
export type FeedItem = {
  title: string;
  date: string;
  author: string;
  img: string;
};

// ✅ 数据内容
const feedItems: FeedItem[] = [
  {
    title: "Toyota Yaris Persona – Eco-Explorer",
    date: "02-06-2025",
    author: "Rhys Joachim",
    img: yarisImg,
  },
  {
    title: "Toyota Hilux Persona – The Practical Performer",
    date: "02-06-2025",
    author: "Rhys Joachim",
    img: hiluxImg,
  },
  {
    title: "Ford Key Audience Personas",
    date: "19-03-2025",
    author: "Chris Walker",
    img: fordImg,
  },
];

// ✅ 展示组件
const FeedList: React.FC = () => (
  <div className="feed-box mobile-order-1">
    <h3 className="feed-title">Data Storytelling Feed</h3>
    <div className="feed-list-card compact">
      {feedItems.map(({ title, date, author, img }) => (
        <div className="story-card compact" key={title}>
          <img src={img} alt={title} />
          <div className="story-info">
            <div className="story-title">{title}</div>
            <div className="story-meta">
              {date}
              <br />
              <strong>{author}</strong>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FeedList;
