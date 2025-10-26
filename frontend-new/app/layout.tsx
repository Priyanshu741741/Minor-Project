import "./globals.css";
import React from "react";

// For Vite projects, font configuration is handled differently
// You can use Google Fonts via index.html or CSS imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>PEC Dispensary - Management system and Feedback Analysis</title>
          <meta name="description" content="Management system and Feedback Analysis Using NLP and NN" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </head>
        <body className="relative antialiased font-sans">
          {children}
        </body>
      </html>
    </>
  );
}
