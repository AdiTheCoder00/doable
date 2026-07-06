import Hero from './Hero';
import HowItWorks from './HowItWorks';

export default function Landing() {
  return (
    <section id="view-landing" className="overflow-y-auto h-screen relative">
      <Hero />
      <HowItWorks />
    </section>
  );
}
