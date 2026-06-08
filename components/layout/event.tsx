"use client";

import { useRef } from "react";
import Card from "@/components/ui/card";
import Button from "../ui/button";

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
];

export function EventSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <section id="event" className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div>
          <h1 className="text-3xl font-bold text-center mb-8">
            <span className="text-accent">Event </span>
            <span className="text-secondary">Kami</span>
          </h1>
        </div>

        <div className="relative">
          <div
            className="flex gap-4 overflow-x-auto px-2 pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600/40 snap-x snap-mandatory"
            ref={sliderRef}
          >
            {eventList.map((event) => (
              <div key={event.title} className="min-w-[20rem] snap-start">
                <Card
                  title={event.title}
                  description={event.description}
                  imageSrc={event.imageSrc}
                  className="h-full"
                />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden items-center md:flex">
            <div className="pointer-events-auto rounded-full bg-accent/90 p-2 shadow-lg shadow-black/20 text-secondary transition hover:bg-secondary">
              <button
                type="button"
                className="text-xl font-bold"
                onClick={() => scrollSlider("left")}
                aria-label="Scroll left"
              >
                ‹
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center md:flex">
            <div className="pointer-events-auto rounded-full bg-accent/90 p-2 shadow-lg shadow-black/20 text-secondary transition hover:bg-secondary">
              <button
                type="button"
                className="text-xl font-bold"
                onClick={() => scrollSlider("right")}
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>
          </div>

          <div className="absolute inset-y-0 left-0 flex items-center md:hidden px-2">
            <button
              type="button"
              className="rounded-full bg-secondary/90 p-2 shadow-lg shadow-black/20 text-secondary transition hover:bg-secondary"
              onClick={() => scrollSlider("left")}
              aria-label="Scroll left"
            >
              ‹
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center md:hidden px-2">
            <button
              type="button"
              className="rounded-full bg-secondary/90 p-2 shadow-lg shadow-black/20 text-secondary transition hover:bg-secondary"
              onClick={() => scrollSlider("right")}
              aria-label="Scroll right"
            >
              ›
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="primary" href="/event">
            Selengkapnya...
          </Button>
        </div>
      </div>
    </section>
  );
}
