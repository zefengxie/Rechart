import React, { useMemo, useState } from "react";
import { parseISO, startOfDay } from "date-fns";
import ComposedChartWidget from "./components/ComposedChartWidget";
import PieChartWidget from "./components/PieChartWidget";
import BarChartStageWidget from "./components/BarChartStageWidget";
import TreemapChart from "./components/TreemapChart";
import BubbleChart from "./components/BubbleChart";
import FeedList from "./components/FeedList";
import FilterPanel from "./components/FilterPanel";
import { composedData, dummyData,barData } from "./Data/data";
import { Loader, Center } from '@mantine/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function DashboardLayout() {
  const [isLoading, setIsLoading] = useState(false);

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

  const [startDateFilter, setStartDateFilter] = useState<Date | null>(null);
  const [endDateFilter, setEndDateFilter] = useState<Date | null>(null);

  const handleDateRangeApply = (start: Date, end: Date) => {
    setIsLoading(true);
    setTimeout(() => {
      setStartDateFilter(start);
      setEndDateFilter(end);
      setIsLoading(false);
    }, 500);
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

  const handleDownload = async () => {
    const input = document.body; // or use a specific element like document.querySelector('.dashboard-root')
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("dashboard.pdf");
  };

  const treemapData = useMemo(() => {
  const grouped: Record<string, { name: string; size: number }> = {};
  filtered(composedData).forEach((d) => {
    const make = d.make || "Unknown";
    if (!grouped[make]) {
      grouped[make] = { name: make, size: 0 };
    }
    grouped[make].size += d.size || 0; 
  });
  return Object.values(grouped);
}, [visibleDates, visibleMakes, startDateFilter, endDateFilter]);


  return (
    <>
      <div className="dashboard-header">
        <h2 className="dashboard-title">HONDA DATA DEAL INSIGHTS</h2>
        <div className="dashboard-menu-buttons">
          <button className="insight-btn">CAMPAIGN INSIGHT &gt;</button>
          <button className="insight-btn">CONVERSION INSIGHT &gt;</button>
          <button className="download-btn" onClick={handleDownload}>
            DOWNLOAD
          </button>
        </div>
      </div>

      <div className="dashboard-root">
        <div className="filter-wrapper">
          <div className="filter-row">
            <h3 className="filter-title">SELECT YOUR FILTERS:</h3>
            <div className="filter-bar">
              <FilterPanel
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                allDates={allDates}
                visibleDates={visibleDates}
                toggleDate={toggleDate}
                toggleAllDates={toggleAllDates}
                setVisibleMakes={setVisibleMakes}
                allMakes={allMakes}
                visibleMakes={visibleMakes}
                toggleMake={toggleMake}
                toggleAllMakes={toggleAllMakes}
                onDateRangeApply={handleDateRangeApply}
              />
            </div>
          </div>
        </div>

        <div className="summary-cards">
          {[ 
            { label: 'Number of shared segments', value: '1,263' },
            { label: 'Number of Make segments', value: '10' },
            { label: 'Number of Model segments', value: '84' }
          ].map(({ label, value }) => (
            <div key={label} className="summary-card">
              <div className="summary-label">{label}</div>
              <div className="summary-value">{value}</div>
            </div>
          ))}
        </div>

        <div className="top-section">
          <ComposedChartWidget 
          title="Campaign Reach"
          description="Comparing Impressions and Clicks"
          data={filtered(composedData)}
          isLoading={isLoading}
          xKey="date"
          bars={[{ key: "impressions", color: "#66bb6a", label: "Impressions" }]}
          lines={[{ key: "clicks", color: "#82ca9d", label: "Clicks" }]}
          leftYAxisLabel="Impressions"
          rightYAxisLabel="Clicks" 
           />
          <FeedList />
        </div>

        <div className="chart-grid grid-2">
          <BarChartStageWidget
          rawData={filtered(barData)}
          visibleDates={visibleDates}
          visibleMakes={visibleMakes}
          isLoading={isLoading}
          groupBy="stage"
          bars={[
          { key: "groupA", color: "#26c6da" },
          { key: "groupB", color: "#66bb6a" }
          ]}
          title="Audience Buyer Journey Stages"
          description="Chart showing users across journey stages."
          layout="vertical"
          height={250}
        />
          <TreemapChart
            title="Vehicle Makes"
            description="Larger box = more vehicles"
            data={treemapData}
            dataKey="size"
            nameKey="name"
            isLoading={isLoading}
          />
        </div>

        <div className="chart-grid grid-3">
          <PieChartWidget 
          title="New vs Used Audiences"
          description="Pie chart showing audience states"
          data={pieData}
          dataKey="value"
          nameKey="name"
          colors={["#26c6da", "#66bb6a"]}
          isLoading={isLoading} 
          />

          <PieChartWidget 
          title="New vs Used Audiences"
          description="Pie chart showing audience states"
          data={pieData}
          dataKey="value"
          nameKey="name"
          colors={["#26c6da", "#66bb6a"]}
          isLoading={isLoading} 
          />


          <BubbleChart 
          data={dummyData}
          xKey="x"                 
          yKey="y"                     
          zKey="z"                     
          title="Brand Comparison"
          description="X = Cost, Y = Engagement, Bubble size = Volume"
          />
        </div>
      </div>
    </>
  );
}
