import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gradient-to-t from-gray-950 to-transparent py-16 border-t border-white/10 relative mt-32">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5" />
        <div className="container mx-auto px-6 relative">
          <div className="grid md:grid-cols-3 gap-8 w-full">
            
            <div className="text-center md:text-left">
              <Link
                href="/"
                className="flex justify-center md:justify-start items-center space-x-3 group"
              >
                <div className="relative">
                  <div className="w-40 h-20 rounded-lg overflow-hidden flex items-center justify-center pb-2">
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
              <p className="text-red-500">Address:</p>
              <div className="mt-1 text-white text-sm">
                <p>Manipal University Jaipur</p>
                <p>Dehmi Kalan, Near GVK Toll Plaza,</p>
                <p>Jaipur-Ajmer Expressway,</p>
                <p>Jaipur, Rajasthan 303007</p>
              </div>
            </div>

           
            <div className="text-center">
              <h3 className="font-semibold mb-4 text-red-500">Event Details</h3>
              <div className="space-y-2 text-white">
                <p>8 November 2025</p>
                <p>Manipal University Jaipur</p>
                <p>9:00 AM - 6:00 PM</p>
              </div>
            </div>

           
            <div className="text-center md:text-right">
              <h3 className="font-semibold mb-4 text-red-500">Connect</h3>
              <div className="space-y-2 text-white mb-4">
                <p>Tanisha Mathur: +91 70805 95557</p>
                <p>Aaryan Bhatia: +91 99534 55870</p>
                <p>Krishna Goel: +91 84450 57007</p>
                <p>Tanmay Shah: +91 90093 99295</p>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-red-500 mb-2">Follow Us</h4>
                <div className="flex justify-center md:justify-end space-x-4">
                  <Link
                    href="https://www.instagram.com/tedxmanipaluniversityjaipur/"
                    className="text-white hover:text-white transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            <p className="mt-4">
             Made with ❤️ by Team TEDx Manipal Tech Team © 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
