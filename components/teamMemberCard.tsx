import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";

// Team Member Card Component
export function TeamMemberCard({
  member,
  memberIndex,
  isVisible,
}: {
  member: {
    name: string;
    role: string;
    image: string;
    bio: string;
    linkedin: string;
    twitter?: string;
    email: string;
  };
  memberIndex: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={`group transition-all duration-700  delay-${
        memberIndex * 100
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className=" bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 overflow-hidden relative group h-[650px] flex flex-col">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        <div className="relative bg-gray-950/50 rounded-2xl flex flex-col h-full">
         
          <div className="relative h-72 overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent z-10" />
            <Image
              src={member.image}
              alt={member.name}
              width={300}
              height={300}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

         
          <div className="p-6 pb-8 relative flex flex-col flex-grow">
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            <h3 className="text-xl text-center font-bold text-white mb-2 relative">
              {member.name}
            </h3>
            <p className="text-red-500 font-medium mb-3 relative text-center">
              {member.role}
            </p>

           
            <p className="text-gray-300 text-sm text-center leading-relaxed mb-6 relative flex-grow">
              {member.bio}
            </p>

           
            <div className="flex items-center justify-center gap-4 relative mt-auto pt-2 ">
              <a
                href={member.linkedin}
                className="p-2 bg-white/10 rounded-lg hover:bg-red-600 transition-all duration-300 group/link relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                <Linkedin className="w-4 h-4 text-white group-hover/link:text-white relative z-10" />
              </a>
              {/* <a
                href={member.twitter}
                className="p-2 bg-white/10 rounded-lg hover:bg-red-600 transition-all duration-300 group/link relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                <Twitter className="w-4 h-4 text-white group-hover/link:text-white relative z-10" />
              </a> */}
              <a
                href={`mailto:${member.email}`}
                className="p-2 bg-white/10 rounded-lg hover:bg-red-600 transition-all duration-300 group/link relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                <Mail className="w-4 h-4 text-white group-hover/link:text-white relative z-10" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
