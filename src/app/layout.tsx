import { Navigator, Profile } from "@/components";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GLNK Search",
  description: "Glnk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add the favicon */}
        <link rel="icon" href="/logo-small.png" type="image/x-icon" />
      </head>
      <body className="bg-[#FAFCFD]">
        <div className="mx-16 my-16 flex flex-row justify-between px-[131px]">
          <Navigator />
          <Profile />
        </div>
        {children}
      </body>
    </html>
  );
}
