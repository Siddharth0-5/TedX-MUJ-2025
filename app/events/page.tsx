"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Mic,
  Coffee,
  Camera,
  Sparkles,
} from "lucide-react";
import { events } from "@/data/events";

type EventType = "main" | "rehearsal" | "networking" | "community";

const eventIcons: Record<
  EventType,
  React.ComponentType<{ className?: string }>
> = {
  main: Mic,
  rehearsal: Camera,
  networking: Users,
  community: Coffee,
};

export default function EventsPage() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  const featuredEvent = events.find((event) => event.featured);
  const otherEvents = events.filter((event) => !event.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* TEDx Signature Red Radial Gradients */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-40 right-1/3 w-80 h-80 bg-red-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Dynamic Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                  linear-gradient(90deg, transparent 98%, rgba(239, 68, 68, 0.3) 100%),
                  linear-gradient(0deg, transparent 98%, rgba(239, 68, 68, 0.3) 100%)
                `,
              backgroundSize: "100px 100px",
              animation: "grid-flow 25s linear infinite",
            }}
          />
        </div>

        {/* Floating Ideas Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${10 + i * 6}%`,
                top: `${20 + i * 4}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-red-500/40" />
            </div>
          ))}
        </div>

        {/* TEDx Geometric Elements */}
        <div className="absolute top-1/3 right-20 w-24 h-24 border-2 border-red-500/30 transform rotate-45 animate-spin-slow" />
        <div className="absolute bottom-1/4 left-16 w-16 h-16 bg-gradient-to-br from-red-500/20 to-transparent rounded-full animate-pulse" />
      </div>

      {/* Hero Section with Enhanced TEDx Branding */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-24 md:pb-12 flex items-center justify-center min-h-screen"
        data-section
        id="hero-section"
      >
        {/* Hero Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-transparent to-black/40" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        </div>

        <div
          className={`relative z-10 text-center max-w-6xl mx-auto px-6 transition-all duration-1000 ${
            isVisible("hero-section")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {/* Main Heading with Enhanced Typography */}
          <div className="relative mb-12">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-500/20 to-red-500/10 blur-3xl scale-150" />

            <h1 className="relative text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-6">
              <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                OUR
              </span>
              <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent transform -translate-y-4">
                EVENTS
              </span>
            </h1>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border-l-4 border-t-4 border-red-500/50 opacity-60 hidden md:block" />
            <div className="absolute -bottom-8 -right-8 w-16 h-16 border-r-4 border-b-4 border-red-500/50 opacity-60 hidden md:block" />
          </div>

          <div className="relative mb-12">
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed">
              Join us for an extraordinary journey through innovation,
              creativity, and transformative thinking that will challenge
              perspectives and inspire action.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div
              data-section
              id="featured-event"
              className={`transition-all duration-1000 ${
                isVisible("featured-event")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="text-center mb-16 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent blur-xl" />
                <div className="flex items-center justify-center gap-4 mb-6 relative">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-500" />
                  <h2 className="text-4xl md:text-5xl font-bold text-white relative">
                    Featured Event
                    <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-red-500/50 via-red-500 to-red-500/50" />
                  </h2>
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-500" />
                </div>
              </div>

              <div className="max-w-6xl mx-auto">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 group">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Event Image */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={featuredEvent.image || "/placeholder.svg"}
                        // src={"/person.avif"}
                        alt={featuredEvent.title}
                        width={600}
                        height={400}
                        className="w-full h-80 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full">
                          Main Event
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {featuredEvent.title}
                      </h3>
                      <p className="text-xl text-red-500 mb-6 font-medium">
                        {featuredEvent.subtitle}
                      </p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-white">
                          <Calendar className="w-5 h-5 text-red-500" />
                          <span>{featuredEvent.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white">
                          <Clock className="w-5 h-5 text-red-500" />
                          <span>{featuredEvent.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white">
                          <MapPin className="w-5 h-5 text-red-500" />
                          <span>{featuredEvent.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white">
                          <Users className="w-5 h-5 text-red-500" />
                          <span>{featuredEvent.capacity}</span>
                        </div>
                      </div>

                      <p className="text-white leading-relaxed mb-8">
                        {featuredEvent.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {featuredEvent.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-sm text-white">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-red-500/25 group/btn w-fit">
                        <Link
                          href="/register"
                          className="flex items-center gap-2"
                        >
                          Register Now
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other Events */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div
            data-section
            id="other-events"
            className={`transition-all duration-1000 ${
              isVisible("other-events")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="text-center mb-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent blur-xl" />
              <div className="flex items-center justify-center gap-4 mb-6 relative">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-500" />
                <h2 className="text-4xl md:text-5xl font-bold text-white relative">
                  Supporting Events
                  <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-red-500/50 via-red-500 to-red-500/50" />
                </h2>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-500" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-6xl mx-auto">
              {otherEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`group transition-all duration-700 delay-${
                    index * 200
                  } ${
                    isVisible("other-events")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <div
                    className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 overflow-hidden h-full
 flex flex-col w-full max-w-md md:max-w-lg"
                  >
                    {/* Event Image */}
                    <div className="relative overflow-hidden w-full h-96">
                      <Image
                        src={event.image || "/singer.avif"}
                        alt={event.title}
                        width={400}
                        height={250}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Event Details */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-red-500 font-medium mb-4 text-sm">
                        {event.subtitle}
                      </p>

                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-white">
                          <Calendar className="w-4 h-4 text-red-500" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <Clock className="w-4 h-4 text-red-500" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <Users className="w-4 h-4 text-red-500" />
                          <span>{event.capacity}</span>
                        </div>
                      </div>

                      <p className="text-white text-sm leading-relaxed mb-6 flex-1">
                        {event.description}
                      </p>

                      <div className="space-y-2">
                        {event.highlights.slice(0, 2).map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                            <span className="text-xs text-white">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Event Timeline */}
      <section className="py-32 relative overflow-hidden">
        {/* Section Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-red-500/8 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          />

          {/* Floating geometric shapes */}
          <div className="absolute top-20 right-20 w-20 h-20 border-2 border-red-500/20 transform rotate-45 animate-spin-slow" />
          <div
            className="absolute bottom-32 left-16 w-12 h-12 bg-red-500/10 transform rotate-12 animate-bounce"
            style={{ animationDelay: "1s" }}
          />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, transparent 98%, rgba(239, 68, 68, 0.2) 100%),
                  linear-gradient(0deg, transparent 98%, rgba(239, 68, 68, 0.2) 100%)
                `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div
            data-section
            id="timeline"
            className={`transition-all duration-1000 ${
              isVisible("timeline")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            {/* Enhanced Section Header */}
            <div className="text-center mb-24 relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent blur-3xl scale-150" />

              {/* Decorative elements */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-red-500 animate-pulse" />
                  <Sparkles className="w-6 h-6 text-red-500 animate-spin-slow" />
                  <div className="w-8 h-px bg-gradient-to-l from-transparent to-red-500 animate-pulse" />
                </div>
              </div>

              <div className="relative">
                <h2 className="text-6xl md:text-7xl font-black mb-4 relative">
                  <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    EVENT
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                    TIMELINE
                  </span>

                  {/* Animated underline */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full">
                    <div className="w-full h-full bg-white/30 rounded-full animate-pulse" />
                  </div>
                </h2>

                <p className="text-xl text-white/80 mt-8 max-w-2xl mx-auto leading-relaxed">
                  Follow our journey of transformative experiences and
                  <span className="text-red-500 font-semibold">
                    {" "}
                    ideas worth spreading
                  </span>
                </p>
              </div>
            </div>

            {/* Enhanced Timeline Container */}
            <div className="max-w-6xl mx-auto">
              <div className="relative">
                {/* 3D Timeline Spine with Animation */}
                <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-400 via-red-500 to-red-600 rounded-full shadow-lg shadow-red-500/30">
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-red-400 via-red-500 to-red-600 rounded-full animate-pulse blur-sm" />
                </div>

                {/* Enhanced Timeline Items */}
                <div className="space-y-24">
                  {events
                    .slice()
                    .reverse()
                    .map((event, index) => {
                      const isEven = index % 2 === 0;
                      // Determine event type based on event properties or use default
                      const eventType = event.featured
                        ? "main"
                        : event.title.toLowerCase().includes("rehearsal")
                        ? "rehearsal"
                        : event.title.toLowerCase().includes("network")
                        ? "networking"
                        : event.title.toLowerCase().includes("community")
                        ? "community"
                        : "main";
                      const IconComponent = eventIcons[eventType] || Calendar;

                      return (
                        <div
                          key={event.id}
                          className={`relative transition-all duration-1000 delay-${
                            index * 200
                          } ${
                            isVisible("timeline")
                              ? "opacity-100 translate-x-0"
                              : `opacity-0 ${
                                  isEven ? "-translate-x-12" : "translate-x-12"
                                }`
                          }`}
                        >
                          {/* Timeline Node - 3D Floating Circle */}
                          <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 z-20">
                            <div className=" relative group">
                              {/* Outer rotating ring */}
                              <div className="hidden absolute inset-0 w-20 h-20 border-2 border-red-500/40 rounded-full animate-spin-slow" />
                              <div className="absolute inset-1 w-18 h-18 border border-red-400/30 rounded-full animate-ping opacity-75" />

                              {/* Main node */}
                              <div className="relative w-16 h-16 bg-gradient-to-br from-red-400 via-red-500 to-red-600 rounded-full shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 transition-all duration-500 transform hover:scale-110 group-hover:rotate-12">
                                {/* Inner glow */}
                                <div className="absolute inset-2 bg-white/20 rounded-full blur-sm animate-pulse" />

                                {/* Icon */}
                                <div className=" absolute inset-0 flex items-center justify-center">
                                  <IconComponent className="w-7 h-7 text-white drop-shadow-lg" />
                                </div>

                                {/* 3D highlight */}
                                <div className="absolute top-1 left-1 w-3 h-3 bg-white/40 rounded-full blur-sm" />
                              </div>

                              {/* Pulse rings */}
                              <div
                                className="absolute inset-0 w-16 h-16 border-2 border-red-400/20 rounded-full animate-ping"
                                style={{ animationDelay: `${index * 0.5}s` }}
                              />
                            </div>
                          </div>

                          {/* Event Card - Enhanced 3D Design */}
                          <div
                            className={`flex items-center ${
                              isEven ? "justify-start" : "justify-end"
                            }`}
                          >
                            <div
                              className={`w-full md:w-5/12 ${
                                !isEven ? "md:text-right" : ""
                              }`}
                            >
                              <div className="group relative">
                                {/* Card container with 3D effect */}
                                <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20">
                                  {/* 3D depth layers */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl transform translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 to-transparent rounded-3xl transform translate-x-2 translate-y-2 -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                  {/* Event type badge */}
                                  <div
                                    className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-full mb-6 shadow-lg ${
                                      !isEven ? "md:ml-auto" : ""
                                    }`}
                                  >
                                    <Calendar className="w-4 h-4" />
                                    {eventType.charAt(0).toUpperCase() +
                                      eventType.slice(1)}{" "}
                                    Event
                                  </div>

                                  {/* Event details */}
                                  <div className="space-y-4">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-red-500 transition-colors duration-300">
                                      {event.title}
                                    </h3>

                                    <p className="text-red-500 font-semibold text-lg">
                                      {event.subtitle}
                                    </p>

                                    {/* Event meta information */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                                      <div className="flex items-center gap-3 text-white/90">
                                        <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                                          <Calendar className="w-4 h-4 text-red-500" />
                                        </div>
                                        <span className="font-medium">
                                          {event.date}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-3 text-white/90">
                                        <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                                          <Clock className="w-4 h-4 text-red-500" />
                                        </div>
                                        <span className="font-medium">
                                          {event.time}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-3 text-white/90">
                                        <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                                          <MapPin className="w-4 h-4 text-red-500" />
                                        </div>
                                        <span className="font-medium">
                                          {event.location.split(",")[0]}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-3 text-white/90">
                                        <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                                          <Users className="w-4 h-4 text-red-500" />
                                        </div>
                                        <span className="font-medium">
                                          {event.capacity}
                                        </span>
                                      </div>
                                    </div>

                                    <p className="text-white/80 leading-relaxed">
                                      {event.description}
                                    </p>

                                    {/* Event highlights */}
                                    <div className="flex flex-wrap gap-2 pt-4">
                                      {event.highlights
                                        .slice(0, 3)
                                        .map((highlight, idx) => (
                                          <div
                                            key={idx}
                                            className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full"
                                          >
                                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                                            <span className="text-xs text-white font-medium">
                                              {highlight}
                                            </span>
                                          </div>
                                        ))}
                                    </div>

                                    {/* Connection line to timeline */}
                                    <div
                                      className={`absolute top-8 ${
                                        isEven ? "-right-8" : "-left-8"
                                      } w-8 h-px bg-gradient-to-${
                                        isEven ? "r" : "l"
                                      } from-red-500/50 to-transparent`}
                                    />
                                  </div>

                                  {/* Hover glow effect */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/5 to-red-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
