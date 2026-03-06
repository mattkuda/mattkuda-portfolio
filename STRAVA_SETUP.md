# Strava API Integration Setup

The Strava API is **free** for personal use. You get:
- 100 requests per 15 minutes
- 1,000 requests per day

More than enough for a portfolio site.

## Step 1: Create a Strava API Application

1. Go to [https://www.strava.com/settings/api](https://www.strava.com/settings/api)
2. Fill in the form:
   - **Application Name:** Matt Kuda Portfolio
   - **Category:** Other
   - **Website:** `https://mattkuda.com`
   - **Authorization Callback Domain:** `mattkuda.com`
3. After creating, you'll get a **Client ID** and **Client Secret**.

## Step 2: One-Time OAuth to Get Your Refresh Token

You only need to do this once. The refresh token doesn't expire.

1. Open this URL in your browser (replace `YOUR_CLIENT_ID`):

```
https://www.strava.com/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=https://mattkuda.com&scope=read,activity:read&approval_prompt=force
```

2. Authorize the app. You'll be redirected to:
```
https://mattkuda.com?code=AUTHORIZATION_CODE&scope=read,activity:read
```

3. Grab the `code` from the URL bar and exchange it for tokens:

```bash
curl -X POST https://www.strava.com/oauth/token \
  -d client_id=YOUR_CLIENT_ID \
  -d client_secret=YOUR_CLIENT_SECRET \
  -d code=AUTHORIZATION_CODE \
  -d grant_type=authorization_code
```

4. Save the `refresh_token` from the response. That's the only value you need long-term.

## Step 3: Add Environment Variables on Vercel

In your Vercel project settings, add these env vars:

```
STRAVA_CLIENT_ID=your_client_id
STRAVA_CLIENT_SECRET=your_client_secret
STRAVA_REFRESH_TOKEN=your_refresh_token

```

(Also add to `.env.local` if you want to test locally.)

## Step 4: Create the API Route

Create `src/app/api/strava/route.ts`:

```typescript
import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    // Fetch activities from the last year
    const after = Math.floor(Date.now() / 1000) - 365 * 24 * 60 * 60;
    const activities = [];
    let page = 1;

    while (true) {
      const res = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=200&page=${page}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await res.json();
      if (!data.length) break;
      activities.push(...data);
      page++;
    }

    // Filter to runs only
    const runs = activities.filter(
      (a: { type: string }) => a.type === "Run"
    );

    // Build weekly grid data
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 52 * 7);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const weeks: { level: number; date: string; miles: number }[][] = [];

    for (let w = 0; w < 52; w++) {
      const week: { level: number; date: string; miles: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + w * 7 + d);
        const dateStr = date.toISOString().split("T")[0];

        const dayRuns = runs.filter(
          (r: { start_date: string }) =>
            r.start_date.split("T")[0] === dateStr
        );

        const totalMiles = dayRuns.reduce(
          (sum: number, r: { distance: number }) =>
            sum + r.distance / 1609.34,
          0
        );

        let level = 0;
        if (totalMiles > 0 && totalMiles < 3) level = 1;
        else if (totalMiles >= 3 && totalMiles < 5) level = 2;
        else if (totalMiles >= 5 && totalMiles < 8) level = 3;
        else if (totalMiles >= 8) level = 4;

        week.push({
          level,
          date: dateStr,
          miles: Math.round(totalMiles * 10) / 10,
        });
      }
      weeks.push(week);
    }

    return NextResponse.json({
      totalRuns: runs.length,
      weeks,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Strava data" },
      { status: 500 }
    );
  }
}
```

## Step 5: Update StravaGrid Component

Replace the mock data generation in `src/components/StravaGrid.tsx` with a fetch call:

```typescript
"use client";

import { useEffect, useState } from "react";

// ... keep getColor() as-is ...

interface StravaData {
  totalRuns: number;
  weeks: { level: number; date: string; miles: number }[][];
}

export function StravaGrid() {
  const [data, setData] = useState<StravaData | null>(null);

  useEffect(() => {
    fetch("/api/strava")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) {
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

  // ... rest of render stays the same, using data.totalRuns and data.weeks ...
}
```

## That's It

Once deployed with the env vars, the grid will show your real Strava data. The API route auto-refreshes the access token using your refresh token on every request - no manual token management needed.
