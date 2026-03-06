import { NextResponse } from "next/server";

interface StravaActivity {
  type: string;
  start_date: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  name: string;
  map?: {
    summary_polyline: string;
  };
}

async function getAccessToken() {
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  return data.access_token;
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatPace(
  distanceMeters: number,
  movingTimeSeconds: number
): string {
  const miles = distanceMeters / 1609.34;
  if (miles === 0) return "0:00 /mi";
  const paceSeconds = movingTimeSeconds / miles;
  const min = Math.floor(paceSeconds / 60);
  const sec = Math.floor(paceSeconds % 60);
  return `${min}:${sec.toString().padStart(2, "0")} /mi`;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const after = Math.floor(Date.now() / 1000) - 365 * 24 * 60 * 60;
    const activities: StravaActivity[] = [];
    let page = 1;

    while (true) {
      const res = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=200&page=${page}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await res.json();
      if (!Array.isArray(data) || !data.length) break;
      activities.push(...data);
      page++;
    }

    const runs = activities.filter((a) => a.type === "Run");

    // Calculate total mileage
    const totalMileage = Math.round(
      runs.reduce((sum, r) => sum + r.distance / 1609.34, 0)
    );

    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 52 * 7);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    // Calculate weeks needed to include today (may be 53 when mid-week)
    const msPerDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.ceil((now.getTime() - startDate.getTime()) / msPerDay) + 1;
    const numWeeks = Math.ceil(totalDays / 7);

    const weeks: {
      level: number;
      date: string;
      miles: number;
      runs: {
        name: string;
        miles: number;
        duration: string;
        pace: string;
        elevation: number;
        polyline: string | null;
      }[];
    }[][] = [];

    const todayStr = now.toISOString().split("T")[0];

    for (let w = 0; w < numWeeks; w++) {
      const week: (typeof weeks)[0] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + w * 7 + d);
        const dateStr = date.toISOString().split("T")[0];

        // Skip future dates
        if (dateStr > todayStr) continue;

        const dayRuns = runs.filter(
          (r) => r.start_date.split("T")[0] === dateStr
        );

        const totalMiles = dayRuns.reduce(
          (sum, r) => sum + r.distance / 1609.34,
          0
        );

        let level = 0;
        if (totalMiles > 0 && totalMiles < 3) level = 1;
        else if (totalMiles >= 3 && totalMiles < 5) level = 2;
        else if (totalMiles >= 5 && totalMiles < 8) level = 3;
        else if (totalMiles >= 8) level = 4;

        const runDetails = dayRuns.map((r) => ({
          name: r.name,
          miles: Math.round((r.distance / 1609.34) * 10) / 10,
          duration: formatDuration(r.moving_time),
          pace: formatPace(r.distance, r.moving_time),
          elevation: Math.round(r.total_elevation_gain),
          polyline: r.map?.summary_polyline || null,
        }));

        week.push({
          level,
          date: dateStr,
          miles: Math.round(totalMiles * 10) / 10,
          runs: runDetails,
        });
      }
      weeks.push(week);
    }

    return NextResponse.json({
      totalRuns: runs.length,
      totalMileage,
      weeks,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Strava data" },
      { status: 500 }
    );
  }
}
