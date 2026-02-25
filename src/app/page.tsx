import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { Features } from "@/components/features";
import { ComingSoon } from "@/components/coming-soon";
import { Footer } from "@/components/footer";
import { CursorGlow } from "@/components/cursor-glow";
import { NoiseOverlay } from "@/components/noise";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <NoiseOverlay />
      <Navbar />
      <main className="relative min-h-screen">
        <Hero />
        <ProductCard />
        <Features />
        <ComingSoon />
        <Footer />
      </main>
    </>
  );
}
