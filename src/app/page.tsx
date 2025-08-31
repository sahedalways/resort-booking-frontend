import Hero from './components/home/Hero';
import Features from './components/home/Features';
import Tours from './components/home/Tours';
import Resorts from './components/home/Resorts';
import Booking from './components/home/Booking';
import Testimonials from './components/home/Testimonials';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Tours />
      <Resorts />
      <Booking />
      <Testimonials />
    </main>
  );
}