// StorytellingFeed.tsx
import React from "react";
import "./App.css";
import fordImg from "./Ford.jpg";
import yarisImg from "./ToyotaYaris.avif";
import hiluxImg from "./ToyotaHilux.webp";

interface Story {
  title: string;
  date: string;
  author: string;
  img: string;
}

const stories: Story[] = [
  {
    title: "Toyota Yaris Persona – Eco-Explorer",
    date: "02-06-2025",
    author: "Rhys Joachim",
    img: yarisImg
  },
  {
    title: "Toyota Hilux Persona – The Practical Performer",
    date: "02-06-2025",
    author: "Rhys Joachim",
    img: hiluxImg
  },
  {
    title: "Ford Key Audience Personas",
    date: "19-03-2025",
    author: "Chris Walker",
    img: fordImg
  }
];

const StorytellingFeed: React.FC = () => {
  return (
    <div className="feed-box mobile-order-1">
      <h3 className="feed-title">Data Storytelling Feed</h3>
      <div className="feed-list-card compact">
        {stories.map(({ title, date, author, img }) => (
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
};

export default StorytellingFeed;