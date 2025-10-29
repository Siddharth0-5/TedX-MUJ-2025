"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Linkedin, Twitter, Mail, Sparkles } from "lucide-react";
import { teams } from "@/data/teams";
import { TeamMemberCard } from "@/components/teamMemberCard";
export default function TeamPage() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const heroRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  const convenors = teams.filter((member) => member.role === "Convenor");
  const md = teams.filter((member) => member.role === "MD");

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

  // Defer rendering of animated particles to client-side only to avoid SSR hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <>
      <div className="bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-x-hidden relative pb-20">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
         
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-40 right-1/3 w-80 h-80 bg-red-500/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />

         
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

       
          <div className="absolute inset-0">
            {mounted && [...Array(15)].map((_, i) => (
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

        
          <div className="absolute top-1/3 right-20 w-24 h-24 border-2 border-red-500/30 transform rotate-45 animate-spin-slow" />
          <div className="absolute bottom-1/4 left-16 w-16 h-16 bg-gradient-to-br from-red-500/20 to-transparent rounded-full animate-pulse" />
        </div>

      
        <section
          ref={heroRef}
          className="relative pt-32 pb-24 md:pb-12 flex items-center justify-center min-h-screen"
          data-section
          id="hero-section"
        >
        
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
            
            <div className="relative mb-12">
           
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-500/20 to-red-500/10 blur-3xl scale-150" />

              <h1 className="relative text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-6">
                <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  OUR
                </span>
                <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent transform -translate-y-4">
                  TEAM
                </span>
              </h1>

            
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

      
        <section className="relative">
          <div className="container mx-auto px-6 pt-10">
            <div className="space-y-32">
             
              <div
                data-section
                id="convenors-section"
                className={`transition-all duration-1000 ${
                  isVisible("convenors-section")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="text-center mb-16 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent blur-xl" />
                  <div className="flex items-center justify-center gap-4 mb-6 relative">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-500" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white relative">
                      Convenors 
                      <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-red-500/50 via-red-500 to-red-500/50" />
                    </h2>
                    <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-500" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                  {convenors.map((member, memberIndex) => (
                    <TeamMemberCard
                      key={member.name}
                      member={member}
                      memberIndex={memberIndex}
                      isVisible={isVisible("convenors-section")}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="container mx-auto px-6 pt-10">
            <div className="space-y-32">
              {/* Managing Directors Team  */}
              <div
                data-section
                id="md-section"
                className={`transition-all duration-1000 ${
                  isVisible("md-section")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="text-center mb-16 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent blur-xl" />
                  <div className="flex items-center justify-center gap-4 mb-6 relative">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-500" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white relative">
                      Managing Directors 
                      <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-red-500/50 via-red-500 to-red-500/50" />
                    </h2>
                    <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-500" />
                  </div>
                </div>

                <div className="flex justify-center gap-8 flex-wrap max-w-xl md:flex-nowrap xl:max-w-2xl mx-auto">
                  {md.map((member, memberIndex) => (
                    <TeamMemberCard
                      key={member.name}
                      member={member}
                      memberIndex={memberIndex}
                      isVisible={isVisible("md-section")}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <style jsx>{`
          @keyframes grid-move {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(60px, 60px);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            33% {
              transform: translateY(-20px) rotate(120deg);
            }
            66% {
              transform: translateY(10px) rotate(240deg);
            }
          }

          .animate-spin-slow {
            animation: spin 20s linear infinite;
          }
        `}</style>
      </div>
    </>
  );
}

// // Team Member Card Component
// function TeamMemberCard({
//   member,
//   memberIndex,
//   isVisible,
// }: {
//   member: {
//     name: string;
//     role: string;
//     image: string;
//     bio: string;
//     linkedin: string;
//     twitter?: string;
//     email: string;
//   };
//   memberIndex: number;
//   isVisible: boolean;
// }) {
//   return (
//     <div
//       className={`group transition-all duration-700  delay-${
//         memberIndex * 100
//       } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
//     >
//       <div className=" bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 overflow-hidden relative group h-[650px] flex flex-col">
//         <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
//         <div className="relative bg-gray-950/50 rounded-2xl flex flex-col h-full">
         
//           <div className="relative h-72 overflow-hidden flex-shrink-0">
//             <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent z-10" />
//             <Image
//               src={member.image}
//               alt={member.name}
//               width={300}
//               height={300}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          
//             <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//           </div>

         
//           <div className="p-6 pb-8 relative flex flex-col flex-grow">
//             <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
//             <h3 className="text-xl font-bold text-white mb-2 relative">
//               {member.name}
//             </h3>
//             <p className="text-red-500 font-medium mb-3 relative">
//               {member.role}
//             </p>

           
//             <p className="text-gray-300 text-sm leading-relaxed mb-6 relative flex-grow">
//               {member.bio}
//             </p>

           
//             <div className="flex items-center gap-4 relative mt-auto pt-2 ">
//               <a
//                 href={member.linkedin}
//                 className="p-2 bg-white/10 rounded-lg hover:bg-red-600 transition-all duration-300 group/link relative overflow-hidden"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
//                 <Linkedin className="w-4 h-4 text-white group-hover/link:text-white relative z-10" />
//               </a>
//               {/* <a
//                 href={member.twitter}
//                 className="p-2 bg-white/10 rounded-lg hover:bg-red-600 transition-all duration-300 group/link relative overflow-hidden"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
//                 <Twitter className="w-4 h-4 text-white group-hover/link:text-white relative z-10" />
//               </a> */}
//               <a
//                 href={`mailto:${member.email}`}
//                 className="p-2 bg-white/10 rounded-lg hover:bg-red-600 transition-all duration-300 group/link relative overflow-hidden"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
//                 <Mail className="w-4 h-4 text-white group-hover/link:text-white relative z-10" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
