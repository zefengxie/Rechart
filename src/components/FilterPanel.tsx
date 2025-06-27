import React, { useState, useEffect, useRef } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { enUS } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

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
  setVisibleMakes: (makes: Set<string>) => void;
  onDateRangeApply?: (startDate: Date, endDate: Date) => void;
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
  toggleAllMakes,
  setVisibleMakes,
  onDateRangeApply,
}) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date("2025-05-01"),
      endDate: new Date("2025-05-30"),
      key: "selection" as const,
    },
  ]);

  const [localVisibleMakes, setLocalVisibleMakes] = useState(new Set(allMakes));

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalVisibleMakes(new Set(visibleMakes));
  }, [visibleMakes]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        if (selectedFilters.size > 0) {
          selectedFilters.forEach(f => toggleFilter(f));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedFilters, toggleFilter]);

  return (
    <div
      className="filter-bar"
      ref={panelRef}
      style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-start" }}
    >
      {filters.map(f => (
        <div key={f} className="filter-wrapper" style={{ position: "relative" }}>
          <button
            onClick={() => toggleFilter(f)}
            className={selectedFilters.has(f) ? "filter-button active" : "filter-button"}
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              border: "none",
              backgroundColor: selectedFilters.has(f) ? "#1976d2" : "#eee",
              color: selectedFilters.has(f) ? "white" : "black",
              fontWeight: 500,
              cursor: "pointer"
            }}
          >
            {f} ▾
          </button>

          {f === "Date" && selectedFilters.has("Date") && (
            <div style={{
              position: "absolute",
              zIndex: 9999,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
              padding: 12,
              top: "100%",
              marginTop: 6
            }}>
              <DateRange
                editableDateInputs={true}
                onChange={(item: RangeKeyDict) =>
                  setDateRange([{
                    startDate: item.selection.startDate ?? new Date(),
                    endDate: item.selection.endDate ?? new Date(),
                    key: "selection",
                  }])
                }
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                locale={enUS}
              />
            </div>
          )}

          {f === "Make" && selectedFilters.has("Make") && (
            <div style={{
              position: "absolute",
              zIndex: 9999,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
              padding: 12,
              top: "100%",
              marginTop: 6,
              width: 240
            }}>
              <div style={{
                fontWeight: "bold",
                fontSize: 14,
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between"
              }}>
                Make In List
                <button onClick={() => {
                  setLocalVisibleMakes(prev => {
                    const isAllSelected = prev.size === allMakes.length;
                    return isAllSelected ? new Set() : new Set(allMakes);
                  });
                }} style={{
                  background: "none",
                  border: "none",
                  color: "#2196f3",
                  cursor: "pointer",
                  fontSize: 13
                }}>
                  {localVisibleMakes.size === allMakes.length ? "✖ Deselect All" : "✔ Select All"}
                </button>
              </div>
              <div style={{
                maxHeight: "210px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                paddingRight: 4
              }}>
                {allMakes.map(make => (
                  <label key={make} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <input
                      type="checkbox"
                      checked={localVisibleMakes.has(make)}
                      onChange={() => {
                        setLocalVisibleMakes(prev => {
                          const updated = new Set(prev);
                          updated.has(make) ? updated.delete(make) : updated.add(make);
                          return updated;
                        });
                      }}
                    />
                    {make}
                  </label>
                ))}
              </div>
            </div>
          )}

          {!(f === "Date" || f === "Make") && selectedFilters.has(f) && (
            <div style={{
              position: "absolute",
              zIndex: 9999,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
              padding: 12,
              top: "100%",
              marginTop: 6
            }}>
              <div style={{ fontSize: 14, color: "#666" }}>No Options</div>
            </div>
          )}
        </div>
      ))}

      <div style={{ alignSelf: "flex-end" }}>
        <button
          className="apply-button"

          onClick={() => {
            const start = dateRange[0].startDate!;
            const end = dateRange[0].endDate!;
            setVisibleMakes(new Set(localVisibleMakes));
            if (onDateRangeApply) {
              onDateRangeApply(start, end);
            }
          }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
