
import React from "react";

export type SummaryItem = {
  label: string;
  value: string | number;
  tooltip?: string;
  onClick?: () => void;
};

export type SummaryCardsTheme = {
  cardBg?: string;
  labelColor?: string;
  valueColor?: string;
  border?: string;
  radius?: number;
  shadow?: string;
  hoverBg?: string;
};

type Props = {
  items: SummaryItem[];
  isLoading?: boolean;
  className?: string;       
  itemClassName?: string;   
  columns?: number;        
  gap?: number;          
  theme?: SummaryCardsTheme;
};

const defaults: Required<SummaryCardsTheme> = {
  cardBg: "#f8f9fa",
  labelColor: "#007472",
  valueColor: "#212121",
  border: "1px solid #dee2e6",
  radius: 12,
  shadow: "inset 0 0 0 1px #dee2e6",
  hoverBg: "#e9ecef",
};

export default function SummaryCardsWidget({
  items,
  isLoading = false,
  className = "summary-cards",
  itemClassName = "summary-card",
  columns = 3,
  gap = 16,
  theme,
}: Props) {
  const t = { ...defaults, ...theme };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, minmax(180px, 1fr))`,
    gap,
    margin: "24px 0",
  };

  const cardStyle: React.CSSProperties = {
    background: t.cardBg,
    borderRadius: t.radius,
    boxShadow: t.shadow,
    border: t.border,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    transition: "background 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 20,
    color: t.labelColor,
    fontWeight: 600,
    marginBottom: 4,
    lineHeight: 1.4,
    fontFamily: "'Open Sans', serif",
  };

  const valueStyle: React.CSSProperties = {
    fontSize: 28,
    fontWeight: 700,
    color: t.valueColor,
    lineHeight: 1.2,
  };

  const skeletonCount = Math.max(items.length || 0, columns || 0, 3);

  if (isLoading) {
    return (
      <div className={className} style={gridStyle}>
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <div key={idx} className={itemClassName} style={cardStyle} aria-busy>
            <div
              style={{
                width: "70%",
                height: 20,
                background: "#e5e7eb",
                borderRadius: 6,
                marginBottom: 8,
              }}
            />
            <div
              style={{
                width: 90,
                height: 28,
                background: "#e5e7eb",
                borderRadius: 6,
              }}
            />
          </div>
        ))}
      </div>
    );
  }


  return (
    <div className={className} style={gridStyle}>
      {items.map((item) => (
        <div
          key={item.label}
          className={itemClassName}
          style={cardStyle}
          title={item.tooltip}
          onClick={item.onClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = t.hoverBg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = t.cardBg;
          }}
        >
          <div className="summary-label" style={labelStyle}>
            {item.label}
          </div>
          <div className="summary-value" style={valueStyle}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
