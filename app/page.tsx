import { MotionProvider } from "@/components/MotionProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        {/* <Projects /> */}
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
