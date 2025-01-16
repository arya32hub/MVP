"use client";

import { Navigator, Profile } from "@/components";
import { AppStore, store } from "@/lib";
import { setupListeners } from "@reduxjs/toolkit/query/react";
// import type { Metadata } from "next";
import { useRef } from "react";
import { Provider } from "react-redux";
import "./globals.css";

// export const metadata: Metadata = {
//   title: "GLNK Search",
//   description: "Glnk",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store;
    setupListeners(store.dispatch);
  }
  return (
    <html lang="en">
      <head>
        {/* Add the favicon */}
        <link rel="icon" href="/logo-small.png" type="image/x-icon" />
      </head>
      <body className="bg-[#FAFCFD]">
        <Provider store={storeRef.current}>
          <div className="mx-16 my-16 flex flex-row justify-between px-[131px]">
            <Navigator />
            <Profile />
          </div>
          {children}
        </Provider>
      </body>
    </html>
  );
}
