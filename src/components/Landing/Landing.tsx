import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Footer from './Footer';

export default function Landing() {
  return (
    <section id="view-landing" className="overflow-y-auto h-screen relative">
      <Hero />
      <HowItWorks />
      <Footer />
    </section>
  );
}
