export interface Project {
  title: string;
  description: string;
  image: string;
  year: number;
  technologies: string[];
  demoUrl?: string;
  codeUrl?: string;
  videoUrl?: string;
}

export const projects: Project[] = [
  {
    title: "EVEX",
    description:
      "AI personal trainer mobile app for generating personalized workout plans and tracking progress.",
    image: "/portfolio/evex.png",
    year: 2026,
    technologies: ["Swift", "Node.js", "Supabase", "OpenAI"],
    demoUrl: "https://evex.app",
    videoUrl: "https://www.youtube.com/shorts/D-Khjeua1q8",
  },
  {
    title: "FlowThread",
    description:
      "AI-powered SaaS platform that streamlines communication workflows with thread replies, doc generation, and ticket creation.",
    image: "/portfolio/flowthread.png",
    year: 2025,
    technologies: ["Next.js", "OpenAI", "Supabase", "Stripe", "Clerk"],
    demoUrl: "https://flowthread.xyz",
    videoUrl: "https://www.youtube.com/watch?v=pIovglIrWME",
  },
  {
    title: "TabaFit",
    description:
      "iOS app for Tabata workouts with customizable timers, exercise libraries, and workout tracking.",
    image: "/portfolio/tabafit.png",
    year: 2024,
    technologies: ["React Native", "Node.js", "Expo", "MongoDB"],
    demoUrl: "https://tabafit.com",
    codeUrl: "https://github.com/mattkuda/tabafit",
  },
  {
    title: "Bad Call AI",
    description:
      "Web app using GPT-4o Vision to analyze sports highlights and identify bad referee calls with fan voting.",
    image: "/portfolio/bad-call-ai.png",
    year: 2025,
    technologies: ["GPT-4o Vision", "Next.js"],
    videoUrl: "https://youtu.be/eQvBilQL-XM",
  },
  {
    title: "RecruitBase",
    description:
      "Recruiter platform with trello-like boards, candidate profiles, resume analysis, and interview scheduling.",
    image: "/portfolio/recruitbase.png",
    year: 2025,
    technologies: ["Next.js", "Supabase", "Stripe", "Clerk"],
    demoUrl: "https://recruitbase.vercel.app",
  },
  {
    title: "Satellite Visualizer",
    description:
      "3D visualization tool for tracking and displaying satellite positions in real-time based on geolocation.",
    image: "/portfolio/satellite-visualizer.png",
    year: 2023,
    technologies: ["React", "Three.js", "TypeScript"],
    codeUrl: "https://github.com/mattkuda/satellite-visualizer",
  },
  {
    title: "Austin Civic Impact Platform",
    description:
      "LLM-backed engagement platform connecting Austin citizens with local government services and events.",
    image: "/portfolio/acip.png",
    year: 2024,
    technologies: ["Next.js", "Llama LLM", "Google Maps", "Tailwind"],
    codeUrl: "https://github.com/mattkuda/austin-civic-impact-platform",
  },
  {
    title: "Betcha Sports",
    description:
      "Social sports betting platform for friendly wagers with real-time odds and live game tracking.",
    image: "/portfolio/betcha.png",
    year: 2020,
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    codeUrl: "https://github.com/mattkuda/betcha",
  },
];

export const socialLinks = {
  twitter: "https://twitter.com/mattkuda",
  github: "https://github.com/mattkuda",
  linkedin: "https://linkedin.com/in/mattkuda",
  youtube: "https://youtube.com/@matt_kuda",
  tiktok: "https://tiktok.com/@mattkuda",
  instagram: "https://instagram.com/mattkuda",
  strava: "https://www.strava.com/athletes/108053433",
  email: "mattkuda@gmail.com",
  substack: "https://mattkuda.substack.com",
};
