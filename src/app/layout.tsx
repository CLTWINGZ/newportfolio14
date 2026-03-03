import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chethana Lakthilina Jathunarachchi | Full-Stack Software Engineer",
  description:
    "Portfolio of Chethana Lakthilina Jathunarachchi — Software Engineering graduate from NSBM Green University, Sri Lanka. Full-Stack Developer specializing in React, Node.js, PHP, AI integration, DevOps, and enterprise systems. Ex-CAASL Software Engineer Intern.",
  keywords: [
    "Chethana Lakthilina",
    "Chethana Lakthilina Jathunarachchi",
    "Software Engineer Sri Lanka",
    "Full-Stack Developer",
    "NSBM Green University",
    "CAASL Intern",
    "React Developer",
    "Node.js",
    "PHP Developer",
    "IBM Watson",
    "DevOps Engineer",
    "Docker Kubernetes Jenkins",
  ],
  openGraph: {
    title: "Chethana Lakthilina | Full-Stack Software Engineer · Sri Lanka",
    description:
      "Building mission-critical software for aviation, enterprise inventory, AI applications and more. 21+ certifications. Open to opportunities.",
    type: "website",
    url: "https://chethanalakthilina.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
