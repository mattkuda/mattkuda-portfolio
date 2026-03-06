"use client";

import { useEffect, useState, useRef } from "react";

function getColor(level: number): string {
  const colors = [
    "#161b22",
    "#4a2000",
    "#7a3300",
    "#c45100",
    "#fc6d26",
  ];
  return colors[level] || colors[0];
}

// Decode Google encoded polyline into [lat, lng] pairs
function decodePolyline(encoded: string): [number, number][] {
  const points: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let b: number;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;

    points.push([lat / 1e5, lng / 1e5]);
  }
  return points;
}

// Render polyline as styled SVG with grid background and glow
function PolylineMap({ polyline }: { polyline: string }) {
  const points = decodePolyline(polyline);
  if (points.length < 2) return null;

  const lats = points.map((p) => p[0]);
  const lngs = points.map((p) => p[1]);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const padding = 16;
  const width = 220;
  const height = 130;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  const latRange = maxLat - minLat || 0.001;
  const lngRange = maxLng - minLng || 0.001;

  const svgPoints = points
    .map((p) => {
      const x = padding + ((p[1] - minLng) / lngRange) * innerW;
      const y = padding + ((maxLat - p[0]) / latRange) * innerH;
      return `${x},${y}`;
    })
    .join(" ");

  // Grid lines for subtle map-like feel
  const gridLines = [];
  const gridSpacing = 20;
  for (let x = gridSpacing; x < width; x += gridSpacing) {
    gridLines.push(
      <line key={`v${x}`} x1={x} y1={0} x2={x} y2={height} stroke="#1a1a1a" strokeWidth="0.5" />
    );
  }
  for (let y = gridSpacing; y < height; y += gridSpacing) {
    gridLines.push(
      <line key={`h${y}`} x1={0} y1={y} x2={width} y2={y} stroke="#1a1a1a" strokeWidth="0.5" />
    );
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full rounded-sm border border-[#2a2a2a]"
      style={{ aspectRatio: `${width}/${height}`, background: "#111" }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {gridLines}
      {/* Glow layer */}
      <polyline
        points={svgPoints}
        fill="none"
        stroke="#fc6d26"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.25"
        filter="url(#glow)"
      />
      {/* Main route */}
      <polyline
        points={svgPoints}
        fill="none"
        stroke="#fc6d26"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Start dot */}
      <circle
        cx={svgPoints.split(" ")[0]?.split(",")[0]}
        cy={svgPoints.split(" ")[0]?.split(",")[1]}
        r="3"
        fill="#fc6d26"
      />
    </svg>
  );
}

interface RunDetail {
  name: string;
  miles: number;
  duration: string;
  pace: string;
  elevation: number;
  polyline: string | null;
}

interface DayData {
  level: number;
  date: string;
  miles: number;
  runs: RunDetail[];
}

interface StravaData {
  totalRuns: number;
  totalMileage: number;
  weeks: DayData[][];
}

function Tooltip({
  day,
  anchorRef,
}: {
  day: DayData;
  anchorRef: HTMLDivElement | null;
}) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!anchorRef || !tooltipRef.current) return;
    const rect = anchorRef.getBoundingClientRect();
    const tip = tooltipRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = rect.left + rect.width / 2 - tip.width / 2;
    if (left < 8) left = 8;
    if (left + tip.width > vw - 8) left = vw - tip.width - 8;

    // Position above by default, below if not enough room
    let top = rect.top - tip.height - 8;
    if (top < 8) top = rect.bottom + 8;
    if (top + tip.height > vh - 8) top = vh - tip.height - 8;

    setPos({ top, left });
  }, [anchorRef]);

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 rounded-lg border border-[#2a2a2a] bg-[#111] px-4 py-3 shadow-xl"
      style={{
        top: pos ? pos.top : -9999,
        left: pos ? pos.left : -9999,
        width: 240,
        pointerEvents: "none",
      }}
    >
      <p className="text-xs text-[#a1a1aa] font-mono">{day.date}</p>
      {day.runs.length > 0 ? (
        day.runs.map((run, i) => (
          <div
            key={i}
            className={i > 0 ? "mt-2 pt-2 border-t border-[#222]" : "mt-2"}
          >
            {run.polyline && (
              <div className="mb-2">
                <PolylineMap polyline={run.polyline} />
              </div>
            )}
            <p className="text-sm font-medium text-white">{run.name}</p>
            <p className="mt-1 text-xs text-[#a1a1aa]">
              {run.miles} mi &middot; {run.duration}
            </p>
            <p className="text-xs text-[#a1a1aa]">{run.pace}</p>
            {run.elevation > 0 && (
              <p className="text-xs text-[#a1a1aa]">
                {run.elevation} m elevation
              </p>
            )}
          </div>
        ))
      ) : (
        <p className="mt-1 text-xs text-[#555]">Rest day</p>
      )}
    </div>
  );
}

export function StravaGrid() {
  const [data, setData] = useState<StravaData | null>(null);
  const [hovered, setHovered] = useState<{
    day: DayData;
    el: HTMLDivElement;
  } | null>(null);

  useEffect(() => {
    fetch("/api/strava")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data || !data.weeks) {
    return (
      <section className="py-12">
        <div className="section-divider mb-8" />
        <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-[#a1a1aa]">
          Running
        </h2>
        <div className="h-24 animate-pulse rounded bg-[#111]" />
      </section>
    );
  }

  const numWeeks = data.weeks.length;

  return (
    <section className="py-12">
      <div className="section-divider mb-8" />
      <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-[#a1a1aa]">
        Running
      </h2>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-sm text-[#ededed]">
          {data.totalRuns} runs &middot; {data.totalMileage.toLocaleString()} mi
          in the last 52 weeks
        </span>
        <a
          href="https://www.strava.com/athletes/108053433"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#a1a1aa] hover:text-white transition-colors"
        >
          View on Strava
        </a>
      </div>
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: `repeat(${numWeeks}, 1fr)`,
          gap: "2px",
        }}
      >
        {data.weeks.map((week, wi) => (
          <div key={wi} className="grid grid-rows-7 gap-[2px]">
            {week.map((day, di) => (
              <div
                key={`${wi}-${di}`}
                className="aspect-square w-full rounded-[2px] cursor-pointer transition-all hover:ring-1 hover:ring-white/30"
                style={{ backgroundColor: getColor(day.level) }}
                onMouseEnter={(e) =>
                  setHovered({ day, el: e.currentTarget as HTMLDivElement })
                }
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </div>
        ))}
      </div>
      {hovered && <Tooltip day={hovered.day} anchorRef={hovered.el} />}
      <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-[#555]">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="h-[10px] w-[10px] rounded-[2px]"
            style={{ backgroundColor: getColor(level) }}
          />
        ))}
        <span>More</span>
      </div>
    </section>
  );
}
