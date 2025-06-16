// ✅ Refactored DashboardLayout with full modular components and TypeScript support
import React, { useMemo, useState } from "react";
import ComposedChartWidget from "./components/ComposedChartWidget";
import PieChartWidget from "./components/PieChartWidget";
import BarChartStageWidget from "./components/BarChartStageWidget";
import TreemapChart from "./components/TreemapChart";
import BubbleChart from "./components/BubbleChart";
import FeedList from "./components/FeedList";
import FilterPanel from "./components/FilterPanel";
import { composedData, pieDataRaw, barData } from "./data";


export default function DashboardLayout() {
  const allDates = useMemo(() => composedData.map(d => d.date), []);
  const [visibleDates, setVisibleDates] = useState(new Set(allDates));
  const toggleDate = (date: string) => {
    setVisibleDates(prev => {
      const updated = new Set(prev);
      updated.has(date) ? updated.delete(date) : updated.add(date);
      return updated;
    });
  };

  const allMakes = useMemo(() => Array.from(new Set(composedData.map(d => d.make).filter(Boolean))), []);
  const [visibleMakes, setVisibleMakes] = useState(new Set(allMakes));
  const toggleMake = (make: string) => {
    setVisibleMakes(prev => {
      const updated = new Set(prev);
      updated.has(make) ? updated.delete(make) : updated.add(make);
      return updated;
    });
  };

  const [selectedFilters, setSelectedFilters] = useState(new Set<string>());
  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => {
      const updated = new Set(prev);
      updated.has(filter) ? updated.delete(filter) : updated.add(filter);
      return updated;
    });
  };

  const toggleAllDates = () => {
    setVisibleDates(prev =>
      prev.size === allDates.length ? new Set() : new Set(allDates)
    );
  };

  const toggleAllMakes = () => {
    setVisibleMakes(prev =>
      prev.size === allMakes.length ? new Set() : new Set(allMakes)
    );
  };

  const filtered = (data: any[]) =>
    data.filter(d => visibleDates.has(d.date) && (!d.make || visibleMakes.has(d.make)));

  return (
    <div className="dashboard-root">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Audience Insights</h2>
        <div className="dashboard-menu">☰</div>
      </div>

      <FilterPanel
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
        allDates={allDates}
        visibleDates={visibleDates}
        toggleDate={toggleDate}
        toggleAllDates={toggleAllDates}
        allMakes={allMakes}
        visibleMakes={visibleMakes}
        toggleMake={toggleMake}
        toggleAllMakes={toggleAllMakes}
      />

      <div className="summary-cards">
        {[{ label: 'Number of shared segments', value: '1,263' }, { label: 'Number of Make segments', value: '10' }, { label: 'Number of Model segments', value: '84' }].map(({ label, value }) => (
          <div key={label} className="summary-card">
            <div className="summary-label">{label}</div>
            <div className="summary-value">{value}</div>
          </div>
        ))}
      </div>

      <div className="top-section">
        <ComposedChartWidget data={filtered(composedData)} />
        <FeedList />
      </div>

      <div className="chart-grid">
        <BarChartStageWidget rawData={barData} visibleDates={visibleDates} visibleMakes={visibleMakes} />
        <TreemapChart rawData={composedData} visibleDates={visibleDates} visibleMakes={visibleMakes} />
        <BubbleChart visibleDates={visibleDates} visibleMakes={visibleMakes} />
        <PieChartWidget rawData={pieDataRaw} visibleDates={visibleDates} visibleMakes={visibleMakes} />
      </div>
    </div>
  );
}