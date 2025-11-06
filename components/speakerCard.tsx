import { Speaker } from "@/app/speakers/page";
import { Globe, InstagramIcon, Linkedin } from "lucide-react";
import Image from "next/image";

interface SpeakerCardProps {
  speaker: Speaker;
  speakerIndex: number;
  isVisible: boolean;
  isFeatured: boolean;
}

export function SpeakerCard({
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
              isFeatured ? "h-[32rem]" : "h-80"
            } overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent z-10" />
            <Image
              src={speaker.image}
              alt={speaker.name}
              width={400}
              height={400}
              className="w-full h-full object-cover object-[center_85%] transition-transform duration-700 group-hover:scale-110"
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

            <div className="flex items-center gap-3 relative">
              {speaker.linkedin && (
                <a
                  href={speaker.linkedin}
                  className="p-2 bg-white/10 rounded-lg hover:bg-red-600 transition-all duration-300 group/link relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                  <Linkedin className="w-4 h-4 text-white group-hover/link:text-white relative z-10" />
                </a>
              )}
              {speaker.instagram && (
                <a
                  href={speaker.instagram}
                  className="p-2 bg-white/10 rounded-lg hover:bg-red-600 transition-all duration-300 group/link relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                  <InstagramIcon className="w-4 h-4 text-white group-hover/link:text-white relative z-10" />
                </a>
              )}
              {speaker.website && (
                <a
                  href={speaker.website}
                  className="p-2 bg-white/10 rounded-lg hover:bg-red-600 transition-all duration-300 group/link relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                  <Globe className="w-4 h-4 text-white group-hover/link:text-white relative z-10" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
