import '../styles/tailwind.css';
import '../styles/global.scss';


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BurjX assignment",
  description: "Assignment for Front end Developer position - Ghazal Jarouj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
