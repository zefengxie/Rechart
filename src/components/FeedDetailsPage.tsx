import React from "react";
import { useParams } from "react-router-dom";

import "../App.css"; // 保留样式

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
          The Bluey world campaign is targeting interstate audiences from NSW and Victoria who have shown intent to travel to Brisbane. Using rich media creatives, we tested and engaged audiences across parenting personas. Insights were based on weekly lead and sales lookbacks, giving us a richer understanding and strong market resonance.
        </p>
      </section>

      <section className="details-section">
        <h2 className="details-subtitle">Strong audience engagement with the creative:</h2>
        <img src="/images.png" alt="Engagement Chart" className="details-chart" />
        <p>
          We observed an average engagement rate of 61.7% with the creative. In NSW, the total reach was 23,045 and the engagement rate doubled to 61.0%.
        </p>
      </section>

      <section className="details-section">
        <h2 className="details-subtitle">Travel insights of the target audience:</h2>
        <img src="/images.png" alt="Travel Insights" className="details-chart" />
        <p>
          On average, the purchase window was 52.88 days for Victorian travelers to Brisbane and 43.81 days for NSW travelers.
        </p>
      </section>

      <section className="details-section">
        <h2 className="details-subtitle">
          Victorian travellers with kids are on average spending 1 more day than NSW travellers
        </h2>
        <img src="/images.png" alt="Stay Duration" className="details-chart" />
      </section>

      <section className="details-section">
        <h2 className="details-subtitle">
          On average, Victorian and NSW travellers are travelling with 1.63 kids
        </h2>
        <img src="/images.png" alt="Kids Data" className="details-chart" />
      </section>

      <section className="details-section">
        <h2 className="details-subtitle">
          Friday departures and Easter weekend are popular among Victorian and NSW travellers
        </h2>
        <img src="/images.png" alt="Departure Dates" className="details-chart" />
      </section>
    </div>
  );
}
