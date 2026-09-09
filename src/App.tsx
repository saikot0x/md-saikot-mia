import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import CTFLabs from "./components/CTFLabs";
import Writeups from "./components/Writeups";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:left-3 focus:rounded-md focus:bg-[var(--color-cyan)] focus:text-[#04140F] focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CTFLabs />
        <Writeups />
        <Certifications />
        <Education />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
