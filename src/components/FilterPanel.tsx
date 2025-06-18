import React, { useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { addDays } from "date-fns";
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
  onDateRangeApply,
}) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date("2025-05-01"),
      endDate: new Date("2025-05-30"),
      key: "selection" as const,
    },
  ]);

  return (
    <div className="filter-bar" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
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

          {/* DATE RANGE PICKER */}
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
                  setDateRange([
                    {
                      startDate: item.selection.startDate ?? new Date(),
                      endDate: item.selection.endDate ?? new Date(),
                      key: "selection",
                    },
                  ])
                }
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                locale={enUS}
              />
              <div style={{ marginTop: 8, textAlign: "right" }}>
                <button
                  style={{ marginRight: 8 }}
                  onClick={() =>
                    setDateRange([{
                      startDate: new Date("2025-05-01"),
                      endDate: new Date("2025-05-30"),
                      key: "selection"
                    }])
                  }
                >
                  Cancel
                </button>
                <button
                  style={{
                    backgroundColor: "#2196f3",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: 4,
                    border: "none"
                  }}
                  onClick={() => {
                    const start = dateRange[0].startDate!;
                    const end = dateRange[0].endDate!;
                    if (onDateRangeApply) {
                      onDateRangeApply(start, end);
                    }
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          )}

          {/* MAKE CHECKBOX DROPDOWN */}
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
                <button onClick={toggleAllMakes} style={{
                  background: "none",
                  border: "none",
                  color: "#2196f3",
                  cursor: "pointer",
                  fontSize: 13
                }}>
                  {visibleMakes.size === allMakes.length ? "✖ Deselect All" : "✔ Select All"}
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
                      checked={visibleMakes.has(make)}
                      onChange={() => toggleMake(make)}
                    />
                    {make}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* 其他字段暂不实现 */}
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
    </div>
  );
};

export default FilterPanel;
