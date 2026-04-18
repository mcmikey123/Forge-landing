import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import SheetsTax from "@/components/SheetsTax";
import BeforeAfter from "@/components/BeforeAfter";
import Differentiator from "@/components/Differentiator";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Enquiry from "@/components/Enquiry";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <Problem />
      <SheetsTax />
      <BeforeAfter />
      <Differentiator />
      <Pricing />
      <FAQ />
      <Enquiry />
      <Footer />
    </>
  );
}
