import AboutSection from "@/components/layout/about";
import HeroSection from "@/components/layout/hero";
import OrganisasiSection from "@/components/layout/organisasi";
import Navbar from "@/components/layout/navbar";
import { EventSection } from "@/components/layout/event";
import Footer from "@/components/layout/footer";
import KontakSection from "@/components/layout/kontak";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <OrganisasiSection />
      <EventSection />
      <KontakSection />
      <Footer />
    </main>
  );
}
