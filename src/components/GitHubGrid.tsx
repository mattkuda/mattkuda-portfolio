"use client";

import { useEffect, useState, useRef } from "react";

interface ContributionDay {
  count: number;
  date: string;
  level: number;
}

interface GitHubData {
  totalContributions: number;
  weeks: ContributionDay[][];
}

function getColor(level: number): string {
  const colors = [
    "#161b22",
    "#0e4429",
    "#006d32",
    "#26a641",
    "#39d353",
  ];
  return colors[level] || colors[0];
}

function Tooltip({
  day,
  anchorRef,
}: {
  day: ContributionDay;
  anchorRef: HTMLDivElement | null;
}) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!anchorRef || !tooltipRef.current) return;
    const rect = anchorRef.getBoundingClientRect();
    const tip = tooltipRef.current.getBoundingClientRect();
    const vw = window.innerWidth;

    let left = rect.left + rect.width / 2 - tip.width / 2;
    if (left < 8) left = 8;
    if (left + tip.width > vw - 8) left = vw - tip.width - 8;

    setPos({ top: rect.top - tip.height - 8, left });
  }, [anchorRef]);

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 rounded-lg border border-[#2a2a2a] bg-[#111] px-4 py-3 shadow-xl"
      style={{
        top: pos ? pos.top : -9999,
        left: pos ? pos.left : -9999,
        minWidth: 160,
        pointerEvents: "none",
      }}
    >
      <p className="text-xs text-[#a1a1aa] font-mono">{day.date}</p>
      <p className="mt-1 text-sm font-medium text-white">
        {day.count} contribution{day.count !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

async function fetchGitHubContributions(): Promise<GitHubData | null> {
  try {
    const response = await fetch(
      "https://github-contributions-api.jogruber.de/v4/mattkuda?y=last"
    );
    const data = await response.json();

    const total = data.total?.lastYear || data.total?.["last"] || 0;
    const weeks: ContributionDay[][] = [];

    if (data.contributions) {
      const allDays: ContributionDay[] = data.contributions.map(
        (d: { date: string; count: number; level: number }) => ({
          date: d.date,
          count: d.count,
          level: d.level,
        })
      );

      for (let i = 0; i < allDays.length; i += 7) {
        weeks.push(allDays.slice(i, i + 7));
      }
    }

    return { totalContributions: total, weeks };
  } catch {
    return null;
  }
}

export function GitHubGrid() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [hovered, setHovered] = useState<{
    day: ContributionDay;
    el: HTMLDivElement;
  } | null>(null);

  useEffect(() => {
    fetchGitHubContributions().then(setData);
  }, []);

  if (!data) {
    return (
      <section className="py-12">
        <div className="section-divider mb-8" />
        <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-[#a1a1aa]">
          Activity
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
        Activity
      </h2>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-sm text-[#ededed]">
          {data.totalContributions.toLocaleString()} contributions this year
        </span>
        <a
          href="https://github.com/mattkuda"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#a1a1aa] hover:text-white transition-colors"
        >
          @mattkuda
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
