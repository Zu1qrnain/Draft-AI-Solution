import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Section 1: HOME */}
      <section id="home" className="min-h-screen flex items-center">
        <Hero />
      </section>

      {/* Section 2: SERVICES */}
      <section id="services" className="py-24">
        <Services />
      </section>

      {/* Section 3: PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-white/[0.02]">
        <Portfolio />
      </section>

      {/* Section 4: TEAM */}
      <section id="team" className="py-24">
        <Team />
      </section>

      {/* Section 5: TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-white/[0.02]">
        <Testimonials />
      </section>

     

      {/* Section 7: CONTACT */}
      <section id="contact" className="py-24 bg-white/[0.02]">
        <Contact />
      </section>
    </div>
  );
}
