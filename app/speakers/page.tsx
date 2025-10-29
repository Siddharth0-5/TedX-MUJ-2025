"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Sparkles,
} from "lucide-react";
import { speakers } from "@/data/speakers";

// Types
export interface Speaker {
  name: string;
  title: string;
  topic: string;
  bio: string;
  image: string;
  linkedin: string;
  twitter?: string;
  email: string;
  website: string;
  talkDuration: string;
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

  // Separate featured and regular speakers
  const featuredSpeakers = speakers.filter((speaker) => speaker.featured);

  // Auto-scroll to newest messages within chat container only
  const scrollToBottom = () => {
    if (chatContainerRef.current && messagesEndRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Predefined Q&A pairs about speakers
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

  // Handle predefined question click
  const handleSpeakerQuestionClick = (qa: { question: string; answer: string }) => {
    // Add user question
    const userMessage = {
      id: chatMessages.length + 1,
      text: qa.question,
      isBot: false,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);

    // Add bot response after a short delay
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
              {/* <p className="text-2xl md:text-3xl text-white mb-6 leading-relaxed font-light">
                Visionaries sharing
                <span className="text-red-500 font-semibold">
                  {" "}
                  ideas worth spreading
                </span>
              </p> */}
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
              <div
                data-section
                id="know-speaker-section"
                className={`transition-all duration-1000 ${
                  isVisible("know-speaker-section")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="text-center mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent blur-xl" />
                  <div className="flex items-center justify-center gap-4 mb-6 relative">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent to-red-500" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white relative">
                      Want to Know More?
                      <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-red-500/50 via-red-500 to-red-500/50" />
                    </h2>
                    <div className="w-16 h-px bg-gradient-to-l from-transparent to-red-500" />
                  </div>
                  <p className="text-white text-lg max-w-2xl mx-auto mb-8">
                    Get personalized insights about our speakers, their expertise, and what makes their talks extraordinary
                  </p>

                  {/* Know Your Speaker Button */}
                  <button
                    onClick={() => setShowChatbot(!showChatbot)}
                    className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 shadow-2xl border-2 border-red-500/30 overflow-hidden"
                  >
                    {/* Button Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative flex items-center gap-3">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                      </svg>
                      <span className="font-semibold text-lg">
                        {showChatbot ? 'Close Speaker Chat' : 'Know Your Speaker'}
                      </span>
                    </div>
                    
                    {/* Pulse effect */}
                    <div className="absolute inset-0 rounded-full animate-pulse bg-red-500/20 opacity-30" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chatbot Section - Conditionally Visible */}
        {showChatbot && (
          <section className="relative py-12 px-4 sm:px-6">
            {/* Animated background particles for chat */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + i * 8}%`,
                    animationDelay: `${i * 1.2}s`,
                    animationDuration: `${4 + Math.random() * 2}s`,
                  }}
                >
                  <div className="w-3 h-3 bg-red-500/20 rounded-full blur-sm"></div>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto relative">
              {/* Chat Container with Split Layout Design */}
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-red-500/40 rounded-2xl shadow-2xl overflow-hidden">
                {/* Animated border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 animate-pulse rounded-2xl"></div>
                
                {/* Chat Header with enhanced styling */}
                <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-4 rounded-t-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-red-600/30 animate-gradient-x"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shadow-lg">
                          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                          </svg>
                        </div>
                        {/* Online status indicator */}
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg tracking-wide">Speaker Assistant</h3>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-red-100 text-xs font-medium">Ready to share speaker insights!</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowChatbot(false)}
                      className="text-red-100 hover:text-white transition-all duration-300 p-2 hover:bg-red-600/40 rounded-full hover:rotate-90 transform"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Split Layout Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 h-[420px]">
                  {/* Left Side - Chat Messages */}
                  <div className="relative border-r-0 lg:border-r border-red-500/30 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/60 flex flex-col min-h-0 border-b lg:border-b-0 border-red-500/30">
                    {/* Chat Header for Left Side */}
                    <div className="sticky top-0 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-4 border-b border-red-500/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-lg">Conversation</h4>
                          <p className="text-red-200 text-xs">Ask about our speakers</p>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div 
                      ref={chatContainerRef}
                      className="flex-1 p-4 overflow-y-auto overflow-x-hidden space-y-4 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-red-500 min-h-0"
                    >
                      {chatMessages.map((message, index) => (
                        <div 
                          key={message.id} 
                          className={`flex items-start gap-4 animate-message-slide ${message.isBot ? 'justify-start' : 'justify-end'}`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {/* Bot messages: Avatar on left, message on right */}
                          {message.isBot && (
                            <>
                              <div className="relative">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-lg">
                                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                                  </svg>
                                </div>
                                <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping opacity-30"></div>
                              </div>
                              <div className="max-w-xs px-5 py-3 rounded-2xl bg-gradient-to-br from-red-600/30 to-red-700/20 text-white border border-red-500/40 shadow-lg backdrop-blur-sm hover:shadow-red-500/20 transition-all duration-300 break-words">
                                <p className="text-sm leading-relaxed">{message.text}</p>
                                <span className="text-xs text-red-300 mt-2 block font-medium">
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </>
                          )}
                          
                          {/* User messages: Message on left, avatar on right */}
                          {!message.isBot && (
                            <>
                              <div className="max-w-xs px-5 py-3 rounded-2xl bg-gradient-to-br from-white to-gray-100 text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 break-words">
                                <p className="text-sm leading-relaxed font-medium">{message.text}</p>
                                <span className="text-xs text-gray-500 mt-2 block font-medium">
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-lg">
                                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                  </svg>
                                </div>
                                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping opacity-30"></div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                      {/* Invisible element to scroll to */}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Right Side - Quick Questions */}
                  <div className="relative bg-gradient-to-br from-gray-900/60 via-black/80 to-gray-900/60 overflow-hidden flex flex-col min-h-0">
                    {/* Background decoration for right side */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5"></div>
                    
                    {/* Questions Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-4 border-b border-red-500/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-lg">Quick Questions</h4>
                          <p className="text-red-200 text-xs">Learn about speakers</p>
                        </div>
                      </div>
                    </div>

                    {/* Questions List */}
                    <div className="flex-1 p-4 overflow-hidden min-h-0">
                      <div className="h-full space-y-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-red-500 pr-2 min-h-0">
                        {speakerQA.map((qa, index) => (
                          <div
                            key={index}
                            className="relative group animate-slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <button
                              onClick={() => handleSpeakerQuestionClick(qa)}
                              className="w-full text-left p-4 bg-gradient-to-r from-gray-800/60 to-gray-800/40 hover:from-red-600/30 hover:to-red-700/20 border border-gray-700/50 hover:border-red-500/60 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/20 group relative overflow-hidden break-words"
                            >
                              {/* Button background animation */}
                              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                              
                              <div className="relative flex items-center gap-3">
                                {/* Animated icon */}
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </div>
                                </div>
                                
                                {/* Question text */}
                                <div className="flex-1 min-w-0">
                                  <span className="text-white text-sm font-semibold group-hover:text-red-100 transition-colors duration-300 block">
                                    {qa.question}
                                  </span>
                                  <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500 mt-2 rounded-full"></div>
                                </div>
                                
                                {/* Arrow indicator */}
                                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

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
            0%, 100% {
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
interface SpeakerCardProps {
  speaker: Speaker;
  speakerIndex: number;
  isVisible: boolean;
  isFeatured: boolean;
}

function SpeakerCard({
  speaker,
  speakerIndex,
  isVisible,
  isFeatured,
}: SpeakerCardProps) {
  return (
    <div
      className={`group transition-all duration-700 delay-${
        speakerIndex * 100
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div
        className={`bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 overflow-hidden relative group ${
          isFeatured ? "lg:col-span-1" : ""
        }`}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        <div className="relative bg-gray-950/50 rounded-2xl">
          {/* Speaker Image */}
          <div
            className={`relative ${
              isFeatured ? "h-96" : "h-80"
            } overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent z-10" />
            <Image
              src={speaker.image}
              alt={speaker.name}
              width={400}
              height={400}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Featured Badge */}
            {isFeatured && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                KEYNOTE
              </div>
            )}
          </div>

          {/* Speaker Info */}
          <div className={`p-6 relative ${isFeatured ? "pb-8" : ""}`}>
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

            <div className="mb-4">
              <h3
                className={`${
                  isFeatured ? "text-2xl" : "text-xl"
                } font-bold text-white mb-2 relative`}
              >
                {speaker.name}
              </h3>
              <p className="text-red-500 font-medium mb-2 relative">
                {speaker.title}
              </p>
              <p
                className={`text-white font-semibold ${
                  isFeatured ? "text-lg" : "text-sm"
                } mb-4 relative`}
              >
                &ldquo;{speaker.topic}&rdquo;
              </p>
            </div>

            <p
              className={`text-white ${
                isFeatured ? "text-base" : "text-sm"
              } leading-relaxed mb-6 relative`}
            >
              {speaker.bio}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 relative">
              <a
                href={speaker.linkedin}
                className="p-2 bg-white/10 rounded-lg hover:bg-red-600 transition-all duration-300 group/link relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                <Linkedin className="w-4 h-4 text-white group-hover/link:text-white relative z-10" />
              </a>
              {/* <a
                href={speaker.twitter}
                className="p-2 bg-white/10 rounded-lg hover:bg-red-600 transition-all duration-300 group/link relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                <Twitter className="w-4 h-4 text-white group-hover/link:text-white relative z-10" />
              </a> */}
              <a
                href={`mailto:${speaker.email}`}
                className="p-2 bg-white/10 rounded-lg hover:bg-red-600 transition-all duration-300 group/link relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                <Mail className="w-4 h-4 text-white group-hover/link:text-white relative z-10" />
              </a>
              <a
                href={speaker.website}
                className="p-2 bg-white/10 rounded-lg hover:bg-red-600 transition-all duration-300 group/link relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                <Globe className="w-4 h-4 text-white group-hover/link:text-white relative z-10" />
              </a> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
