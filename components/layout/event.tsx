import Card from "@/components/ui/card";
import Button from "../ui/button";
import image from "next/image";

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
  return (
    <section id="event" className="py-16 bg-primary">
      <div className="flex flex-col px-4 ">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            <span className="text-accent">Event </span>
            <span className="text-secondary">Kami</span>
          </h1>
        </div>

        <div className="-mx-4 flex gap-6 overflow-x-auto px-4 pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600/40">
          {eventList.map((event) => (
            <div key={event.title} className="min-w-[12.5px] snap-start">
              <Card
                title={event.title}
                description={event.description}
                imageSrc={event.imageSrc}
                className="h-full"
              >
              </Card>
            </div>
          ))}
        </div>
        <div className="flex justify-center ">
         <Button
            variant="primary"
            target="_blank"
            rel="noreferrer noopener"
            href="https://fonts.google.com/specimen/EB+Garamond"
          >
            Selengkapnya...
          </Button>
        </div>
      </div>
    </section>
  );
}
