"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Sparkles,
  InstagramIcon,
} from "lucide-react";
import { speakers } from "@/data/speakers";
import { SpeakerCard } from "@/components/speakerCard";

export interface Speaker {
  name: string;
  topic: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  featured: boolean;
}

export default function Page() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help you learn more about our amazing speakers. Ask me anything about their backgrounds, topics, or expertise!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const heroRef = useRef(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);


  const featuredSpeakers = speakers.filter((speaker) => speaker.featured);


  const scrollToBottom = () => {
    if (chatContainerRef.current && messagesEndRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };


  const speakerQA = [
    {
      question: "Who are the keynote speakers?",
      answer: "Our keynote speakers are industry leaders and visionaries who will share transformative ideas. They include experts from various fields like technology, social innovation, creativity, and entrepreneurship."
    },
    {
      question: "What topics will the speakers cover?",
      answer: "Our speakers will cover diverse topics including AI and technology, sustainable innovation, creative storytelling, social impact, entrepreneurship, mental health awareness, and breakthrough scientific research."
    },
    {
      question: "How long are the speaker sessions?",
      answer: "Each speaker session follows the classic TEDx format with talks ranging from 6-18 minutes, designed to deliver powerful ideas in a concise and impactful manner."
    },
    {
      question: "Can I meet the speakers after their talks?",
      answer: "Yes! We'll have networking sessions and meet-and-greet opportunities where you can connect with our speakers, ask questions, and continue conversations."
    },
    {
      question: "How are speakers selected for TEDx Manipal?",
      answer: "Our speakers are carefully selected based on their expertise, unique perspectives, and ability to share ideas worth spreading. We look for innovators, change-makers, and thought leaders who can inspire our audience."
    }
  ];

  
  const handleSpeakerQuestionClick = (qa: { question: string; answer: string }) => {
    const userMessage = {
      id: chatMessages.length + 1,
      text: qa.question,
      isBot: false,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);

   
    setTimeout(() => {
      const botResponse = {
        id: chatMessages.length + 2,
        text: qa.answer,
        isBot: true,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  useEffect(() => {
    if (showChatbot) {
      setTimeout(scrollToBottom, 100);
    }
  }, [chatMessages, showChatbot]);

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

  return (
    <>
      <div className="bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-x-hidden relative pb-20">
        {/* Enhanced Background Elements */}
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
                  SPEAKERS
                </span>
              </h1>

              {/* Decorative Elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 border-l-4 border-t-4 border-red-500/50 opacity-60 hidden md:block" />
              <div className="absolute -bottom-8 -right-8 w-16 h-16 border-r-4 border-b-4 border-red-500/50 opacity-60 hidden md:block" />
            </div>

            {/* Subtitle with TEDx Philosophy */}
            <div className="relative mb-12">
              <p className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed">
                Join us for an extraordinary journey through innovation,
                creativity, and transformative thinking that will challenge
                perspectives and inspire action.
              </p>
            </div>
          </div>
        </section>

        {/* Speakers Section */}
        <section className="relative">
          <div className="container mx-auto px-6 pt-10">
            <div className="space-y-32">
              {/* Featured Speakers Section */}
              <div
                data-section
                id="featured-speakers-section"
                className={`transition-all duration-1000 ${
                  isVisible("featured-speakers-section")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="text-center mb-16 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent blur-xl" />
                  <div className="flex items-center justify-center gap-4 mb-6 relative">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent to-red-500" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white relative">
                      Keynote Speakers
                      <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-red-500/50 via-red-500 to-red-500/50" />
                    </h2>
                    <div className="w-16 h-px bg-gradient-to-l from-transparent to-red-500" />
                  </div>
                  <p className="text-white text-lg max-w-2xl mx-auto">
                    Transformative thinkers taking the main stage with
                    breakthrough perspectives
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {featuredSpeakers.map((speaker, speakerIndex) => (
                    <SpeakerCard
                      key={speaker.name}
                      speaker={speaker}
                      speakerIndex={speakerIndex}
                      isVisible={isVisible("featured-speakers-section")}
                      isFeatured={true}
                    />
                  ))}
                </div>
              </div>

              {/* Know Your Speaker Section */}
             
            </div>
          </div>
        </section>

      

        <style jsx>{`
          @keyframes grid-flow {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(100px, 100px);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
            }
          }

          @keyframes gradient-x {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          @keyframes message-slide {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slide-up {
            0% {
              opacity: 0;
              transform: translateY(15px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-spin-slow {
            animation: spin 30s linear infinite;
          }

          .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
            background-size: 200% 200%;
          }

          .animate-message-slide {
            animation: message-slide 0.5s ease-out forwards;
          }

          .animate-slide-up {
            animation: slide-up 0.6s ease-out forwards;
          }

          /* Custom scrollbar styles */
          .scrollbar-thin::-webkit-scrollbar {
            width: 6px;
            height: 0px; /* Remove horizontal scrollbar */
          }

          .scrollbar-track-gray-800::-webkit-scrollbar-track {
            background: rgb(31 41 55);
            border-radius: 3px;
          }

          .scrollbar-thumb-red-500::-webkit-scrollbar-thumb {
            background: rgb(239 68 68);
            border-radius: 3px;
          }

          .scrollbar-thumb-red-500::-webkit-scrollbar-thumb:hover {
            background: rgb(220 38 38);
          }

          /* Hide horizontal scrollbar for all browsers */
          .scrollbar-thin {
            scrollbar-width: thin;
            scrollbar-color: rgb(239 68 68) rgb(31 41 55);
            overflow-x: hidden !important;
          }
        `}</style>
      </div>
    </>
  );
}

// Speaker Card Component
