import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { GitHubGrid } from "@/components/GitHubGrid";
import { StravaGrid } from "@/components/StravaGrid";
import { Connect } from "@/components/Connect";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects limit={5} />
      <GitHubGrid />
      <StravaGrid />
      <Connect />
    </>
  );
}
