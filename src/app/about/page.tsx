"use client";
import React from "react";
import Image from "next/image";
import { FaPizzaSlice, FaAward, FaUsers, FaGlobe } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-20">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-12">
        <Image
          src="/about-1.png"
          alt="Pizza Hut History"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Our Story</h1>
        </div>
      </div>

      {/* History Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#ee3a43] mb-8 text-center">
          How It All Began
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2">
            <Image
              src="/about-2.png"
              alt="Original Pizza Hut"
              width={600}
              height={200}
              className="rounded-lg shadow-lg w-full mb-6 lg:mb-0"
            />
          </div>
          <div className="lg:w-1/2">
            <p className="text-lg mb-4">
              The Pizza Hut story began in May 1958. Dan and Frank Carney opened their pizza restaurant in Wichita, Kansas. The original location was just 550 square feet (about 50 square meters).
            </p>
            <p className="text-lg mb-4">
              Dan and Frank, along with their friends Richard Beemer and John Bender, made the pizzas themselves. Dan Carney recalled: "Everyone was fascinated by our product, watching with enjoyment as we tossed the dough over our heads..."
            </p>
            <p className="text-lg">
              Pizza Hut has always been a pioneering and innovative place where everyone shared their knowledge and experiences. As Frank Carney remembered: "The strength of Pizza Hut was in having so many innovative people."
            </p>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-[#ee3a43] mb-8 text-center">
          Our Milestones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl text-[#ee3a43] mb-4">
                {milestone.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{milestone.year}</h3>
              <p>{milestone.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#f8f8f8] rounded-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-[#ee3a43] mb-8 text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl text-[#ee3a43] mb-4 mx-auto">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const milestones = [
  {
    year: "1958",
    description: "First Pizza Hut opened in Wichita, Kansas",
    icon: <FaPizzaSlice />,
  },
  {
    year: "1977",
    description: "Became the world's largest pizza chain",
    icon: <FaAward />,
  },
  {
    year: "1996",
    description: "Launched online pizza ordering",
    icon: <FaGlobe />,
  },
  {
    year: "Today",
    description: "Over 18,000 restaurants worldwide",
    icon: <FaUsers />,
  },
];

const values = [
  {
    title: "Innovation",
    description: "We constantly push boundaries to create better pizza experiences for our customers.",
    icon: <FaPizzaSlice />,
  },
  {
    title: "Community",
    description: "We believe in bringing people together over great food and shared experiences.",
    icon: <FaUsers />,
  },
  {
    title: "Quality",
    description: "We use only the finest ingredients and maintain strict quality standards.",
    icon: <FaAward />,
  },
];