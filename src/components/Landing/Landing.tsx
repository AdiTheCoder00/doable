import Hero from './Hero';
import HowItWorks from './HowItWorks';
import CTABand from './CTABand';

export default function Landing() {
  return (
    <section id="view-landing">
      <Hero />
      <HowItWorks />
      <CTABand />
      <footer>Doable \u2014 an ideation prototype. No accounts, no servers, nothing leaves your browser.</footer>
    </section>
  );
}
