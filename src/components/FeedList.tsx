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

// ✅ 主组件
const FeedList: React.FC = () => (
  <div
    className="feed-box"
    style={{
      backgroundColor: "white",
      borderRadius: 16,
      padding: 24,
      boxShadow: "0 0 24px rgba(0, 0, 0, 0.2)",
      maxWidth: 360,
    }}
  >
    <h3 style={{ fontSize: 22, marginBottom: 20, textAlign: "center" }}>TEQ Insights feed</h3>
    <div>
      {feedItems.map(({ title, date, author, img }, index) => (
        <div
          key={title}
          style={{
            display: "flex",
            gap: 14,
            paddingBottom: 16,
            marginBottom: 16,
            borderBottom: index !== feedItems.length - 1 ? "1px solid #ddd" : "none",
          }}
        >
          <img
            src={img}
            alt={title}
            style={{
              width: 80,
              height: 80,
              borderRadius: 8,
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 13, color: "#555" }}>{date}</div>
            <div style={{ fontSize: 14, fontWeight: "bold", marginTop: 2 }}>{author}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FeedList;
