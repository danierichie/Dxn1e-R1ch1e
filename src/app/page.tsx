"use client";

import { useAuth } from "./contexts/AuthContext";
import Hero from "./components/Hero";
import CommunitySection from "./components/CommunitySection";
import Contact from "./components/Contact";

export default function Home() {
  const { user } = useAuth();

  return (
    <main>
      <Hero />
      <CommunitySection />
      {!user && <Contact />}
    </main>
  );
}
