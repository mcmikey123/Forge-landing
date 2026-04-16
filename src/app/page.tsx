import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Opposite from "@/components/Opposite";
import Builder from "@/components/Builder";
import Marquee from "@/components/Marquee";
import Week from "@/components/Week";
import Facts from "@/components/Facts";
import Pricing from "@/components/Pricing";
import Final from "@/components/Final";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Manifesto />
      <Opposite />
      <Builder />
      <Marquee />
      <Week />
      <Facts />
      <Pricing />
      <Final />
      <Footer />
    </main>
  );
}
