import { type Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import "./globals.css";
import Image from "next/image"; // Import the Image component

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WakaRide",
  description: "Book Your Ride Now",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <header className="flex justify-between items-center p-4 h-16 shadow-md bg-white"> {/* Added justify-between and background */}
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/icon.ico" // Replace with your logo image path
                alt="Waka For Me Logo"
                width={50}   // Adjust as needed
                height={50}  // Adjust as needed
                priority
              />
              <span className="ml-2 font-bold text-lg">WakaRide</span>
            </div>

            {/* Sign In/Up or User Button */}
            <div>
              <SignedOut>
                <div className="flex items-center gap-2"> {/* Wrap buttons in a flex container */}
                  <SignInButton>
                    <button className="bg-[#FACC15] text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-400 transition-all">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="bg-[#FACC15] text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-400 transition-all">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}