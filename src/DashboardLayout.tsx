// src/DashboardLayout.tsx
import React, { useMemo, useState } from "react";
import { parseISO, startOfDay } from "date-fns";
import ComposedChartWidget from "./components/ComposedChartWidget";
import PieChartWidget from "./components/PieChartWidget";
import BarChartStageWidget from "./components/BarChartStageWidget";
import TreemapChart from "./components/TreemapChart";
import BubbleChart from "./components/BubbleChart";
import FeedList from "./components/FeedList";
import FilterPanel from "./components/FilterPanel";
import { composedData, barData } from "./Data/data";

export default function DashboardLayout() {
  const allDates = useMemo(() => Array.from(new Set(composedData.map(d => d.date))), []);
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

  // ✅ 日期范围状态
  const [startDateFilter, setStartDateFilter] = useState<Date | null>(null);
  const [endDateFilter, setEndDateFilter] = useState<Date | null>(null);

  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDateFilter(start);
    setEndDateFilter(end);
    console.log("Date range applied:", start.toISOString(), end.toISOString());
  };

  const filtered = (data: any[]) =>
    data.filter(d => {
      const inVisibleDate = visibleDates.has(d.date);
      const inVisibleMake = !d.make || visibleMakes.has(d.make);

      const inRange = !startDateFilter || !endDateFilter || (() => {
        try {
          const current = startOfDay(parseISO(d.date));
          const start = startOfDay(startDateFilter);
          const end = startOfDay(endDateFilter);
          return current >= start && current <= end;
        } catch {
          return false;
        }
      })();

      return inVisibleDate && inVisibleMake && inRange;
    });

  const pieData = useMemo(() => {
    const filteredData = filtered(composedData);
    const result = { New: 0, Used: 0 };
    filteredData.forEach(d => {
      if (d.state === "New") result.New += d.value;
      else if (d.state === "Used") result.Used += d.value;
    });

    return [
      { name: "New", value: result.New },
      { name: "Used", value: result.Used }
    ];
  }, [visibleDates, visibleMakes, startDateFilter, endDateFilter]);

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
        onDateRangeApply={handleDateRangeApply}
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
        <TreemapChart rawData={filtered(composedData)} visibleDates={visibleDates} visibleMakes={visibleMakes} />
        <BubbleChart visibleDates={visibleDates} visibleMakes={visibleMakes} />
        <PieChartWidget data={pieData} />
      </div>
    </div>
  );
}
