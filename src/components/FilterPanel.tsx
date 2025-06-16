// src/components/FilterPanel.tsx
import React from "react";

interface FilterPanelProps {
  selectedFilters: Set<string>;
  toggleFilter: (filter: string) => void;
  allDates: string[];
  visibleDates: Set<string>;
  toggleDate: (date: string) => void;
  toggleAllDates: () => void;
  allMakes: string[];
  visibleMakes: Set<string>;
  toggleMake: (make: string) => void;
  toggleAllMakes: () => void;
}

const filters = ["Date", "Make", "Model", "Bodystyle", "Badge", "Vehicle Condition"];

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedFilters,
  toggleFilter,
  allDates,
  visibleDates,
  toggleDate,
  toggleAllDates,
  allMakes,
  visibleMakes,
  toggleMake,
  toggleAllMakes
}) => {
  return (
    <div className="filter-bar">
      {filters.map(f => (
        <div key={f} className="filter-wrapper">
          <button
            onClick={() => toggleFilter(f)}
            className={selectedFilters.has(f) ? "filter-button active" : "filter-button"}
          >
            {f} <span className="arrow-down">▾</span>
          </button>

          {f === "Date" && selectedFilters.has("Date") && (
            <div className="checkbox-dropdown">
              <div className="dropdown-header">
                Date In List
                <button onClick={toggleAllDates} style={{ float: "right", fontSize: 12, background: "none", border: "none", color: "#4fc3f7", cursor: "pointer" }}>
                  {visibleDates.size === allDates.length ? "✖ Deselect All" : "✔ Select All"}
                </button>
              </div>
              <div className="dropdown-items">
                {allDates.map(date => (
                  <label key={date}>
                    <input type="checkbox" checked={visibleDates.has(date)} onChange={() => toggleDate(date)} /> {date}
                  </label>
                ))}
              </div>
            </div>
          )}

          {f === "Make" && selectedFilters.has("Make") && (
            <div className="checkbox-dropdown">
              <div className="dropdown-header">
                Make In List
                <button onClick={toggleAllMakes} style={{ float: "right", fontSize: 12, background: "none", border: "none", color: "#4fc3f7", cursor: "pointer" }}>
                  {visibleMakes.size === allMakes.length ? "✖ Deselect All" : "✔ Select All"}
                </button>
              </div>
              <div className="dropdown-items">
                {allMakes.map(make => (
                  <label key={make}>
                    <input type="checkbox" checked={visibleMakes.has(make)} onChange={() => toggleMake(make)} /> {make}
                  </label>
                ))}
              </div>
            </div>
          )}

          {!(f === "Date" || f === "Make") && selectedFilters.has(f) && (
            <div className="checkbox-dropdown">
              <div className="dropdown-header">No Options</div>
              <div className="dropdown-items" style={{ color: '#aaa', padding: '6px 12px' }}>Coming Soon...</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;