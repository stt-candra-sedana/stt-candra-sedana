"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import Card from "@/components/ui/card";
import SponsorCard from "@/components/ui/sponsor";
import Footer from "@/components/layout/footer";

const eventList = [
  {
    title: "Pentas Seni Budaya",
    description:
      "Pertunjukan tari dan musik tradisional yang memperkenalkan adat istiadat lokal.",
    imageSrc: "/image/Ogoh_Ogoh.jpg",
    href: "#event",
  },
  {
    title: "Workshop Kreatif",
    description:
      "Belajar membuat kerajinan tradisional dengan teknik modern dan bahan lokal.",
    imageSrc: "/image/Raja_Hidimba.jpg",
    href: "#event",
  },
  {
    title: "Pentas Musik",
    description:
      "Pertunjukan musik live yang menampilkan komposer komunitas dan kolaborasi seni.",
    imageSrc: "/image/Image_BG.jpg",
    href: "#event",
  },
  {
    title: "Pentas Gambelan",
    description:
      "Pertunjukan musik live yang menampilkan komposer komunitas dan kolaborasi seni.",
    imageSrc: "/image/Image_BG.jpg",
    href: "#event",
  },
];

const sponsorList = [
  {
    name: "Sponsor 1",
    logoSrc: "/logo/logo1.jpg",
    href: "https://sponsor1.com",
  },
  {
    name: "Sponsor 2",
    logoSrc: "/logo/logo2.jpg",
    href: "https://sponsor2.com",
  },
  {
    name: "Sponsor 3",
    logoSrc: "/logo/logo3.jpg",
    href: "https://sponsor3.com",
  },
];

export default function AboutSection() {
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleEvents = eventList.slice(0, visibleCount);
  const hasMore = visibleCount < eventList.length;

  const handleLoadMore = () => {
    setVisibleCount((current) => Math.min(current + 3, eventList.length));
  };

  return (
    <main>
      <Navbar />
      <section className="relative bg-[url('/image/Image_BG.jpg')] w-full min-h-screen bg-cover bg-center py-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/80 to-transparent" />
        <div className="flex flex-col items-center justify-center relative z-10 text-white">
          <div className="container mx-auto px-4 text-center z-10">
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-accent">CANDRA </span>
              <span className="text-secondary">SEDANA</span>
            </h1>
          </div>

          <div className="max-w-3xl mx-auto px-4 text-center z-10 mb-8">
            <p>
              "Wadah Kreativitas dan Bakat Generasi Muda Banjar dalam Menjaga
              Tradisi serta Mempererat Persaudaraan." Sebagai generasi penerus,
              STT Candra Sedana berkomitmen untuk menjadi motor penggerak
              kegiatan sosial, budaya, dan inovasi di lingkungan masyarakat,
              berlandaskan nilai Tat Twam Asi dan semangat gotong royong
            </p>
          </div>

          <div>
            <Button
              variant="primary"
              target="_blank"
              rel="noreferrer noopener"
              href="https://fonts.google.com/specimen/EB+Garamond"
            >
              Event
            </Button>
            <Button variant="border" className="ml-4" href="/contact">
              Daftar
            </Button>
          </div>
        </div>
      </section>
      <section id="event" className="py-16 bg-primary">
        <div className="flex flex-col px-4 ">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-8">
              <span className="text-accent">Event </span>
              <span className="text-secondary">Kami</span>
            </h1>
          </div>

          <div className="max-w-7xl mx-auto grid gap-6 px-4 pb-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {visibleEvents.map((event) => (
              <Card
                key={event.title}
                title={event.title}
                description={event.description}
                imageSrc={event.imageSrc}
                className="h-full"
              ></Card>
            ))}
          </div>

          {hasMore ? (
            <div className="flex justify-center mt-8">
              <Button variant="primary" onClick={handleLoadMore}>
                Lainnya
              </Button>
            </div>
          ) : null}
        </div>
      </section>
      <section id="sponsor" className="py-16 bg-primary overflow-hidden">
        <style>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .sponsor-carousel {
            animation: scroll-left 30s linear infinite;
          }
        `}</style>

        <div className="flex flex-col px-4">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-8">
              <span className="text-accent">Sponsor </span>
              <span className="text-secondary">Kami</span>
            </h1>
          </div>

          <div className="w-full overflow-hidden">
            <div className="sponsor-carousel flex gap-6 px-4">
              {[...sponsorList, ...sponsorList].map((sponsor, index) => (
                <div
                  key={`${sponsor.name}-${index}`}
                  className="shrink-0 w-56"
                >
                  <SponsorCard
                    name={sponsor.name}
                    logoSrc={sponsor.logoSrc}
                    href={sponsor.href}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
