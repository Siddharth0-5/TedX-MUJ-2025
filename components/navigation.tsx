"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/moving-border"
import Image from "next/image"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
     { href: "/events", label: "Events" },
    // { href: "/speakers", label: "Speakers" },
    { href: "/team", label: "Team" }
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/20 backdrop-blur-md border-b border-white/10"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-40 h-20 rounded-lg overflow-hidden flex items-center justify-center pb-4">
                <Image
                  src="/logo-white.png"
                  alt="TEDx Manipal Logo"
                  width={40}
                  height={40}
                  className="object-contain h-full w-full"
                />
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => (window.location.href = item.href)}
                className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? "text-white bg-red-600/20 border border-red-500/30"
                    : "text-white hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <div className="absolute inset-0 bg-red-600/10 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Register Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/register">
              <Button className=" bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300  shadow-lg  hidden md:flex items-center justify-center">
                Register Now
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-3 text-white hover:bg-white/5 rounded-xl transition-all duration-300 group"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-out ${
                    isOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-out ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-out ${
                    isOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div
          className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-out ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          style={{ top: scrolled ? "73px" : "81px" }}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-500 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Content */}
          <div
            className={`relative bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-500 ease-out ${
              isOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="container mx-auto px-6 py-8">
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group block px-6 py-4 rounded-2xl font-medium transition-all duration-300 transform ${
                      pathname === item.href
                        ? "text-white bg-gradient-to-r from-red-600/20 to-red-500/10 border border-red-500/30 shadow-lg shadow-red-500/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5 hover:translate-x-2"
                    } ${isOpen ? `animate-slide-in-${index}` : ""}`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{item.label}</span>
                      {pathname === item.href && (
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    {pathname === item.href && (
                      <div className="mt-1 text-sm text-red-400/80 font-normal">
                        Current page
                      </div>
                    )}
                  </Link>
                ))}
              </nav>

              {/* Additional Menu Content */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-center space-y-4">
                  <p className="text-white text-sm">Ready to join us?</p>
                  <Button
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/register" className="w-full">
                      Register for Event
                    </Link>
                  </Button>

                  <div className="flex items-center justify-center space-x-6 pt-4">
                    <div className="text-center">
                      <div className="text-red-500 font-bold text-lg">
                        Nov 7 2025
                      </div>
                    </div>
                    <div className="w-px h-8 bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-red-500 font-bold text-lg">100</div>
                      <div className="text-white text-xs">Attendees</div>
                    </div>
                    <div className="w-px h-8 bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-red-500 font-bold text-lg">6</div>
                      <div className="text-white text-xs">Speakers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
