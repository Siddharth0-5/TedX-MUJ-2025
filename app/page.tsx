"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  Lightbulb,
  Play,
  Sparkles,
  Eye,
} from "lucide-react";
import Link from "next/link";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 5000,
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    updateCount();
  }, [target, duration, isVisible]);

  return (
    <div ref={counterRef}>
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

const FloatingOrb = ({
  delay,
  size = "w-2 h-2",
}: {
  delay: number;
  size?: string;
}) => {
  // Use deterministic values based on delay to avoid hydration mismatch
  const leftPosition = 20 + ((delay * 37) % 60);
  const topPosition = 20 + ((delay * 23) % 60);
  const duration = 3 + ((delay * 2) % 3);
  
  return (
    <div
      className={`absolute ${size} rounded-full bg-gradient-to-r from-red-400/30 to-red-600/30 blur-[1px] animate-pulse`}
      style={{
        left: `${leftPosition}%`,
        top: `${topPosition}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
};

const GlassCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10 ${className}`}
  >
    {children}
  </div>
);

const ModernButton = ({
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}) => {
  const baseClasses =
    "px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-500 group relative overflow-hidden";

  if (variant === "primary") {
    return (
      <button
        className={`${baseClasses} bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/25 hover:scale-[1.02] ${className}`}
        onClick={onClick}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </button>
    );
  }

  return (
    <button
      className={`${baseClasses} border border-white/20 text-white hover:bg-white/[0.08] hover:border-white/30 backdrop-blur-sm ${className}`}
      onClick={onClick}
    >
      <span className="flex items-center gap-2">{children}</span>
    </button>
  );
};

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());

  const heroRef = useRef<HTMLElement>(null);
  const themeRef = useRef<HTMLElement>(null);
  const tedRef = useRef<HTMLElement>(null);
  const tedxRef = useRef<HTMLElement>(null);
  const manipalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    const sections = [heroRef, themeRef, tedRef, tedxRef, manipalRef];
    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className=" bg-gradient-to-br from-slate-950 via-gray-950 to-black text-white overflow-x-hidden relative">
      {/* Animated background gradient */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-red-950/5 via-transparent to-red-900/5 animate-pulse"
        style={{ animationDuration: "8s" }}
      />

      {/* Subtle grid pattern */}
      <div
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* hero section */}
      <section
        ref={heroRef}
        id="hero"
        className="relative  flex items-center justify-center overflow-hidden"
      >
        {/* Subtle animated background layers */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-gradient-to-br from-red-950/8 via-transparent to-red-900/4"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              transition: "transform 0.1s ease-out",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-tl from-transparent via-red-950/3 to-transparent"
            style={{
              transform: `translateY(${scrollY * -0.05}px)`,
              transition: "transform 0.1s ease-out",
            }}
          />
        </div>

        {/* Main content container */}
        <div
          className={`relative z-10 text-center max-w-7xl mx-auto px-6 transition-all duration-1000 ease-out ${
            isVisible("hero")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Hero Logo Section */}
          <div className="relative ">
            {/* Subtle glow effect behind logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/50 to-transparent blur-2xl scale-110 " />

            <div className="relative">
              <Image
                src="/herotedxlogo.png"
                alt="TEDx Logo"
                width={1000}
                height={1000}
                className="h-auto max-h-[300px] md:max-h-[400px] lg:max-h-[1000px] w-auto mx-auto object-contain filter drop-shadow-2xl"
                style={{
                  transform: `translateY(${scrollY * -0.02}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              />
            </div>
          </div>

          {/* Event Details Cards */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12 transition-all duration-1200 delay-200 ${
              isVisible("hero")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <GlassCard className="px-6 py-3 hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white font-medium text-sm md:text-base">
                  8 November 2025
                </span>
              </div>
            </GlassCard>

            <GlassCard className="px-6 py-3 hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white font-medium text-sm md:text-base">
                  Manipal University Jaipur
                </span>
              </div>
            </GlassCard>
          </div>

          {/* Tagline Section */}
          <div
            className={`space-y-6 mb-12 max-w-5xl mx-auto transition-all duration-1400 delay-400 ${
              isVisible("hero")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
              Join us for an extraordinary day of inspiring talks, innovative
              ideas, and transformative conversations that will shape the
              future.
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center transition-all duration-1600 delay-600 ${
              isVisible("hero")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Link href="/register" passHref legacyBehavior>
              <ModernButton className="hover:shadow-2xl hover:shadow-red-500/20">
                Get Your Tickets
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </ModernButton>
            </Link>

            <Link
              href="https://www.instagram.com/tedxmanipaluniversityjaipur"
              passHref
              legacyBehavior
            >
              <ModernButton
                variant="secondary"
                className="hover:shadow-xl hover:shadow-white/10"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Watch Trailer
              </ModernButton>
            </Link>
          </div>
        </div>

        {/* Enhanced floating elements with better positioning */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Strategic positioning for floating orbs */}
          <FloatingOrb delay={0} size="w-2 h-2" />
          <FloatingOrb delay={1} size="w-1.5 h-1.5" />
          <FloatingOrb delay={2} size="w-3 h-3" />
          <FloatingOrb delay={3} size="w-2 h-2" />
          <FloatingOrb delay={4} size="w-1.5 h-1.5" />
          <FloatingOrb delay={5} size="w-2.5 h-2.5" />
          <FloatingOrb delay={6} size="w-2 h-2" />
          <FloatingOrb delay={7} size="w-1.5 h-1.5" />
        </div>

        {/* Scroll indicator */}
        {/* <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-2000 delay-1000 ${
            isVisible("hero")
              ? "opacity-60 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div> */}
      </section>

      {/* Theme Section */}
      <section ref={themeRef} id="theme" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div
            className={`max-w-6xl mx-auto text-center transition-all duration-1500 delay-200 ${
              isVisible("theme")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
          >
            <div className="text-center mb-20 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/3 to-transparent blur-2xl transform scale-150" />
              <div className="flex items-center justify-center gap-6 mb-8 relative">
                <div className="w-20 h-px bg-gradient-to-r from-transparent to-red-500/50" />
                <h2 className="text-6xl xl:text-8xl font-bold text-white relative">
                  Parallax
                  <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-red-500/30 via-red-500 to-red-500/30" />
                </h2>
                <div className="w-20 h-px bg-gradient-to-l from-transparent to-red-500/50" />
              </div>
              <div className="flex items-center justify-center gap-2 text-red-500 mb-8">
                <Eye className="w-5 h-5" />
                <span className="text-sm uppercase tracking-wider">
                  Theme 2025
                </span>
                <Eye className="w-5 h-5" />
              </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-8 mb-12">
              <p className="text-2xl md:text-3xl text-white leading-relaxed font-light">
                Where a change in angle reveals infinite possibilities
              </p>
              <p className="text-lg text-white leading-relaxed">
                In a world defined by speed and complexity, Parallax challenges
                us to reframe what we know. It’s about bending perspectives,
                questioning absolutes, and finding clarity in motion
              </p>
            </div>

            <Link href="/register" passHref legacyBehavior>
              <ModernButton>
                Reserve Your Seat
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </ModernButton>
            </Link>
          </div>
        </div>
      </section>

      {/* About TED Section */}
      <section ref={tedRef} id="ted" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
            <div
              className={`relative transition-all duration-1500 ${
                isVisible("ted")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-16"
              }`}
            >
              <div className="relative h-[24rem] lg:h-[44rem] w-full group overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-transparent" />
                {/* Replaced gradient background with Image component */}
                <Image
                  src="/events4.jpg" // Replace with your actual image path
                  alt="TED"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 border border-white/10 rounded-3xl group-hover:border-white/20 transition-all duration-700" />
              </div>
            </div>

            <div
              className={`space-y-10 transition-all duration-1500 delay-300 ${
                isVisible("ted")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-16"
              }`}
            >
              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl font-bold text-white">
                  About TED
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
              </div>

              <div className="space-y-6">
                <p className="text-xl text-white leading-relaxed">
                  TED is a nonprofit that shares ideas to inspire conversation
                  and drive change. Founded in 1984 to bridge Technology,
                  Entertainment, and Design, TED now covers fields like science,
                  business, education and global issues and much more. Through
                  TED Talks, podcasts, TED-Ed videos, and TV programs, TED
                  engages a massive global audience in over 100 languages.
                </p>
                <p className="text-lg text-white leading-relaxed">
                  With initiatives like the Audacious Project (which has raised
                  over $3 billion) and Countdown for climate solutions, TED
                  works toward a more sustainable and equitable future.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <GlassCard className="text-center p-8">
                  <div className="text-4xl font-bold text-red-500 mb-3">
                    <AnimatedCounter target={4000} suffix="+" />
                  </div>
                  <div className="text-sm text-white font-medium uppercase tracking-wider">
                    TED Talks
                  </div>
                </GlassCard>
                <GlassCard className="text-center p-8">
                  <div className="text-4xl font-bold text-red-500 mb-3">
                    <AnimatedCounter target={100} suffix="+" />
                  </div>
                  <div className="text-sm text-white font-medium uppercase tracking-wider">
                    Languages
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About TEDx Section */}
      <section ref={tedxRef} id="tedx" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
            {/* --- Left Image Column --- */}
            <div
              className={`relative lg:order-1 transition-all duration-1000 delay-200 ${
                isVisible("tedx")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-16"
              }`}
            >
              <div className="relative h-[24rem] lg:h-[44rem] w-full group overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-bl from-red-600/20 via-transparent to-transparent" />
                {/* Replaced gradient background with Image component */}
                <Image
                  src="/events2.jpg" // Replace with your actual image path
                  alt="TEDx"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 border border-white/10 rounded-3xl group-hover:border-white/20 transition-all duration-700" />
              </div>
            </div>

            {/* --- Right Text Column --- */}
            <div
              className={`space-y-10 lg:order-2 transition-all duration-1000 delay-300 ${
                isVisible("tedx")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-16"
              }`}
            >
              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl font-bold text-white">
                  About TEDx
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
              </div>

              <div className="space-y-6">
                <p className="text-xl text-white leading-relaxed">
                  Where speakers hold the power to change perceptions. TEDx is a
                  program of independently organized, community-driven events
                  that bring people together to share a TED-like experience,
                  combining live speakers with TED Talks videos to spark
                  conversation and connection. The &ldquo;x&rdquo; in TEDx
                  stands for &ldquo;independently organized TED event&rdquo;.
                </p>
                <p className="text-lg text-white leading-relaxed">
                  The core mission remains the same: to uncover and share new
                  ideas and research that spark conversations and connections
                  within the community.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <GlassCard className="text-center p-8">
                  <div className="text-4xl font-bold text-red-500 mb-3">
                    <AnimatedCounter target={3000} suffix="+" />
                  </div>
                  <div className="text-sm text-white font-medium uppercase tracking-wider">
                    TEDx Events
                  </div>
                </GlassCard>
                <GlassCard className="text-center p-8">
                  <div className="text-4xl font-bold text-red-500 mb-3">
                    <AnimatedCounter target={180} suffix="+" />
                  </div>
                  <div className="text-sm text-white font-medium uppercase tracking-wider">
                    Countries
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About TEDx Manipal Section */}
      <section ref={manipalRef} id="manipal" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div
            className={`max-w-6xl mx-auto text-center transition-all duration-1500 ${
              isVisible("manipal")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
          >
            <div className="space-y-8 mb-12">
              <h2 className="text-5xl md:text-6xl font-bold text-white">
                TEDx MUJ
              </h2>
              <div className="flex items-center justify-center">
                <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
              </div>
            </div>

            <div className="max-w-5xl mx-auto mb-16 space-y-8">
              <p className="text-2xl text-white leading-relaxed font-light">
                An independently organized TED event, TEDxManipal University
                Jaipur brings together bold voices and fresh perspectives. A
                platform of innovators, storytellers, and change-makers that
                step into the red dot and share ideas that challenge the
                ordinary and inspire new ways of thinking.
              </p>
              <p className="text-xl text-white leading-relaxed">
                Our mission is to spark curiosity and creativity within our
                university and beyond, creating conversations that don’t just
                stay in the room, but move people toward action that creates
                impact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              <GlassCard className="p-10 group">
                <div className="flex items-center gap-6">
                  <Users className="w-10 h-10 text-red-500 group-hover:scale-110 transition-transform duration-500 flex-shrink-0" />
                  <div className="text-left">
                    <div className="text-3xl font-bold text-white mb-2">
                      <AnimatedCounter
                        target={500}
                        duration={2000}
                        suffix="+"
                      />
                      <span className="">Attendees</span>
                    </div>
                    <div className="text-white/80 text-lg">
                      Students, Faculty, and Industry Leaders
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-10 group">
                <div className="flex items-center gap-6">
                  <Lightbulb className="w-10 h-10 text-red-500 group-hover:scale-110 transition-transform duration-500 flex-shrink-0" />
                  <div className="text-left">
                    <div className="text-3xl font-bold text-white mb-2">
                      <AnimatedCounter target={6} duration={2000} suffix="" />
                      <span className="">Inspiring Speakers</span>
                    </div>
                    <div className="text-white/80 text-lg">
                      From Technology, Arts, Science, and Social Impact
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-red-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "12s" }}
        />
        <div
          className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-red-600/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "15s", animationDelay: "3s" }}
        />
      </div>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-10px) rotate(90deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-5px) rotate(180deg);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-15px) rotate(270deg);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
