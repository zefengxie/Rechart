import React from "react";
import { useParams } from "react-router-dom";
import img from "./travel.webp"; // 封面图

import "../App.css"; // 确保包含我们自定义的 CSS

export default function FeedDetailsPage() {
  const { id } = useParams();

  return (
    <div className="details-container">
      <img src={img} alt="cover" className="details-cover" />

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
          Bluey world campaign is targeting interstate audience from NSW and Victoria who have shown intent to travel to Brisbane. Using rich media creatives, we have tested and engaged the audience audience across parenting personas. Insights were based on data from weekly lead and sales lookback to the campaign which gave us a richness and market resonance of the campaign.
        </p>
      </section>

      <section className="details-section">
        <h2 className="details-subtitle">Strong audience engagement with the creative:</h2>
        <img src="/images.png" alt="Engagement Chart" className="details-chart" />
        <p>
          On average we have seen strong engagement with the creative with an average of 61.7% engagement rate with the creative. For NSW, reach total 23,045, the engagement rate is double at 61.0%.
        </p>
      </section>

      <section className="details-section">
        <h2 className="details-subtitle">Travel insights of the target audience:</h2>
        <img src="/images.png" alt="Travel Insights" className="details-chart" />
        <p>
          On average the purchase window of target audience for the campaign was 52.88 days for Victorian travellers to Brisbane and 43.81 days for NSW travellers to Brisbane.
        </p>
      </section>

      <section className="details-section">
        <h2 className="details-subtitle">Victorian travellers with kids are on average spending 1 more day vs NSW travellers</h2>
        <img src="/images.png" alt="Stay Duration" className="details-chart" />
      </section>

      <section className="details-section">
        <h2 className="details-subtitle">On average Victorian and NSW travellers are travelling with 1.63 kids or more than 1 kid</h2>
        <img src="/images.png" alt="Kids Data" className="details-chart" />
      </section>

      <section className="details-section">
        <h2 className="details-subtitle">Friday departures and easter weekend are popular departure dates for Victorian and NSW travellers to Brisbane</h2>
        <img src="/images.png" alt="Departure Dates" className="details-chart" />
      </section>
    </div>
  );
}
