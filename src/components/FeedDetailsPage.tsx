import React from "react";
import { useParams } from "react-router-dom";
import CustomBarChart from "../components/somedata"; 
import "../App.css";

export default function FeedDetailsPage() {
  const { id } = useParams();

  return (
    <div className="details-container">
      <img src="/travel.webp" alt="cover" className="details-cover" />

      <div className="details-meta">
        <span className="details-date">Published on 11-02-2025</span>
        <span className="details-author">Shruneek Prasad</span>
      </div>

      <h1 className="details-title">
        Bluey - World - TEQ - High impact campaign
      </h1>

      <section className="details-section">
        <h2 className="details-subtitle">Overview:</h2>
        <p>
          The Bluey world campaign is targeting interstate audiences from NSW and Victoria...
        </p>
      </section>

      <section className="details-section">
        <h2 className="details-subtitle">Strong audience engagement with the creative:</h2>
        <CustomBarChart title="Engagement Over Time" dataKey="impressions" />
        <p>
          We observed an average engagement rate of 61.7% with the creative...
        </p>
      </section>

      <section className="details-section">
        <h2 className="details-subtitle">Travel insights of the target audience:</h2>
        <CustomBarChart title="Average Clicks" dataKey="clicks" />
        <p>
          On average, the purchase window was 52.88 days...
        </p>
      </section>

      <section className="details-section">
        <h2 className="details-subtitle">
          Victorian travellers with kids are on average spending 1 more day than NSW travellers
        </h2>
        <CustomBarChart title="number of value" dataKey="value" />
      </section>

      <section className="details-section">
        <h2 className="details-subtitle">
          On average, Victorian and NSW travellers are travelling with 1.63 kids
        </h2>
        <CustomBarChart title="Number of size" dataKey="size" />
      </section>

     
    </div>
  );
}
